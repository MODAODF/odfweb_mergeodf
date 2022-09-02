<?php
/**
 * @copyright Copyright (c) 2017 Robin Appelman <robin@icewind.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\MergeODF\AppInfo;

use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\Files_Sharing\Event\BeforeTemplateRenderedEvent;
use OCA\Files_Trashbin\Expiration;
use OCA\MergeODF\ACL\ACLManagerFactory;
use OCA\MergeODF\ACL\RuleManager;
use OCA\MergeODF\ACL\UserMapping\IUserMappingManager;
use OCA\MergeODF\ACL\UserMapping\UserMappingManager;
use OCA\MergeODF\BackgroundJob\ExpireGroupPlaceholder;
use OCA\MergeODF\BackgroundJob\ExpireGroupTrash as ExpireGroupTrashJob;
use OCA\MergeODF\BackgroundJob\ExpireGroupVersions as ExpireGroupVersionsJob;
use OCA\MergeODF\CacheListener;
use OCA\MergeODF\Command\ExpireGroup\ExpireGroupBase;
use OCA\MergeODF\Command\ExpireGroup\ExpireGroupVersionsTrash;
use OCA\MergeODF\Command\ExpireGroup\ExpireGroupVersions;
use OCA\MergeODF\Command\ExpireGroup\ExpireGroupTrash;
use OCA\MergeODF\Folder\FolderManager;
use OCA\MergeODF\Helper\LazyFolder;
use OCA\MergeODF\Listeners\LoadAdditionalScriptsListener;
use OCA\MergeODF\Listeners\LoadSelfSidebarListener;
use OCA\MergeODF\Event\LoadSelfSidebar;
use OCA\MergeODF\Mount\MountProvider;
use OCA\MergeODF\Trash\TrashBackend;
use OCA\MergeODF\Trash\TrashManager;
use OCA\MergeODF\Versions\GroupVersionsExpireManager;
use OCA\MergeODF\Versions\VersionsBackend;
use OCA\MergeODF\Notification\Notifier;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\IAppContainer;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Files\NotFoundException;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\Config\IMountProviderCollection;
use OCP\ICacheFactory;
use OCP\IDBConnection;
use OCP\IGroup;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IRequest;
use OCP\ISession;
use OCP\IUserSession;
use Psr\Log\LoggerInterface;
use OCP\Util;
use OCP\Files\Node;
use OC\Files\Filesystem;

class Application extends App implements IBootstrap {
	public function __construct(array $urlParams = []) {
		parent::__construct('mergeodf', $urlParams);
	}

	public function register(IRegistrationContext $context): void {
		$context->registerEventListener(LoadAdditionalScriptsEvent::class, LoadAdditionalScriptsListener::class);
		$context->registerEventListener(BeforeTemplateRenderedEvent::class, LoadAdditionalScriptsListener::class);

		$context->registerServiceAlias('GroupAppFolder', LazyFolder::class);

		$context->registerService(MountProvider::class, function (IAppContainer $c): MountProvider {
			$rootProvider = function () use ($c): LazyFolder {
				return $c->get('GroupAppFolder');
			};
			$config = $c->get(IConfig::class);
			$allowRootShare = $config->getAppValue('mergeodf', 'allow_root_share', 'true') === 'true';

			return new MountProvider(
				$c->getServer()->getGroupManager(),
				$c->get(FolderManager::class),
				$rootProvider,
				$c->get(ACLManagerFactory::class),
				$c->get(IUserSession::class),
				$c->get(IRequest::class),
				$c->get(ISession::class),
				$c->get(IMountProviderCollection::class),
				$c->get(IDBConnection::class),
				$c->get(ICacheFactory::class)->createLocal("mergeodf"),
				$allowRootShare
			);
		});

		$context->registerService(TrashBackend::class, function (IAppContainer $c): TrashBackend {
			$trashBackend = new TrashBackend(
				$c->get(FolderManager::class),
				$c->get(TrashManager::class),
				$c->get('GroupAppFolder'),
				$c->get(MountProvider::class),
				$c->get(ACLManagerFactory::class),
				$c->getServer()->getRootFolder()
			);
			$hasVersionApp = interface_exists(\OCA\Files_Versions\Versions\IVersionBackend::class);
			if ($hasVersionApp) {
				$trashBackend->setVersionsBackend($c->get(VersionsBackend::class));
			}
			return $trashBackend;
		});

		$context->registerService(VersionsBackend::class, function (IAppContainer $c): VersionsBackend {
			return new VersionsBackend(
				$c->get('GroupAppFolder'),
				$c->get(MountProvider::class),
				$c->get(ITimeFactory::class),
				$c->get(LoggerInterface::class)
			);
		});

		$context->registerService(ExpireGroupBase::class, function (IAppContainer $c): ExpireGroupBase {
			// Multiple implementation of this class exists depending on if the trash and versions
			// backends are enabled.

			$hasVersionApp = interface_exists(\OCA\Files_Versions\Versions\IVersionBackend::class);
			$hasTrashApp = interface_exists(\OCA\Files_Trashbin\Trash\ITrashBackend::class);

			if ($hasVersionApp && $hasTrashApp) {
				return new ExpireGroupVersionsTrash(
					$c->get(GroupVersionsExpireManager::class),
					$c->get(TrashBackend::class),
					$c->get(Expiration::class)
				);
			}

			if ($hasVersionApp) {
				return new ExpireGroupVersions(
					$c->get(GroupVersionsExpireManager::class),
				);
			}

			if ($hasTrashApp) {
				return new ExpireGroupTrash(
					$c->get(TrashBackend::class),
					$c->get(Expiration::class)
				);
			}

			return new ExpireGroupBase();
		});

		$context->registerService(\OCA\MergeODF\BackgroundJob\ExpireGroupVersions::class, function (IAppContainer $c) {
			if (interface_exists(\OCA\Files_Versions\Versions\IVersionBackend::class)) {
				return new ExpireGroupVersionsJob(
					$c->get(GroupVersionsExpireManager::class),
					$c->get(ITimeFactory::class)
				);
			}

			return new ExpireGroupPlaceholder($c->get(ITimeFactory::class));
		});

		$context->registerService(\OCA\MergeODF\BackgroundJob\ExpireGroupTrash::class, function (IAppContainer $c) {
			if (interface_exists(\OCA\Files_Trashbin\Trash\ITrashBackend::class)) {
				return new ExpireGroupTrashJob(
					$c->get(TrashBackend::class),
					$c->get(Expiration::class),
					$c->get(IConfig::class),
					$c->get(ITimeFactory::class)
				);
			}

			return new ExpireGroupPlaceholder($c->get(ITimeFactory::class));
		});

		$context->registerService(ACLManagerFactory::class, function (IAppContainer $c): ACLManagerFactory {
			$rootFolderProvider = function () use ($c): \OCP\Files\IRootFolder {
				return $c->getServer()->getRootFolder();
			};
			return new ACLManagerFactory(
				$c->get(RuleManager::class),
				$rootFolderProvider
			);
		});

		/** @var IEventDispatcher $dispatcher */
		$dispatcher =  $this->getContainer()->query(IEventDispatcher::class);
		$dispatcher->addServiceListener(LoadSelfSidebar::class, LoadSelfSidebarListener::class);

		$context->registerServiceAlias(IUserMappingManager::class, UserMappingManager::class);

		$dispatcher = $this->getContainer()->query(IEventDispatcher::class);
		$dispatcher->addListener('OCA\Files::loadAdditionalScripts', function() {
			\OCP\Util::addScript('mergeodf', 'mergeodf-files');
		});
		$dispatcher->addListener('OCA\Files_Sharing::loadAdditionalScripts', function () {
			\OCP\Util::addScript('mergeodf', 'mergeodf-files');
		});

	}

	public function boot(IBootContext $context): void {
		$context->injectFn(function (IMountProviderCollection $mountProviderCollection, CacheListener $cacheListener, IGroupManager $groupManager): void {
			$mountProviderCollection->registerProvider($this->getMountProvider());

			$groupManager->listen('\OC\Group', 'postDelete', function (IGroup $group) {
				$this->getFolderManager()->deleteGroup($group->getGID());
			});
			$cacheListener->listen();

			/** @var IGroupManager|Manager $groupManager */
			/** 註冊檔案 upload 同步 */
			$rootfolder = $this->getContainer()->getServer()->getRootFolder();

			/** 禁止透過創造產生子資料夾 */
			$rootfolder->listen('\OC\Files', 'preCreate', function ($k) {
				$method = \OC::$server->getRequest()->getMethod();
				$mount_type = $k->getParent()->getFileInfo()->getMountPoint()->getMountType();
				if ($method == "MKCOL" && $mount_type == "mergeodf") {
					throw new \OC\ServerNotAvailableException;
				}

				$ext = strtolower(pathinfo($k->getPath(), PATHINFO_EXTENSION));
				if ($mount_type == "mergeodf" && ($ext != "ott" && $ext != "ots" && $ext != "otp")) {
					throw new \OC\ServerNotAvailableException;
				}
			});

			/** 禁止透過複製產生子資料夾 */
			$rootfolder->listen('\OC\Files', 'preCopy', function ($k) {
				$method = \OC::$server->getRequest()->getMethod();
				$mount_type = $k->getParent()->getFileInfo()->getMountPoint()->getMountType();
				if ($method == "COPY" && $mount_type == "mergeodf") {
					// Create a sabre server instance to get the information for the request
					$tmpuri = "/remote.php/dav";
					$request = \OC::$server->getRequest();
					$tmps = new \OCA\DAV\Server($request, $tmpuri);
					$path = $tmps->server->httpRequest->getPath();
					$path = str_replace("remote.php/dav", "", $path);
					$node = $tmps->server->tree->getNodeForPath($path);
					if ($node->getFileInfo()->getType() == "dir") {
						throw new \OC\ServerNotAvailableException;
					}
				}
			});

			/** 禁止透過移動產生子資料夾 */
			$rootfolder->listen('\OC\Files', 'preRename', function ($k) {
				$method = \OC::$server->getRequest()->getMethod();
				$tmpuri = "/remote.php/dav";
				$request = \OC::$server->getRequest();
				$tmps = new \OCA\DAV\Server($request, $tmpuri);
				$dest = $tmps->server->getCopyAndMoveInfo($tmps->server->httpRequest);
				$destPath = $dest['destination'];
				$destDir = dirname($destPath);
				$mount_type = $tmps->server->tree->getNodeForPath($destDir)->getFileInfo()->getMountPoint()->getMountType();
				if ($method == "MOVE" && $mount_type == "mergeodf") {
					// Create a sabre server instance to get the information for the request
					if ($k->getFileInfo()->getType() == "dir") {
						throw new \OC\ServerNotAvailableException;
					}
				}
			});


			/** 註冊檔案 upload 同步 */
			$rootfolder->listen('\OC\Files', 'postCreate', function ($k) {
				$fileInfo = $k->getFileInfo();
				if (
					$fileInfo->getMountPoint()->getMountType() == "mergeodf" &&
					$fileInfo->getData()->getData()['type'] == "file"
				) {
					$this->uploadFile($fileInfo);
				}
			});

			/** 註冊檔案 delete 同步 */
			$rootfolder->listen('\OC\Files', 'postDelete', function ($k) {
				$fileInfo = $k->getFileInfo();
				if (
					$fileInfo->getMountPoint()->getMountType() == "mergeodf" &&
					$fileInfo->getData()->getData()['type'] == "file"
				) {
					$this->deleteFile($fileInfo);
				}
			});

			/*	Update 可以註冊的 Hook (非官方提供的 Hook, 必須自己接)
					OC_Filesystem:
						pre_create
						pre_update
						pre_write
						post_create
						post_update
						post_write
					Sabre/DAV/Server/Hook:
						beforeWriteContent
						afterWriteContent

				**這裡採用 post_update**
			*/
			Util::connectHook('OC_Filesystem', 'post_update', $this, 'postUpdate');

			/** 註冊檔案 update 同步 */
			$rootfolder->listen('\OC\Files', 'postUpdate', function ($k) {
				$fileInfo = $k;
				if (
					$fileInfo->getMountPoint()->getMountType() == "mergeodf"
				) {
					$this->updateFile($fileInfo);
				}
			});

			// 註冊檔案上傳提醒
			$notifyManager = $this->getContainer()->getServer()->getNotificationManager();
			$notifyManager->registerNotifierService(
				Notifier::class
			);
		});

		$user = \OC::$server->getUserSession()->getUser();
		if ($user instanceof \OC\User\User){
			$folders = $this->getFolderManager()->getFoldersForUserHidden($user);
			foreach($folders as $folder) {
				\OCA\MergeODF\App::getNavigationManager()->add([
					'id' => 'mergeodflist-'.$folder['folder_id'],
					'appname' => 'mergeodf',
					'script' => 'app_list.php',
					'order' => 5,
					'name' => $folder['mount_point'], // "範本中心",
					'icon' => "mergeodf"
				]);
			}
		}
	}

	public function getMountProvider(): MountProvider {
		return $this->getContainer()->get(MountProvider::class);
	}

	public function getFolderManager(): FolderManager {
		return $this->getContainer()->get(FolderManager::class);
	}

	public function postUpdate($arguments) {
		$info = Filesystem::getView()->getFileInfo($arguments['path']);
		$this->getContainer()->getServer()->getRootFolder()->emit('\OC\Files', 'postUpdate', [$info]);
	}

	private function uploadFile(\OC\Files\FileInfo $fileInfo) {
		$filePath = $fileInfo->getInternalPath();
		$fileType = $fileInfo->getMimetype();
		$fileName = $fileInfo->getName();
		$fileExt = $fileInfo->getExtension();
		$folderId = $fileInfo->getMountPoint()->getFolderId(); // getFolderId is in MergeODF's GroupMounPoint
		$file_content = $fileInfo->getStorage()->file_get_contents($filePath);
		$api_server = $this->getFolderManager()->getAPIServer($folderId);
		$path_hash  = $fileInfo->getData()->getData()['path_hash'];
		$mtime  = $fileInfo->getData()->getData()['mtime'];
		$cid = $fileInfo->getMountPoint()->getMountPoint();
		$cid = explode("/", $cid)[3];
		$baseName = str_replace("." . $fileExt, "", $fileName);

		$url = $api_server . "/lool/mergeodf/upload";
		$tmph = tmpfile();
		fwrite($tmph, $file_content);
		$tmpf = stream_get_meta_data($tmph)['uri'];
		$fields = array(
			'endpt' => $path_hash,
			'filename' => curl_file_create($tmpf, $fileType, $fileName),
			'extname' => $fileExt,
			'cname' => $cid,
			'docname' => $baseName,
			'uptime' => date("Y-m-d H:i:s", $mtime)
		);
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($curl, CURLOPT_TIMEOUT, 10);
		$response = curl_exec($curl);
		$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		$mount_point = $this->getFolderManager()->getMountPointById($folderId);
		if ($httpCode != 200) {
			$this->notify("upload-fail", $mount_point, $api_server, $fileName);
		} else {
			$this->notify("upload-success", $mount_point, $api_server, $fileName);
		}
		curl_close($curl);
	}

	private function deleteFile(\OC\Files\FileInfo $fileInfo) {
		$fileExt = $fileInfo->getExtension();
		$folderId = $fileInfo->getMountPoint()->getFolderId(); // etFolderId is in MergeODF's GroupMounPoint
		$fileName = $fileInfo->getName();
		$api_server = $this->getFolderManager()->getAPIServer($folderId);
		$path_hash  = $fileInfo->getData()->getData()['path_hash'];

		$url = $api_server . "/lool/mergeodf/delete";
		$fields = array(
			'endpt' => $path_hash,
			'extname' => $fileExt,
		);
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($curl, CURLOPT_TIMEOUT, 10);
		$response = curl_exec($curl);
		$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		$mount_point = $this->getFolderManager()->getMountPointById($folderId);
		if ($httpCode != 200) {
			$this->notify("upload-fail", $mount_point, $api_server, $fileName);
		} else {
			$this->notify("upload-success", $mount_point, $api_server, $fileName);
		}
		curl_close($curl);
	}

	private function updateFile(\OC\Files\FileInfo $fileInfo) {
		$filePath = $fileInfo->getInternalPath();
		$fileType = $fileInfo->getMimetype();
		$fileName = $fileInfo->getName();
		$fileExt = $fileInfo->getExtension();
		$folderId = $fileInfo->getMountPoint()->getFolderId(); // getFolderId is in MergeODF's GroupMounPoint
		$file_content = $fileInfo->getStorage()->file_get_contents($filePath);
		$api_server = $this->getFolderManager()->getAPIServer($folderId);
		$path_hash  = $fileInfo->getData()->getData()['path_hash'];
		$mtime  = $fileInfo->getData()->getData()['mtime'];
		$cid = $fileInfo->getMountPoint()->getMountPoint();
		$cid = explode("/", $cid)[3];

		$url = $api_server . "/lool/mergeodf/update";
		$tmph = tmpfile();
		fwrite($tmph, $file_content);
		$tmpf = stream_get_meta_data($tmph)['uri'];
		$fields = array(
			'endpt' => $path_hash,
			'filename' => curl_file_create($tmpf, $fileType, $fileName),
			'extname' => $fileExt,
			'cid' => $cid,
			'uptime' => date("Y-m-d H:i:s", $mtime)
		);
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($curl, CURLOPT_TIMEOUT, 10);
		$response = curl_exec($curl);
		$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		$mount_point = $this->getFolderManager()->getMountPointById($folderId);
		if ($httpCode != 200) {
			$this->notify("upload-fail", $mount_point, $api_server, $fileName);
		} else {
			$this->notify("upload-success", $mount_point, $api_server, $fileName);
		}
		curl_close($curl);
	}

	private function notify(string $type, string $mount_point, string $api_server, string $filename) {
		$user = $this->getContainer()->getServer()->getSession()->get('user_id');
		$manager = $this->getContainer()->getServer()->getNotificationManager();
		$notification = $manager->createNotification();
		$notification->setApp('mergeodf')
			->setUser($user)
			->setDateTime(new \DateTime())
			->setObject('mergeodf', '1') // $type and $id
			->setSubject($type, [
				'filename' => $filename,
				'user' => $user,
				'api_server' => $api_server,
				'mount_point' => $mount_point
			]);
		$manager->notify($notification);
	}
}

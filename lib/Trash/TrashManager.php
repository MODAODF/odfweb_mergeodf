<?php
/**
 * @copyright Copyright (c) 2018 Robin Appelman <robin@icewind.nl>
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

namespace OCA\TemplateRepo\Trash;

use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

class TrashManager {
	private IDBConnection $connection;

	public function __construct(IDBConnection $connection) {
		$this->connection = $connection;
	}

	/**
	 * @param int[] $folderIds
	 * @return array
	 */
	public function listTrashForFolders(array $folderIds): array {
		$query = $this->connection->getQueryBuilder();
		$query->select(['trash_id', 'name', 'deleted_time', 'original_location', 'folder_id', 'file_id'])
			->from('merge_odf_trash')
			->orderBy('deleted_time')
			->where($query->expr()->in('folder_id', $query->createNamedParameter($folderIds, IQueryBuilder::PARAM_INT_ARRAY)));
		return $query->executeQuery()->fetchAll();
	}

	public function addTrashItem(int $folderId, string $name, int $deletedTime, string $originalLocation, int $fileId): void {
		$query = $this->connection->getQueryBuilder();
		$query->insert('merge_odf_trash')
			->values([
				'folder_id' => $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT),
				'name' => $query->createNamedParameter($name),
				'deleted_time' => $query->createNamedParameter($deletedTime, IQueryBuilder::PARAM_INT),
				'original_location' => $query->createNamedParameter($originalLocation),
				'file_id' => $query->createNamedParameter($fileId, IQueryBuilder::PARAM_INT)
			]);
		$query->executeStatement();
	}

	public function getTrashItemByFileId(int $fileId): array {
		$query = $this->connection->getQueryBuilder();
		$query->select(['trash_id', 'name', 'deleted_time', 'original_location', 'folder_id'])
			->from('merge_odf_trash')
			->where($query->expr()->eq('file_id', $query->createNamedParameter($fileId, IQueryBuilder::PARAM_INT)));
		return $query->executeQuery()->fetch();
	}

	public function removeItem(int $folderId, string $name, int $deletedTime): void {
		$query = $this->connection->getQueryBuilder();
		$query->delete('merge_odf_trash')
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)))
			->andWhere($query->expr()->eq('name', $query->createNamedParameter($name)))
			->andWhere($query->expr()->eq('deleted_time', $query->createNamedParameter($deletedTime, IQueryBuilder::PARAM_INT)));
		$query->executeStatement();
	}

	public function emptyTrashbin(int $folderId): void {
		$query = $this->connection->getQueryBuilder();
		$query->delete('template_repo_trash')
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)));
		$query->executeStatement();
	}
}

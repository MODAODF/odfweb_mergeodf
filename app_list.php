<?php
/**
 * @copyright Copyright (c) 2016, ownCloud, Inc.
 *
 * @author Morris Jobke <hey@morrisjobke.de>
 * @author Vincent Petry <pvince81@owncloud.com>
 *
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */
use OCA\Files\Event\LoadSidebar;
use OCA\MergeODF\Event\LoadSelfSidebar;
// TODO: move to handlebars
$config = \OC::$server->getConfig();
$userSession = \OC::$server->getUserSession();
$publicUploadEnabled = $config->getAppValue('core', 'shareapi_allow_public_upload', 'yes');

$showgridview = $config->getUserValue($userSession->getUser()->getUID(), 'files', 'show_grid', false);

// renders the controls and table headers template
$tmpl = new OCP\Template('mergeodf', 'app_list', '');

/*Add self resource
   css: \OC_Util::addStyle
   js : \OC_Util::addScript
*/
OC_Util::addStyle('mergeodf', "merged", true);
// fire script events
$eventDispatcher = \OC::$server->getEventDispatcher();
$eventDispatcher->dispatch(LoadSidebar::class, new LoadSidebar());
$eventDispatcher->dispatch(LoadSelfSidebar::class, new LoadSelfSidebar());
// gridview not available for ie
$tmpl->assign('showgridview', $showgridview);
$tmpl->assign('publicUploadEnabled', $publicUploadEnabled);
$tmpl->printPage();

/*
 * @copyright Copyright (c) 2018 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
import { generateUrl, imagePath } from '@nextcloud/router'

// Rewrite FileList's _isHiddenFile to hide the folder mount on mergeodf  to render in apps/files
OC.Plugins.register('OCA.Files.FileList', {
	//target is FileList instance
	attach: (target) => {
		console.log(target);
		target._isHiddenFile = function(file) {
			//Using  mountType to Hide
			if (file.mountType === "mergeodf"){
				return true;
			}

			// Original Hidden logic
			return file.name && file.name.charAt(0) === '.';
		}
	}
});

window.addEventListener('DOMContentLoaded', () => {
	if (OCA.Theming) {
		OC.MimeType._mimeTypeIcons['dir-mergeodf'] = generateUrl('/apps/theming/img/mergeodf/folder-group.svg?v=' + OCA.Theming.cacheBuster)
	} else {
		OC.MimeType._mimeTypeIcons['dir-mergeodf'] = imagePath('mergeodf', 'folder-group')
	}

	if (!OCA?.Sharing?.ShareTabSections) {
		return
	}
	import(/* webpackChunkName: "sharing" */'./SharingSidebarApp').then((Module) => {
		OCA.Sharing.ShareTabSections.registerSection((el, fileInfo) => {
			if (fileInfo.mountType !== 'mergeodf') {
				return
			}
			return Module.default
		})
	})
})
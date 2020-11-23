/*
 * Copyright (c) 2014 Vincent Petry <pvince81@owncloud.com>
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function(OCA) {
	/**
	 * Registers the favorites file list from the files app sidebar.
	 *
	 * @namespace OCA.Files.MergeODFPlugin
	*/
	OCA.Files.MergeODFPlugin = {
		name: 'MergeODF',

		/**
		 * @type OCA.Files.MergeODFFileList
		 */
		mergeodfFileList: null,

		attach: function () {
			var self = this;
			$('#app-content-mergeodflist').on('show.plugin-mergeodf', function (e) {
				self.showFileList($(e.target));
			});
			$('#app-content-mergeodflist').on('hide.plugin-mergeodf', function () {
				self.hideFileList();
			});
		},

		detach: function () {
			if (this.mergeodfFileList) {
				this.mergeodfFileList.destroy();
				OCA.Files.fileActions.off('setDefault.plugin-mergeodf', this._onActionsUpdated);
				OCA.Files.fileActions.off('registerAction.plugin-mergeodf', this._onActionsUpdated);
				$('#app-content-mergeodflist').off('.plugin-mergeodf');
				this.mergeodfFileList = null;
			}
		},

		showFileList: function ($el) {
			if (!this.mergeodfFileList) {
				this.mergeodfFileList = this._createMergeODFFileList($el);
			}
			return this.mergeodfFileList;
		},

		hideFileList: function () {
			if (this.mergeodfFileList) {
				this.mergeodfFileList.$fileList.empty();
			}
		},

		/**
		 * Creates the favorites file list.
		 *
		 * @param $el container for the file list
		 * @return {OCA.Files.MergeODFFileList} file list
		 */
		_createMergeODFFileList: function ($el) {
			var fileActions = this._createFileActions();
			// register favorite list for sidebar section
			return new OCA.Files.MergeODFFileList(
				$el, {
				fileActions: fileActions,
				// The file list is created when a "show" event is handled,
				// so it should be marked as "shown" like it would have been
				// done if handling the event with the file list already
				// created.
				shown: true
			}
			);
		},

		_createFileActions: function () {
			// inherit file actions from the files app
			var fileActions = new OCA.Files.FileActions();
			// note: not merging the legacy actions because legacy apps are not
			// compatible with the sharing overview and need to be adapted first
			fileActions.registerDefaultActions();
			fileActions.merge(OCA.Files.fileActions);

			if (!this._globalActionsInitialized) {
				// in case actions are registered later
				this._onActionsUpdated = _.bind(this._onActionsUpdated, this);
				OCA.Files.fileActions.on('setDefault.plugin-mergeodf', this._onActionsUpdated);
				OCA.Files.fileActions.on('registerAction.plugin-mergeodf', this._onActionsUpdated);
				this._globalActionsInitialized = true;
			}
			// when the user clicks on a folder, redirect to the corresponding
			// folder in the files app instead of opening it directly
			fileActions.register('dir', 'Open', OC.PERMISSION_READ, '', function (filename, context) {
				OCA.Files.App.setActiveView('files', { silent: true });
				OCA.Files.App.fileList.changeDirectory(OC.joinPaths(context.$file.attr('data-path'), filename), true, true);
			});
			fileActions.setDefault('dir', 'Open');
			return fileActions;
		},

		_onActionsUpdated: function (ev) {
			if (ev.action) {
				this.mergeodfFileList.fileActions.registerAction(ev.action);
			} else if (ev.defaultAction) {
				this.mergeodfFileList.fileActions.setDefault(
					ev.defaultAction.mime,
					ev.defaultAction.name
				);
			}
		}
	};


})(OCA);

OC.Plugins.register('OCA.Files.App', OCA.Files.MergeODFPlugin);


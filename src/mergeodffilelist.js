/*
 * Copyright (c) 2014 Vincent Petry <pvince81@owncloud.com>
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

// HACK: this piece needs to be loaded AFTER the files app (for unit tests)
$(document).ready(function() {
	(function(OCA) {
		/**
		 * @class OCA.Files.MergeODFFileList
		 * @augments OCA.Files.MergeODFFileList
		 *
		 * @classdesc MergeODF file list.
		 * Displays the list of files marked as favorites
		 *
		 * @param $el container element with existing markup for the #controls
		 * and a table
		 * @param [options] map of options, see other parameters
		 */
		const MergeODFFileList = function($el, options) {
			this.initialize($el, options)
		}
		MergeODFFileList.prototype = _.extend({}, OCA.Files.FileList.prototype,
			/** @lends OCA.Files.MergeODFFileList.prototype */ {
				id: 'mergeodflist',
				appName: t('mergeodf', 'MergeODF'),

				_clientSideSort: true,
				_allowSelection: false,

				/**
				 * @param $el
				 * @param options
				 * @private
				 */
				initialize($el, options) {
					OCA.Files.FileList.prototype.initialize.apply(this, arguments)
					if (this.initialized) {
						return
					}
					OC.Plugins.attach('OCA.Files.MergeODFFileList', this)
					$.ajax({
						url: OC.generateUrl('/apps/mergeodf/folderlist'),
						type: 'GET',
						dataType: 'json',
					}).done(() => {

					})
				},

				updateEmptyContent() {
					const dir = this.getCurrentDirectory()
					if (dir === '/') {
						// root has special permissions
						this.$el.find('#emptycontent').toggleClass('hidden', !this.isEmpty)
						this.$el.find('#filestable thead th').toggleClass('hidden', this.isEmpty)
					} else {
						OCA.Files.FileList.prototype.updateEmptyContent.apply(this, arguments)
					}
				},

				getDirectoryPermissions() {
					return OC.PERMISSION_READ | OC.PERMISSION_DELETE
				},

				updateStorageStatistics() {
					// no op because it doesn't have
					// storage info like free space / used space
				},

				reload() {
					this.showMask()
					if (this._reloadCall) {
						this._reloadCall.abort()
					}

					// there is only root
					this._setCurrentDir('/', false)

					this._reloadCall = $.ajax({
						url: OC.generateUrl('/apps/mergeodf/folderlist'),
						type: 'GET',
						dataType: 'json',
					})
					const callBack = this.reloadCallback.bind(this)
					return this._reloadCall.then(callBack, callBack)
				},

				reloadCallback(result) {
					delete this._reloadCall
					this.hideMask()

					if (result.files) {
						this.setFiles(result.files.sort(this._sortComparator))
						return true
					}
					return false
				},
			})

		OCA.Files.MergeODFFileList = MergeODFFileList
	})(OCA)
})

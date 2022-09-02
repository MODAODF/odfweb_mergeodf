/*
 * Copyright (c) 2014
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

/* global Files */

(function() {

	/**
	 * Construct a new NewFileMenu instance
	 *
	 * @constructs NewFileMenu
	 *
	 * @memberof OCA.Files
	 */
	const NewFileMenu = OC.Backbone.View.extend({
		tagName: 'div',
		// Menu is opened by default because it's rendered on "add-button" click
		className: 'newFileMenu popovermenu bubble menu open menu-left',
		parent_id: '',
		list_id: null,
		events: {
			'click .menuitem': '_onClickAction',
		},

		/**
		 * @type OCA.Files.FileList
		 */
		fileList: null,

		initialize(options) {
			const self = this
			this.parent_id = options.parent_id
			this.list_id = options.list_id
			const $uploadEl = $(this.parent_id + ' #file_upload_start_' + this.list_id)
			if ($uploadEl.length) {
				$uploadEl.on('fileuploadstart', function() {
					self.trigger('actionPerformed', 'upload')
				})
			} else {
				console.warn('Missing upload element "file_upload_start"')
			}

			this.fileList = options && options.fileList
			this._menuItems = []
			// OC.Plugins.attach('OCA.Files.NewFileMenu', this);
		},

		template(data) {
			return OCA.Files.Templates.newfilemenu(data)
		},

		/**
		 * Event handler whenever an action has been clicked within the menu
		 *
		 * @param {object} event event object
		 */
		_onClickAction(event) {
			let $target = $(event.target)
			if (!$target.hasClass('menuitem')) {
				$target = $target.closest('.menuitem')
			}
			const action = $target.attr('data-action')
			// note: clicking the upload label will automatically
			// set the focus on the "file_upload_start" hidden field
			// which itself triggers the upload dialog.
			// Currently the upload logic is still in file-upload.js and filelist.js
			if (action === 'upload') {
				OC.hideMenus()
			} else {
				event.preventDefault()
				this.$el.find('.menuitem.active').removeClass('active')
				$target.addClass('active')
				this._promptFileName($target)
			}
		},

		_promptFileName($target) {
			const self = this

			if ($target.find('form').length) {
				$target.find('input[type=\'text\']').focus()
				return
			}

			// discard other forms
			this.$el.find('form').remove()
			this.$el.find('.displayname').removeClass('hidden')

			$target.find('.displayname').addClass('hidden')

			const newName = $target.attr('data-templatename')
			const fileType = $target.attr('data-filetype')
			const $form = $(OCA.Files.Templates.newfilemenu_filename_form({
				fileName: newName,
				cid: this.cid,
				fileType,
			}))

			// this.trigger('actionPerformed', action);
			$target.append($form)

			// here comes the OLD code
			const $input = $form.find('input[type=\'text\']')
			const $submit = $form.find('input[type=\'submit\']')

			let lastPos
			const checkInput = function() {
				const filename = $input.val()
				try {
					if (!Files.isFileNameValid(filename)) {
						// Files.isFileNameValid(filename) throws an exception itself
					} else if (self.fileList.inList(filename)) {
						throw t('files', '{newName} already exists', { newName: filename }, undefined, {
							escape: false,
						})
					} else {
						return true
					}
				} catch (error) {
					$input.attr('title', error)
					$input.tooltip({ placement: 'right', trigger: 'manual', container: '.newFileMenu' })
					$input.tooltip('fixTitle')
					$input.tooltip('show')
					$input.addClass('error')
				}
				return false
			}

			// verify filename on typing
			$input.keyup(function() {
				if (checkInput()) {
					$input.tooltip('hide')
					$input.removeClass('error')
				}
			})

			$submit.click(function(event) {
				event.stopPropagation()
				event.preventDefault()
				$form.submit()
			})

			$input.focus()
			// pre select name up to the extension
			lastPos = newName.lastIndexOf('.')
			if (lastPos === -1) {
				lastPos = newName.length
			}
			$input.selectRange(0, lastPos)

			$form.submit(function(event) {
				event.stopPropagation()
				event.preventDefault()

				if (checkInput()) {
					const newname = $input.val().trim()

					/* Find the right actionHandler that should be called.
					 * Actions is retrieved by using `actionSpec.id` */
					const action = _.filter(self._menuItems, function(item) {
						return item.id == $target.attr('data-action')
					}).pop()
					action.actionHandler(newname)

					$form.remove()
					$target.find('.displayname').removeClass('hidden')
					OC.hideMenus()
				}
			})
		},

		/**
		 * Add a new item menu entry in the “New” file menu (in
		 * last position). By clicking on the item, the
		 * `actionHandler` function is called.
		 *
		 * @param {object} actionSpec item’s properties
		 */
		addMenuEntry(actionSpec) {
			this._menuItems.push({
				id: actionSpec.id,
				displayName: actionSpec.displayName,
				templateName: actionSpec.templateName,
				iconClass: actionSpec.iconClass,
				fileType: actionSpec.fileType,
				actionHandler: actionSpec.actionHandler,
		        })
		},

		/**
		 * Renders the menu with the currently set items
		 */
		render() {
			this.$el.html(this.template({
				uploadMaxHumanFileSize: 'TODO',
				uploadLabel: t('files', 'Upload file'),
				items: this._menuItems,
			}))

			this.$el.find('label').attr('for', 'file_upload_start_' + this.list_id)
			// Trigger upload action also with keyboard navigation on enter
			this.$el.find('[for="file_upload_start"]').on('keyup', function(event) {
				if (event.key === ' ' || event.key === 'Enter') {
					$(this.parent_id + ' #file_upload_start').trigger('click')
				}
			})
		},

		/**
		 * Displays the menu under the given element
		 *
		 * @param {object} $target target element
		 */
		showAt($target) {
			this.render()
			OC.showMenu(null, this.$el)
		},
	})

	OCA.MergeODF.NewFileMenu = NewFileMenu

})()

(function() {

	var OCdialogs = {
		// dialog button types
		YES_NO_BUTTONS: 70,
		OK_BUTTONS: 71,
		// used to name each dialog
		dialogsCounter: 0,
		/**
		 * displays alert dialog
		 *
		 * @param text content of dialog
		 * @param title dialog title
		 * @param callback which will be triggered when user presses OK
		 * @param modal make the dialog modal
		 */
		alert(text, title, callback, modal) {
			this.message(
				text,
				title,
				'alert',
				OCdialogs.OK_BUTTON,
				callback,
				modal
			)
		},
		/**
		 * displays info dialog
		 *
		 * @param text content of dialog
		 * @param title dialog title
		 * @param options
		 * @param callback which will be triggered when user presses OK
		 * @param modal make the dialog modal
		 */
		info(text, title, options, callback, modal) {
			this.message(text, title, 'info', OCdialogs.OK_BUTTON, options, callback, modal)
		},
		/**
		 * displays confirmation dialog
		 *
		 * @param text content of dialog
		 * @param title dialog title
		 * @param callback which will be triggered when user presses YES or NO
		 *        (true or false would be passed to callback respectively)
		 * @param modal make the dialog modal
		 */
		confirm(text, title, callback, modal) {
			return this.message(
				text,
				title,
				'notice',
				OCdialogs.YES_NO_BUTTONS,
				callback,
				modal
			)
		},
		/**
		 * displays prompt dialog
		 *
		 * @param text content of dialog
		 * @param title dialog title
		 * @param callback which will be triggered when user presses YES or NO
		 *        (true or false would be passed to callback respectively)
		 * @param modal make the dialog modal
		 * @param name name of the input field
		 * @param password whether the input should be a password input
		 */
		prompt(text, title, callback, modal, name, password) {
			return $.when(this._getMessageTemplate()).then(function($tmpl) {
				const dialogName = 'oc-dialog-' + OCdialogs.dialogsCounter + '-content'
				const dialogId = '#' + dialogName
				const $dlg = $tmpl.octemplate({
					dialog_name: dialogName,
					title,
					message: text,
					type: 'notice',
				})
				const input = $('<input/>')
				input.attr('type', password ? 'password' : 'text').attr('id', dialogName + '-input').attr('placeholder', name)
				const label = $('<label/>').attr('for', dialogName + '-input').text(name + ': ')
				$dlg.append(label)
				$dlg.append(input)
				if (modal === undefined) {
					modal = false
				}
				$('body').append($dlg)

				// wrap callback in _.once():
				// only call callback once and not twice (button handler and close
				// event) but call it for the close event, if ESC or the x is hit
				if (callback !== undefined) {
					callback = _.once(callback)
				}

				const buttonlist = [{
					text: t('core', 'No'),
					click() {
						if (callback !== undefined) {
							callback(false, input.val())
						}
						$(dialogId).ocdialog('close')
					},
				}, {
					text: t('core', 'Yes'),
					click() {
						if (callback !== undefined) {
							callback(true, input.val())
						}
						$(dialogId).ocdialog('close')
					},
					defaultButton: true,
				}]

				$(dialogId).ocdialog({
					closeOnEscape: true,
					modal,
					buttons: buttonlist,
					close() {
						// callback is already fired if Yes/No is clicked directly
						if (callback !== undefined) {
							callback(false, input.val())
						}
					},
				})
				input.focus()
				OCdialogs.dialogsCounter++
			})
		},

		/**
		 * Displays raw dialog
		 * You better use a wrapper instead ...
		 *
		 * @param content
		 * @param title
		 * @param dialogType
		 * @param buttons
		 * @param options
		 * @param callback
		 * @param modal
		 * @param allowHtml
		 */
		message(content, title, dialogType, buttons, options, callback, modal, allowHtml) {
			return $.when(this._getMessageTemplate()).then(function($tmpl) {
				const dialogName = 'oc-dialog-' + OCdialogs.dialogsCounter + '-content'
				const dialogId = '#' + dialogName
				const $dlg = $tmpl.octemplate({
					dialog_name: dialogName,
					title,
					message: '',
					type: dialogType,
				}, allowHtml ? { escapeFunction: '' } : {})
				if (modal === undefined) {
					modal = false
				}
				if (options.type === 'json') {
					$dlg.html('')
					$dlg.append(`<h3>API 名稱: ${options.api_name}</h3>`)
					$dlg.append(`<h3>API 位置: ${options.api_url}</h3>`)
					$dlg.append('<hr>')
					$dlg.append(content)
				} else if (options.type === 'yaml') {
					$dlg.html('')
					$dlg.append(`<h3>API 名稱: ${options.api_name}</h3>`)
					$dlg.append(`<h3>API 位置: ${options.api_url}</h3>`)
					$dlg.append('<hr>')
					$dlg.append(`<pre>${content}</pre>`)
				}

				$('body').append($dlg)

				let buttonlist = []
				switch (buttons) {
				case OCdialogs.YES_NO_BUTTONS:
					buttonlist = [{
						text: t('core', 'No'),
						click() {
							if (callback !== undefined) {
								callback(false)
							}
							$(dialogId).ocdialog('close')
						},
					},
					{
						text: t('core', 'Yes'),
						click() {
							if (callback !== undefined) {
								callback(true)
							}
							$(dialogId).ocdialog('close')
						},
						defaultButton: true,
					}]
					break
				case OCdialogs.OK_BUTTON:
					var functionToCall = function() {
						$(dialogId).ocdialog('close')
						if (callback !== undefined) {
							callback()
						}
					}
					buttonlist[0] = {
						text: t('core', 'OK'),
						click: functionToCall,
						defaultButton: true,
					}
					break
				}

				$(dialogId).ocdialog({
					closeOnEscape: true,
					modal,
					buttons: buttonlist,
				})
				OCdialogs.dialogsCounter++
			})
				.fail(function(status, error) {
					// If the method is called while navigating away from
					// the page, we still want to deliver the message.
					if (status === 0) {
						alert(title + ': ' + content)
					} else {
						alert(t('core', 'Error loading message template: {error}', { error }))
					}
				})
		},
		_getMessageTemplate() {
			const defer = $.Deferred()
			if (!this.$messageTemplate) {
				const self = this
				$.get(OC.filePath('core', 'templates', 'message.html'), function(tmpl) {
					self.$messageTemplate = $(tmpl)
					defer.resolve(self.$messageTemplate)
				})
					.fail(function(jqXHR, textStatus, errorThrown) {
						defer.reject(jqXHR.status, errorThrown)
					})
			} else {
				defer.resolve(this.$messageTemplate)
			}
			return defer.promise()
		},
	}

	OCA.MergeODF = OCA.MergeODF || {}
	OCA.MergeODF.dialogs = OCdialogs

})()

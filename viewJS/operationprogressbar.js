/*
 * Copyright (c) 2018
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function() {
	const OperationProgressBar = OC.Backbone.View.extend({
		tagName: 'div',
		id: 'uploadprogresswrapper',
		parent_id: '',
		events: {
			'click button.stop': '_onClickCancel',
		},

		render() {
			this.$el.html(OCA.Files.Templates.operationprogressbar({
				textCancelButton: t('Cancel operation'),
			}))
			this.setProgressBarText(t('Uploading …'), t('…'))
		},

		hideProgressBar() {
			const self = this
			$(this.parent_id + ' #uploadprogresswrapper .stop').fadeOut()
			$(this.parent_id + ' #uploadprogressbar').fadeOut(function() {
				self.$el.trigger(new $.Event('resized'))
			})
		},

		hideCancelButton() {
			const self = this
			$(this.parent_id + ' #uploadprogresswrapper .stop').fadeOut(function() {
				self.$el.trigger(new $.Event('resized'))
			})
		},

		showProgressBar(showCancelButton) {
			if (showCancelButton) {
				showCancelButton = true
			}
			$(this.parent_id + ' #uploadprogressbar').progressbar({ value: 0 })
			if (showCancelButton) {
				$(this.parent_id + ' #uploadprogresswrapper .stop').show()
			} else {
				$(this.parent_id + ' #uploadprogresswrapper .stop').hide()
			}
			$(this.parent_id + ' #uploadprogresswrapper .label').show()
			$(this.parent_id + ' #uploadprogressbar').fadeIn()
			this.$el.trigger(new $.Event('resized'))
		},

		setProgressBarValue(value) {
			$(this.parent_id + ' #uploadprogressbar').progressbar({ value })
		},

		setProgressBarText(textDesktop, textMobile, title) {
			const labelHtml = OCA.Files.Templates.operationprogressbarlabel({ textDesktop, textMobile })
			$(this.parent_id + ' #uploadprogressbar .ui-progressbar-value').html(labelHtml)
			$(this.parent_id + ' #uploadprogressbar .ui-progressbar-value>em').addClass('inner')
			$(this.parent_id + ' #uploadprogressbar>em').replaceWith(labelHtml)
			$(this.parent_id + ' #uploadprogressbar>em').addClass('outer')
			$(this.parent_id + ' #uploadprogressbar').tooltip({ placement: 'bottom' })
			if (title) {
				$(this.parent_id + ' #uploadprogressbar').attr('original-title', title)
			}
			if (textDesktop || textMobile) {
				$(this.parent_id + ' #uploadprogresswrapper .stop').show()
			}
		},

		_onClickCancel(event) {
			this.trigger('cancel')
			return false
		},
	})

	OCA.MergeODF.OperationProgressBar = OperationProgressBar
})(OC, OCA)

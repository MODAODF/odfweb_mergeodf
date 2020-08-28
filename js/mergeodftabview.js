/*
 * Copyright (c) 2015
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function() {

	/**
	 * @class OCA.Activity.ActivityTabView
	 * @classdesc
	 *
	 * Displays activity information for a given file
	 *
	 */
	var MergeODFTabView = OCA.Files.DetailTabView.extend(/** @lends OCA.Activity.ActivityTabView.prototype */ {
		id: 'mergeodfTabView',
		className: 'mergeodfTabView tab',

		events: {
			'click .showMore': '_onClickShowMore'
		},

		_loading: false,
		_plugins: [],

		initialize: function() {
			console.log("tabview initialize");
		},

		template: function(data) {
			return OCA.Activity.Templates['activitytabview'](data);
		},

		get$: function() {
			return this.$el;
		},

		getLabel: function() {
			return t('activity', 'Activity');
		},

		getIcon: function() {
			return 'icon-activity';
		},

		setFileInfo: function(fileInfo) {
			this._fileInfo = fileInfo;
			this.render();
		},

		_onError: function() {
			var $emptyContent = this.$el.find('.emptycontent');
			$emptyContent.removeClass('hidden');
			$emptyContent.find('p').text(t('activity', 'An error occurred while loading activities'));
		},

		_onRequest: function() {
			if (this.collection.lastGivenId === 0) {
				this.render();
			}
			this.$el.find('.showMore').addClass('hidden');
		},

		_onEndRequest: function() {
			this.$container.removeClass('hidden');
			this.$el.find('.loading').addClass('hidden');
			if (this.collection.length) {
				this.$el.find('.emptycontent').addClass('hidden');
			}
			if (this.collection.hasMore) {
				this.$el.find('.showMore').removeClass('hidden');
			}
		},

		_onClickShowMore: function() {
			
		},

		/**
		 * Renders this details view
		 */
		render: function() {
			if (this._fileInfo) {
				this.$el.html("<h1>Test</h1>");
			}
		}
	});

	OCA.MergeODF = OCA.MergeODF || {};
	OCA.MergeODF.MergeODFTabView = MergeODFTabView;
})();

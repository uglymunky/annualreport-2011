define(['jquery', 'underscore', 'backbone', 'dv', 'hogan', 'BlockView']
, function ($, _ , Backbone, dv, Hogan, BlockView) {

	return Backbone.View.extend({

		tagName: 'section'


		, template: function (data) {
			if (! this.tpl) {
				this.tpl = hogan.compile($('#sectionTemplate').html())
			}

			return this.tpl.render(data);
		}


		/**
		 * Render the section
		 *
		 * @params {Object} viewData
		 */
		, render: function (viewData) {
			var $section = this.$el;

			// Build the section element
			$section
				.attr('id', viewData.name)
				.html(new BlockView({
					name: 'sectionTitle'
					, title: viewData.title
					, cssClass: 'g2 h1'
				}).$el);

			// Append each block
			$.each(viewData.blocks, function (i, block) {
				var newBlock = new BlockView(block);

				$section.append(newBlock.el);
			});

			dv.publish('render.sectionView.dv', [$section, this]);
		}


		, initialize: function (viewData) {
			this.name = viewData.name;

			this.model.bind('change:active', '@TODO-dosometing', this);

			if (viewData) {
				this.render(viewData);
			}
		}
	});
});
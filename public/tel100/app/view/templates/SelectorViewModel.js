Ext.define('Tel100.view.templates.SelectorViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.templateselector',

  requires: [
    'Ext.data.Store'
  ],

  stores: {
    templates: {
    	autoLoad: true,
      	model: 'Tel100.model.templates.Templates',
      	groupField: 'category',
      	sorters: ['category','name'],
    }
  }

});
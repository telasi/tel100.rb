Ext.define('Tel100.view.modules.Documents', {
  extend: 'Ext.container.Container',
  alias: 'widget.modulesdocuments',

  viewModel: {
    type: 'modulesdocuments'
  },

  layout: 'fit',

  items: [{
    xtype: 'documentmain',
    border: false
  }]
});

Ext.define('Tel100.view.modules.DocumentsViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.modulesdocuments'
});

Ext.define('Tel100.view.modules.DocumentsViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.modulesdocuments'
});

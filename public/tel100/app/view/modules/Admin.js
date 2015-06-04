Ext.define('Tel100.view.modules.Admin', {
  extend: 'Ext.container.Container',
  alias: 'widget.modulesadmin',

  viewModel: {
    type: 'modulesadmin'
  },

  layout: 'fit',

  items: [{
      xtype: 'adminpanel'
  }]
});

Ext.define('Tel100.view.modules.AdminViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.modulesadmin'
});

Ext.define('Tel100.view.modules.AdminViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.modulesadmin'
});

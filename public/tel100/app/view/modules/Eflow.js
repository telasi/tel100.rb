Ext.define('Tel100.view.modules.Eflow', {
  extend: 'Ext.container.Container',
  alias: 'widget.moduleseflow',

  viewModel: {
    type: 'moduleseflow'
  },

  layout: 'fit',

  items: [{
    xtype: 'eflowpage',
    border: false
  }]
});

Ext.define('Tel100.view.modules.EflowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.moduleseflow'
});

Ext.define('Tel100.view.modules.EflowViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.moduleseflow'
});

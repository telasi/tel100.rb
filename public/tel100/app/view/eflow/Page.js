Ext.define('Tel100.view.eflow.Page', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.eflowpage',
  controller: 'eflowpage',
  viewModel: {
    type: 'eflowpage'
  },

  border: false,
  layout: 'border' ,

  items: [{
    xtype: 'label',
    text: 'eflow main page'
  }]
});

Ext.define('Tel100.view.eflow.PageViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.eflowpage'
});

Ext.define('Tel100.view.eflow.PageViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.eflowpage'
});

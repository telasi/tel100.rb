Ext.define('Tel100.view.eflow.Page', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.eflowpage',
  controller: 'eflowpage',
  viewModel: {
    type: 'eflowpage'
  },

  border: false,
  layout: 'border',

  items: [{
    xtype: 'panel',
    split: true,
    region: 'west',
    width: 300,
    title: {
      bind: '{i18n.eflow.title}',
    },
    layout: 'fit',
    items: [{
      xtype: 'eflowdocumentgrid'
    }]
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

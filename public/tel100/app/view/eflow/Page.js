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
    width: 400,
    layout: 'fit',
    items: [{
      xtype: 'eflowdocumentgrid'
    }]
  }, {
    xtype: 'panel',
    region: 'center',
    html: '<iframe src="http://1.1.2.61" style="width:100%;height:100%;" id="eflow"></iframe>'
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

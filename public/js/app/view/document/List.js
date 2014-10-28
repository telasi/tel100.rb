Ext.define('Telasi.view.document.List', {
  extend: 'Ext.panel.Panel',
  xtype: 'documentList',
  layout: 'border',

  requires: [
    'Telasi.view.document.list.Search',
    'Telasi.view.document.list.Grid'
  ],

  items: [{
    xtype: 'documentSearch',
    region: 'north',
  }, {
    xtype: 'docgrid',
    region: 'center'
  }],
});

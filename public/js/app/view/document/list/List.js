Ext.define('Telasi.view.document.list.List', {
  extend: 'Ext.panel.Panel',
  xtype: 'documentList',
  layout: 'border',
  border: false,

  requires: [
    'Telasi.view.document.list.Search',
    'Telasi.view.document.list.Grid'
  ],

  items: [{
    xtype: 'documentSearch',
    region: 'north',
    bodyPadding: 5,
    border: false,
  }, {
    xtype: 'docgrid',
    region: 'center'
  }],
});

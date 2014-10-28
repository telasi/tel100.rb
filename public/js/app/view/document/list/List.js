Ext.define('Telasi.view.document.list.List', {
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
    border: false,
    bodyPadding: 5,
  }, {
    xtype: 'docgrid',
    region: 'center'
  }],
});

Ext.define('Telasi.view.document.List', {
  extend: 'Ext.panel.Panel',
  xtype: 'documentList',
  layout: 'border',

  requires: [
    'Telasi.view.document.Search',
    'Telasi.view.common.document.Grid'
  ],

  items: [{
    xtype: 'documentSearch',
    region: 'north',
  }, {
    xtype: 'docgrid',
    region: 'center'
  }],
});

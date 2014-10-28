Ext.define('Telasi.view.document.Tab', {
  extend: 'Ext.tab.Panel',
  xtype: 'documentTab',
  border: false,
  controller: 'documentTabController',
  reference: 'documentTab',

  requires: [
    'Telasi.view.document.list.List',
    'Telasi.view.document.TabController',
    'Telasi.view.document.list.DocumentView',
  ],

  items:[{  
    title: 'დოკუმენტები',
    xtype: 'documentList',
  }],
});

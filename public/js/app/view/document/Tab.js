Ext.define('Telasi.view.document.Tab', {
  extend: 'Ext.tab.Panel',
  xtype: 'documentTab',
  controller: 'documentTabController',
  reference: 'documentTab',

  requires: [
    'Telasi.view.document.List',
    'Telasi.view.document.TabController',
    'Telasi.view.document.DocumentView',
  ],

  items:[{  
    title: 'დოკუმენტები',
    xtype: 'documentList',
  }],
});

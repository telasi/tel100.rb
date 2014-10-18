Ext.define('Telasi.view.common.center.TabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'documenttab',
    controller: 'tabcontroller',
    reference: 'documenttab',

    requires: [
        'Telasi.view.common.center.CenterPanel',
        'Telasi.view.common.center.TabController',
        'Telasi.view.document.DocumentView',
    ],

    items:[
        {  
          title: 'დოკუმენტები',
          xtype: 'centerpanel',
        }
    ],
    
});
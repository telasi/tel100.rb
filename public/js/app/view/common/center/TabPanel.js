Ext.define('Telasi.view.common.center.TabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'documenttab',
    controller: 'tabcontroller',

    requires: [
        'Telasi.view.common.center.CenterPanel',
        'Telasi.view.common.center.TabController',
    ],

    items:[
        {  
          title: 'დოკუმენტები',
          xtype: 'centerpanel',
        }
    ],

    initComponent: function(){
        this.getController('tabcontroller').viewDocument();
    }
    
});
Ext.define('Telasi.view.common.center.CenterPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'centerpanel',
    layout: 'border',

    requires: [
        'Telasi.view.common.center.SearchPanel',
        'Telasi.view.common.document.Grid'
    ],

    initComponent: function(){
        Ext.apply(this, {
            items: [
                {
                    xtype: 'searchpanel',
                    region: 'north',
                },
                {
                    xtype: 'docgrid',
                    region: 'center'
                }
            ]
        });
        
        this.callParent();
    }

    
});
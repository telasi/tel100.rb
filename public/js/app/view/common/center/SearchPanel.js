Ext.define('Telasi.view.common.center.SearchPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'searchpanel',
    layout: 'table',
    collapsible: true,
    titleCollapse: true,
    collapsed: true,
    cls: 'my-panel',
    collapsedCls: 'my-panel',
    border: 1,

//  texts
    text_SearchHeader: 'ძებნა',
//  texts

    title: this.text_SearchHeader,

    items: [
        {
            xtype: 'textfield',
            name: 'userID',
            fieldLabel: 'მომხმარებელი',
            emptyText: 'მომხმარებელი',
            allowBlank: false
        }, 
        {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'პაროლი',
            emptyText: 'პაროლი',
            allowBlank: false
        }
    ],

    buttons: [{
            text: 'Filter',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
    }],

    initComponent: function(){
        Ext.apply(this, { title: this.text_SearchHeader });

        this.callParent();
    }
    
});
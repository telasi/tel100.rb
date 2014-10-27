Ext.define('Telasi.view.common.hr.HRChoseForm', {
    extend: 'Telasi.component.common.FitWindow',
    alias: 'widget.HRChoseForm',

    // requires: [
    //     'Telasi.view.common.hr.HRTree'
    // ],

    title: 'Chose',
    frame:true,
    monitorResize: true,
    width: '70%',
    height: '70%',
    layout: 'fit',

    // items:[{
    //     xtype: 'tabpanel',
    //     items:[{
    //         title: 'თანამშრომელი',
    //         xtype: 'HRtree',
    //     }]
    // }],
    
    buttons: [
        { text:'არჩევა' },
        { 
            text:'გაუქმება',
            handler: function(){
                this.up('window').close();
            }
         }
    ],
    
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: Ext.create('Telasi.view.common.hr.HRtree'),
            }]
        })

        this.callParent();
    }
});
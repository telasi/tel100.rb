Ext.define('Telasi.view.common.hr.form.HRChoseForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.HRChoseForm',
    // xtype: 'form-login',

    title: 'Chose',
    frame:true,
    width: 650,
    // height: 600,
    bodyPadding: 10,
    defaultType: 'textfield',
    
    buttons: [
        { text:'Ok' },
        { 
            text:'Cancel',
            handler: function(){
                this.up('window').close();
            }
         }
    ],
    
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: Ext.create('Telasi.view.common.hr.form.HRtree'),
                layout: 'fit'
            }]
        })

        this.defaults = {
            anchor: '100%',
            labelWidth: 120
        };
        
        this.callParent();
    }
});
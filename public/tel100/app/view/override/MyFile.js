Ext.define('Ext.form.field.MyFile', {
    extend: 'Ext.form.field.File',
    alias: 'widget.multiplefileuploadfield',

    multiple: true,

    afterRender: function(){
        var me = this;

        me.callParent(arguments);

        if(me.multiple){
            me.fileInputEl.set({
                multiple:'multiple',
                name: me.name ? me.name + '[]' : 'files[]'
            });
        }
    },
});

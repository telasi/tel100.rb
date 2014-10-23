Ext.define('Telasi.component.hr.HRComboPicker', {
    extend: 'Telasi.component.common.Tag',
    alias: 'widget.hrComboPicker',

    width: 400,
    forceSelection: false,
    store: Ext.create('Telasi.store.hr.HRPickerStore'),
    
    displayField: 'title',
    valueField: 'key',

    createPicker: function(){
        var me = this;
        if(!me.picker){
            me.picker = Ext.create('Telasi.view.common.hr.HRtree',{
                pickerField: me,
                ownerCt: me.ownerCt,
                width: 500,
                floating: 'true',
                hidden: 'true',
                focusOnToFront: false,
            });
        };

        me.mon(me.picker.getSelectionModel(), {
            selectionChange: me.onListSelectionChange,
            scope: me
        });

        return me.picker;
    },

    onListSelectionChange: function(){
        var me = this;
        var record = me.picker.selection;
        if(record.data && record.data.key.substring(0,1) == 'P'){
            // me.addValue({ key: record.key,
            //               title: record.title})
            me.addValue(record);
        }
    },

    onBlur: function(evt) {
        evt.stopPropagation();
        // me.callParent(arguments);
    },

});
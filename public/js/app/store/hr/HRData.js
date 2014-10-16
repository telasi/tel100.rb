Ext.define('Telasi.store.hr.HRData', {
    extend: 'Ext.data.TreeStore',

    // requires: [
    //     'Telasi.model.hr.Organization',
    //     'Telasi.model.hr.Employee'
    // ],

    // autoLoad: false,

    // model: 'Telasi.model.tree.Organization',

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            typeProperty: 'mtype'
        },
        url: '/admin/customstructure'
    },

    lazyFill: false
});

Ext.define('Telasi.view.form.CenterPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'centerpanel',

    items: [{
		xtype: 'tabpanel',
        items:[{
            title: 'Tab 1',
            html: '<h2>Content appropriate for the current navigation.</h2>'
        },{
            title: 'Tab 2',
            html: '<h2>Content appropriate qwent navigation.</h2>'
        }]
    }]
});
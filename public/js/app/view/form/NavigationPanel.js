Ext.define('Telasi.view.form.NavigationPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'navigationpanel',

    width: 160,
    layout: 'vbox',

    defaults: {
                  width: 150,
                  margin: '5 5 5 5'
              },

    items: [{
        xtype: 'button',
        scale: 'medium',
        text: 'ახალი'
    },
    {
        xtype: 'button',
        scale: 'medium',
        text: 'ძებნა'
    }]

});
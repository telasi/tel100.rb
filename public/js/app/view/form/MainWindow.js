Ext.define('Telasi.view.form.MainWindow', {
    extend: 'Ext.container.Container',
    plugins: 'viewport',
    requires: [
        'Telasi.controller.form.MainController',
        'Telasi.view.form.StatusBar',
        'Telasi.view.form.Header',
        'Telasi.view.form.CenterPanel',
        'Telasi.view.form.NavigationPanel'
    ],

    xtype: 'main-window',

    controller: 'main',

    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'headerbar',
            region: 'north',
            collapsible: false,
            resizable: false,
        },
        {
            xtype: 'navigationpanel',
            region: 'west',
            split: true
        },
        {
            xtype: 'centerpanel',
            region: 'center'
        },
        {
            xtype: 'statusbar',
            region: 'south'
        }
    ]
});
Ext.define('Telasi.view.viewports.Login', {
    extend: 'Ext.container.Viewport',
    requires: [
      'Telasi.view.user.Login'
    ],

    layout: 'fit',
    items: [{
        xtype: 'userlogin'
    }]
});

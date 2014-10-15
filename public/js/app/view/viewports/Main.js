Ext.define('Telasi.view.viewports.Main', {
    extend: 'Ext.container.Viewport',

    layout: 'fit',
    items: [{
        xtype: 'panel',
        layout: 'border',
        items: [{
          xtype: 'panel',
          region: 'north',
          split: true,
          items: [{
            xtype: 'label',
            bind: '{currentUser.fullName} '
          }]
        }, {
          xtype: 'panel',
          region: 'center',
          text: 'Center Label'
        }]
    }]
});

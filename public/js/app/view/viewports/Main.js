Ext.define('Telasi.view.viewports.Main', {
    extend: 'Ext.container.Viewport',

    layout: 'fit',
    items: [{
        xtype: 'panel',
        layout: 'border',
        items: [{
          xtype: 'userbox',
          region: 'north'
        }, {
          xtype: 'panel',
          region: 'center',
          text: 'Center Label'
        }]
    }]
});

Ext.define('Telasi.view.viewports.Main', {
    extend: 'Ext.container.Viewport',
    requires: [
      'Telasi.view.common.Header',
      'Telasi.view.common.Center',
    ],

    layout: 'fit',
    items: [{
        xtype: 'panel',
        layout: 'border',
        items: [{
          xtype: 'appheader',
          region: 'north'
        }, {
          xtype: 'appcenter',
          region: 'center',
        }]
    }]
});

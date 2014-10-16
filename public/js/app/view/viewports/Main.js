Ext.define('Telasi.view.viewports.Main', {
    extend: 'Ext.container.Viewport',
    requires: [
      'Telasi.view.common.Header',
      'Telasi.view.common.center.CenterPanel'
    ],

    layout: 'fit',
    items: [{
        xtype: 'panel',
        layout: 'border',
        items: [{
          xtype: 'appheader',
          region: 'north'
        }, {
          xtype: 'centerpanel',
          region: 'center'
        }]
    }]
});

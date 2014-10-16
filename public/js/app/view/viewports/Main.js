Ext.define('Telasi.view.viewports.Main', {
    extend: 'Ext.container.Viewport',
    requires: [
      'Telasi.view.common.Header',
      'Telasi.view.common.center.TabPanel'
    ],

    layout: 'fit',
    items: [{
        xtype: 'panel',
        layout: 'border',
        items: [{
          xtype: 'appheader',
          region: 'north'
        }, {
          xtype: 'documenttab',
          region: 'center'
        }, {
          xtype: 'documentFolders',
          region: 'west'
        }]
    }]
});

Ext.define('Telasi.view.viewports.Main', {
    extend: 'Ext.container.Viewport',
    requires: [
      'Telasi.view.common.Header',
      'Telasi.view.document.Folders',
      'Telasi.view.document.Tab'
    ],

    layout: 'fit',
    items: [{
        xtype: 'panel',
        layout: 'border',
        items: [{
          xtype: 'appheader',
          region: 'north'
        }, {
          xtype: 'documentTab',
          region: 'center'
        }, {
          xtype: 'documentFolders',
          region: 'west'
        }]
    }]
});

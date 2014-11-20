Ext.define('Telasi.view.viewports.Main', {
  extend: 'Ext.container.Viewport',
  requires: [
    'Telasi.view.common.Header',
    'Telasi.view.document.Folders',
    'Telasi.view.document.Tab'
  ],

  layout: 'fit',
  border: false,
  items: [{
    xtype: 'panel',
    layout: 'border',
    border: false,
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

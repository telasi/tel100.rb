Ext.define('Telasi.view.document.motions.Editor', {
  extend: 'Ext.panel.Panel',
  xtype: 'documentMotionsEditor',
  controller: 'motionsEditorController',
  layout: 'fit',
  padding: 0,
  bodyPadding: 0,
  requires: [
    'Telasi.view.document.motions.EditorController',
    'Telasi.view.document.motions.Grid',
  ],
  border: false,
  items: [{
    xtype: 'document-motions-grid',
    store: { fields: ['id', 'name', 'motionText'] },
    border: false,
    margin: 0,
  }],
  dockedItems: [{
    dock: 'top',
    xtype: 'toolbar',
    border: false,
    items: [{
      xtype: 'button',
      html: '<i class="fa fa-pencil"></i> ადრესატების რედაქტირება',
      handler: 'onEditMotions',
    }]
  }]
});

Ext.define('Telasi.view.document.motions.Editor', {
  extend: 'Ext.form.Panel',
  xtype: 'documentMotionsEditor',
  controller: 'motionsEditorController',
  requires: [
    'Telasi.view.document.motions.EditorController'
  ],
  border: false,
  autoScroll: true,
  items: [{
    xtype: 'button',
    text: 'dump'
  }, ],
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

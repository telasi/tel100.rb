Ext.define('Telasi.view.document.Folders', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentFolders',
  html: 'this is west',
  width: 300,
  split: true,
  collapsible: true,
  title: '<i class="fa fa-bars"></i> სტატუსები',
  dockedItems: [{
    dock: 'top',
    xtype: 'toolbar',
    items: [{
      xtype: 'button',
      html: '<i class="fa fa-plus"></i> ახალი დოკუმენტი'
    }]
  }]
});

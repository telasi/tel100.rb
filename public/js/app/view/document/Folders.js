Ext.define('Telasi.view.document.Folders', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentFolders',
  requires: [
    'Telasi.view.document.FoldersController'
  ],
  controller: 'documentfolders',
  width: 200,
  split: true,
  collapsible: true,
  title: '<i class="fa fa-bars"></i> სტატუსები',
  tools: [{
    type: 'plus',
    tooltip: 'ახალი დოკუმენტი',
    callback: function (folders) {
      folders.controller.onNewDocument(folders);
    }
  }],
  html: 'this is west',
});

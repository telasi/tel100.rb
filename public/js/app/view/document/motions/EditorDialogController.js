Ext.define('Telasi.view.document.motions.EditorDialogController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.motionsEditorDialogController',
  control: {
    'document-motions-grid': {
      afterrender: function(grid, opts) {
        var dialog = grid.up('documentEditorDialog');
        grid.setStore( dialog.store );
      },
    },
    'HRtree': {
      itemclick: function(tree, record, item, index, e, eOpts) {
        var grid = tree.up('documentEditorDialog').down('document-motions-grid');
        var store = grid.getStore();
        var data = record.getData();
        if (store.find('receiver_id', data.key) === -1) {
          store.add({
            receiver_id: data.key,
            icon: (data.key.charAt(0) === 'P' ? 'user' : 'bank'),
            name: data.title,
            motion_text: ''
          });
        }
      }
    },
  },
});

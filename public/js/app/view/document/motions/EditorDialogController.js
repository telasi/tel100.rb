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
        var grid = Ext.ComponentQuery.query('document-motions-grid')[0];
        var store = grid.getStore();
        var data = record.getData();
        if (store.find('key', data.key) === -1) {
          store.add({
            id: record.id,
            icon: data.icon,
            key: data.key,
            name: data.title,
            motionText: ''
          });
        }
      }
    },
  },
});

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
      selectionchange: function(tree, selection, opts) {
        var grid = Ext.ComponentQuery.query('document-motions-grid')[0];
        var store = grid.getStore();
        var model = selection[0].getData();
        if (typeof(model.id) === 'string' && model.id.charAt(0) === 'P') {
          if (store.find('id', model.id) === -1) {
            store.add({
              id: model.id,
              name: model.title,
              motionText: ''
            });
          }
        }
      }
    },
  },
});

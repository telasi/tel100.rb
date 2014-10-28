Ext.define('Telasi.view.document.motions.EditorDialogController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.motionsEditorDialogController',
  control: {
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

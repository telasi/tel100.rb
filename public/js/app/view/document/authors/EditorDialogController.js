Ext.define('Telasi.view.document.authors.EditorDialogController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.authorsEditorDialogController',
  control: {
    'document-authors-grid': {
      afterrender: function(grid, opts) {
        var dialog = grid.up('authorsEditorDialog');
        grid.setStore( dialog.store );
      },
    },
    'HRtree': {
      itemclick: function(tree, record, item, index, e, eOpts) {
        var grid = tree.up('authorsEditorDialog').down('document-authors-grid');
        var store = grid.getStore();
        var data = record.getData();
        if (store.find('author_id', data.key) === -1) {
          store.add({
            author_id: data.key,
            icon: (data.key.charAt(0) === 'P' ? 'user' : 'bank'),
            name: data.title,
            note: ''
          });
        }
      }
    },
  },
});

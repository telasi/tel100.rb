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

        var existingIdx = store.findBy(function( record, id ) {
          return data.id === record.get('author_id')
              && data.type === record.get('author_type');
        });

        if (existingIdx === -1) {
          store.add({
            author_id: data.id,
            author_type: data.type,
            organization: data.organization,
            is_manager: data.is_manager,
            image: data.image,
            name: data.name,
            note: ''
          });
        }
      }
    },
  },
});

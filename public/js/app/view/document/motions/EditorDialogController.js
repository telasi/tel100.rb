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

        var existingIdx = store.findBy(function( record, id ) {
          return data.id === record.get('receiver_id')
              && data.type === record.get('receiver_type');
        });

        if (existingIdx === -1) {
          store.add({
            receiver_id: data.id,
            receiver_type: data.type,
            organization: data.organization,
            image: data.image,
            name: data.name,
            is_manager: data.is_manager,
            motion_text: ''
          });
        }
      }
    },
  },
});

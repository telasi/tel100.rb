Ext.define('Telasi.view.document.signature.EditorDialogController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.signaturesEditorDialogController',
  control: {
    'document-signatures-grid': {
      afterrender: function(grid, opts) {
        var dialog = grid.up('doc-signature-editor-dialog');
        grid.setStore( dialog.store );
      },
    },
    'HRtree': {
      itemclick: function(tree, record, item, index, e, eOpts) {
        var grid = tree.up('doc-signature-editor-dialog').down('document-signatures-grid');
        var store = grid.getStore();
        var data = record.getData();

        if (data.type === 'HR::Employee') {
          var existingIdx = store.findBy(function( record, id ) {
            return data.id === record.get('signature_id')
                && data.type === record.get('signature_type');
          });

          if (existingIdx === -1) {
            var lastIndex = 0;
            if (store.data.length > 0) {
              lastIndex = store.getAt(store.data.length - 1).get('sign_group');
            }
            store.add({
              signature_id: data.id,
              signature_type: data.type,
              organization: data.organization,
              image: data.image,
              name: data.name,
              is_manager: data.is_manager,
              sign_group: lastIndex + 1
            });
          }
        }
      }
    },
  },
});

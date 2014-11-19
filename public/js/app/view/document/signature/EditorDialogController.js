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
          if (data.has_user === false)  {
            Ext.MessageBox.show({
              title: 'ინფორმაცია',
              msg: 'თანამშრომელს არ აქვს მომხმარებელი: ის ვერ მიიღებს ამ დოკუმენტს.',
              buttons: Ext.MessageBox.OK,
              icon: Ext.window.MessageBox.INFO
            });
          }

          var existingIdx = store.findBy(function( record, id ) {
            return data.id === record.get('receiver_id')
                && data.type === record.get('receiver_type');
          });

          if (existingIdx === -1) {
            var lastIndex = 0;
            if (store.data.length > 0) {
              lastIndex = store.getAt(store.data.length - 1).get('ordering');
            }
            store.add({
              receiver_id: data.id,
              receiver_type: data.type,
              receiver_role: 'signee',
              ordering: lastIndex + 1,
              organization: data.organization,
              image: data.image,
              name: data.name,
              is_manager: data.is_manager
            });
          }
        }
      }
    },
  },
});

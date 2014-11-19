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
          store.add({
            receiver_id: data.id,
            receiver_type: data.type,
            receiver_role: 'assignee',
            ordering: 999,
            name: data.name,
            organization: data.organization,
            image: data.image,
            is_manager: data.is_manager,
            motion_text: ''
          });
        }
      }
    },
  },
});

Ext.define('Tel100.view.document.folder.ConfigViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentfolderconfig',

  onPlusButtonClick: function(button, e, eOpts) {
    //Ext.MessageBox.prompt(i18n.ui.folder,i18n.ui.enter_name, function(btn, text){
    Ext.MessageBox.prompt('Folder','Enter name', function(btn, text){
      if(btn == 'ok'){
        Ext.Ajax.request({
          url: '/api/folder',
          method: 'POST',
          params: { name: text, folder_type: 0 },
          success: function(response){
            var folderstore = Ext.getStore('CustomFolders');
            folderstore.reload();
          },
          failure: function(response){
            Ext.MessageBox.alert('error');
          }
        });
        close();
      }
    });
  },

  onMinusButtonClick: function(button, e, eOpts) {
    var grid = button.up('window').down('grid');
    var store = grid.store;
    var selection = grid.selection;
    if (selection){
      Ext.Msg.show({
        title: i18n.ui.destroy,
        message: i18n.ui.destroyConfirm,
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.QUESTION,
        fn: function(btn) {
          if (btn === 'yes') {
            store.remove(selection);
            store.sync();
            store.reload();
          }
        }
      });
    }

  }
});

/*
 * File: app/view/document/folder/ConfigViewController.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Tel100.view.document.folder.ConfigViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentfolderconfig',

  onPlusButtonClick: function(button, e, eOpts) {
    Ext.MessageBox.prompt('საქაღალდე','შეიყვანეთ სახელი', function(btn, text){
      if(btn == 'ok'){
        Ext.Ajax.request({
          url: '/api/folder',
          method: 'POST',
          params: { name: text},
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
        title: '{i18n.ui.destroy}',
        message: '{i18n.ui.destroyConfirm}',
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.QUESTION,
        fn: function(btn) {
          if (btn === 'yes') {
            store.remove(selection);
            store.sync();
          }
        }
      });
    }

  }

});

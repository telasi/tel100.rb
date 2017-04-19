Ext.define('Tel100.view.document.folder.SearchViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentfoldersearch',

  search: function() {
    var view = this.getView();
    var params = view.getForm().getValues();
    var url = '/api/documents/base/search';
    view.fireEvent('searchstart', url, params);
    view.up().fireEvent('folderChosen');
  },

  onShowAllClick: function(checkbox, newValue, oldValue, eOpts){
    checkbox.up().getViewModel().set('showall', newValue);
  },

  onChoseCustomerButtonClick: function(button, e, eOpts) {
    var receiverDialog = Ext.create('Tel100.view.party.Selector', {
      title: i18n.document.search.choseCustomer,
      viewModel:{
        data: {
          hideHR: true,
          hideParty: true,
          hideCustomers: false
        }
      }
    });
    receiverDialog.show();
    receiverDialog.on('selectioncomplete', function(receivers) {
      if (receivers.length > 0) {
        var customer = receivers[0];
        this.getView().getForm().setValues({customer: customer.get('custkey')});
      }
    }.bind(this));
  },

  onSearchButtonClick: function(button, e, eOpts) {
    this.search();
  },

  onResetButtonClick: function(button, e, eOpts) {
    button.up('form').reset();
  },

  onSaveFilterButtonClick: function(button, e, eOpts) {
    var values = Ext.encode(button.up('form').getForm().getValues());
    Ext.MessageBox.prompt('Folder','Enter name', function(btn, text){
      if(btn == 'ok'){
        Ext.Ajax.request({
          url: '/api/folder',
          method: 'POST',
          params: { name: text, folder_type: 1, form: values },
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
  }
});

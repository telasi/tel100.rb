/*
 * File: app/view/document/folder/SearchViewController.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
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

Ext.define('Tel100.view.document.folder.SearchViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentfoldersearch',

  onChoseCustomerButtonClick: function(button, e, eOpts) {
    var receiverDialog = Ext.create('Tel100.view.party.Selector', {
      title: i18n.document.search.choseCustomer
    });
    var vm = receiverDialog.getViewModel();
    vm.set('hideHR', true);
    vm.set('hideParty', true);
    receiverDialog.down('tabpanel').setActiveTab(2);
    receiverDialog.show();
    receiverDialog.on('selectioncomplete', function(receivers) {
      if (receivers.length > 0) {
        var customer = receivers[0];
        this.getView().getForm().setValues({customer: customer.get('custkey')});
      }
    }.bind(this));
  },

  onSearchButtonClick: function(button, e, eOpts) {
    var view = this.getView();
    var params = view.getForm().getValues();
    var url = '/api/documents/base/search';
    view.fireEvent('searchstart', url, params);
    view.up().fireEvent('folderChosen');
  },

  onResetButtonClick: function(button, e, eOpts) {
    button.up('form').reset();
  }

});

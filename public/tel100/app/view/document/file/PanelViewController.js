/*
 * File: app/view/document/file/PanelViewController.js
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

Ext.define('Tel100.view.document.file.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentfilepanel',

  onFilefieldChange: function(filefield, value, eOpts) {
    if (value) {
      var form = filefield.up('form').getForm();
      var vm = this.getViewModel();
      var view = this.getView();
      var doc = vm.get('document');
      form.submit({
        url: '/api/documents/files/upload?document_id=' + doc.id,
        success: function() {
          view.refresh();
        }
      });
    }
  },

  onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    var url = '/api/documents/files/download?id=' + record.id;
    var tab = window.open(url, 'tel100');
    tab.focus();
  }

});

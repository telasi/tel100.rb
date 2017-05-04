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

Ext.define('Tel100.view.document.gnerc.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentgnercpanel',

  onBeforeRender: function(component, eOpts) {
    // var view = this.getView();
    // var vm = this.getViewModel();

    // var onChange = function() {
    //   var gnerc = vm.get('gnerc.first');
    //   var combobox = this.getView().down('combobox');

    //   var params = { type_id: combobox.getValue() };
    //   var doc = vm.get('document');
    //   helpers.api.document.gnerc.update(doc.id, {
    //       params: params,
    //       success: function() {
    //         gnerc.commit(true);
    //       }.bind(this),
    //       failure: function() {
    //         console.log('failed to save gnerc');
    //       }
    //  });
    // };
    // var options = { deep: true };
    // vm.bind('{gnerc.first}', onChange, this, options);
  },

  onGnercTypeChange: function(combo , records , eOpts){
    this.updateGnerc({ type_id: records.getData().id });
  },

  onGnercStatusChange: function(status){
    this.updateGnerc({ status: status });
  },

  onMediateClick: function(view, newValue , oldValue , eOpts){
    var value = newValue == false ? 0 : 1;
    this.updateGnerc({ mediate: value });
  },

  updateGnerc: function(args){
    var vm = this.getViewModel();
    var editable = vm.get('editable');

    if (editable){
      var doc = vm.get('document');
      var params = args;
      helpers.api.document.gnerc.update(doc.id, {
            params: params,
            success: function() {
              // gnerc.commit(true);
            }.bind(this),
            failure: function() {
              console.log('failed to save gnerc');
            }
       });  
    }
  },

  onFilefieldChange: function(filefield, value, eOpts) {
    if (value) {
      var form = filefield.up('form').getForm();
      var vm = this.getViewModel();
      var view = this.getView();
      var doc = vm.get('document');
      form.submit({
        url: '/api/documents/gnerc/upload?document_id=' + doc.id,
        success: function() {
          view.refresh();
          view.up().down('documentfilepanel').refresh();        
        }
      });
    }
  },

  onFileRemoveClick: function(){
    var doc = this.getViewModel().get('document');
    var view = this.getView();
    helpers.api.document.gnerc.fileDelete(doc.id, {
      success: function() {
        view.refresh();
        view.up().down('documentfilepanel').refresh();
      }
    });
  },

  onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    var url = '/api/documents/files/download?id=' + record.id;
    var tab = window.open(url, 'tel100');
    tab.focus();
  },

  resetSms: function(){
    var doc = this.getViewModel().get('document');
    var view = this.getView();
    helpers.api.document.gnerc.resetSms(doc.id, {
      success: function() {
        view.refresh();
        view.up().down('documentfilepanel').refresh();
      }
    });
  }

});

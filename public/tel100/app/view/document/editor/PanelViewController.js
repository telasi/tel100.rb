/*
 * File: app/view/document/editor/PanelViewController.js
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

Ext.define('Tel100.view.document.editor.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditorpanel',

  onAddReceiver: function() {
    console.log('adding receiver....');
  },

  onBeforeRender: function(component, eOpts) {
    // fire documentchange
    var vm = this.getViewModel();
    var onChange = function() {
      var doc = vm.get('document');
      if (doc.dirty) { vm.set('isSaved', false); }
      this.getView().fireEvent('documentchange', doc);
    };
    var options = { deep: true };
    vm.bind('{document}', onChange, this, options);
  },

  onDocumentChange: function(document) {
    if (document.dirty) {
      var vm = this.getViewModel();
      vm.set('isSaving', true);
      var changes = document.getChanges();
      helpers.api.document.updateDraft(document.id, {
        params: changes,
        success: function() {
          document.commit(true);
          vm.set('isSaved', true);
          vm.set('isSaving', false);
        }.bind(this),
        failure: function() {
          console.log('failed to save document');
          vm.set('isSaving', false);
        }
      });
    }
  },

  onSaveClick: function(button, e, eOpts) {
    var doc = this.getViewModel().get('document');
    this.onDocumentChange(doc);
  }

});

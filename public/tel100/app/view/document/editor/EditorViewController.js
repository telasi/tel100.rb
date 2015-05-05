/*
 * File: app/view/document/editor/EditorViewController.js
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

Ext.define('Tel100.view.document.editor.EditorViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditoreditor',

  onReplyClick: function(button, e, eOpts) {
    var vm = this.getViewModel();
    var document = vm.get('document');

    helpers.api.document.base.reply(document.id, {
      success: function(data) {
        var doc = Ext.create('Tel100.model.document.Base', data);
        var dm = this.getView().up('documentmain');
        dm.getViewModel().set('selection', doc);
        dm.getController().openDocument(doc);
      }.bind(this)
    });
  },

  onCardPrintClick: function(button, e, eOpts) {
    var vm = this.getViewModel();
    var document = vm.get('document');
    var url = '/api/documents/print/card/' + document.id + '?lang=' + helpers.i18n.getCurrentLocale(); 
    helpers.api.document.print.showPDFwindow(url);
  },

  onDocumentPrintClick: function(button, e, eOpts) {
    var vm = this.getViewModel();
    var document = vm.get('document');
    var printParams = vm.get('printParams');
    var url = '/api/documents/print/document/' + 
              document.id + 
              '?lang=' + helpers.i18n.getCurrentLocale();
    for(var key in printParams){
      if(printParams[key]){
        url += '&'+ key + '=true';
      }
    }
    helpers.api.document.print.showPDFwindow(url);
  },

  onInMotionChanged: function(motion) {
    var view = this.getView();
    var outPanel = view.down('documentmotionsoutpanel');
    if (!motion || motion.get('type') === 'document') {
      outPanel.setParentId(null);
    } else {
      outPanel.setParentId(motion.id);
    }
    outPanel.refresh();
  },

  onDestroy: function(component, eOpts) {
    if (component.commentsDialog) {
      component.commentsDialog.destroy();
    }
  },

  onContainerAfterRender: function(component, eOpts) {
    helpers.party.employeeTips(component);
  },

  onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts){
    var vm = this.getViewModel();
    var field = 'printParams.' + menucheckitem.itemId;
    vm.set(field, checked);
  }

});

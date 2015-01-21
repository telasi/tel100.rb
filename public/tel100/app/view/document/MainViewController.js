/*
 * File: app/view/document/MainViewController.js
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

Ext.define('Tel100.view.document.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmain',

  onRefresh: function(opts) {
    if (opts.$className) { opts = null; }
    var grid = this.getView().down('documentgridpanel');
    grid.refresh(opts);
  },

  onDeleteDraft: function() {
    var viewModel = this.getViewModel();
    var selection = viewModel.get('selection');
    if (selection) {
      var status = selection.get('status');
      if (status === helpers.document.status.DRAFT) {
        helpers.api.document.deleteDraft(selection.id, {
          success: this.onRefresh.bind(this)
        });
      }
    }
  },

  onNewDocument: function() {
    var grid = this.getView().down('documentgridpanel');
    var id;

    var refreshCallback = function(records, operation, success) {
      if (success) {
        var filteredRecords = records.filter(function(x){ return x.id === id; });
        if (filteredRecords.length > 0) {
          var doc = filteredRecords[0];
          this.getViewModel().set('selection', doc);
          this.openDocument(doc);
        }
      }
    };

    helpers.api.document.createDraft({
      success: function(data) {
        id = data.id;
        this.onRefresh({
          callback: refreshCallback.bind(this)
        });
      }.bind(this)
    });
  },

  openDocument: function(doc) {
    var tabs = this.getView().down('#documentTabs');
    var editor;
    if (doc.get('status') === helpers.document.status.DRAFT) {
      var title = i18n.document.base.ui.editDraftTitle;
      var editor = Tel100.view.document.editor.Panel.create({ title: title, closable: true });
      editor.getViewModel().set('document', doc);
    } else {
      // TODO: open non-draft document
    }
    if (editor) {
      tabs.add(editor);
      tabs.setActiveTab(editor);
    }
  },

  onGridDoubleClick: function(dataview, record, item, index, e, eOpts) {
    this.openDocument(record);
  }

});

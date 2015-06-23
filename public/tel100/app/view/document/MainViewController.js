Ext.define('Tel100.view.document.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmain',

  onRefresh: function(opts) {
    if (opts && opts.$className) { opts = null; }
    var grid = this.getView().down('documentgridpanel');
    grid.refresh(opts);
  },

  onDeleteDraft: function() {
    var viewModel = this.getViewModel();
    var customfolderselection = viewModel.get('customfolderselection');
    var selection = viewModel.get('selection');
    if (customfolderselection){
      this.deleteFromCustom(customfolderselection[0].id, selection.id);
      this.refreshFoldersAndDocuments();
    } else {
      if (selection) {
        var status = selection.get('status');
        if (status === helpers.document.status.DRAFT) {
          var msg = i18n.document.base.ui.confirmDeleteDraft;
          var title = i18n.ui.confirmTitle;
          Ext.Msg.confirm(title, msg, function(resp) {
            if (resp === 'yes') {
              helpers.api.document.base.deleteDraft(selection.id, {
                success: this.refreshFoldersAndDocuments.bind(this)
              });
            }
          }.bind(this));
        }
      }
    }
  },

  onNewDocument: function() {
    // var grid = this.getView().down('documentgridpanel');
    helpers.api.document.base.createDraft({
      success: function(data) {
        this.refreshFoldersAndDocuments();
        var doc = Ext.create('Tel100.model.document.Base', data);
        this.getViewModel().set('selection', doc);
        this.openDocument(doc);
      }.bind(this)
    });
  },

  openDocument: function(doc) {
    // checking if the document is already open
    var tabs = this.getView().down('#documentTabs');
    var items = tabs.items;
    for (var i = 0; i < items.length; i++) {
      var item = items.getAt(i);
      var vm = item.getViewModel();
      var tabDoc = vm && vm.get('document');
      if (tabDoc && tabDoc.id === doc.id) {
        item.refresh();
        tabs.setActiveTab(item);
        return;
      }
    }

    // loading document for edit
    var doc2 = Ext.create('Tel100.model.document.Base', {id: doc.id});
    doc2.load({
      success: function(document) {
        var isDraft = document.get('status') === helpers.document.status.DRAFT;
        if (isDraft) {
          this.openDraftDocument(tabs, document);
        } else {
          this.openCurrentDocument(tabs, document);
        }
      }.bind(this)
    });
  },

  openDraftDocument: function(tabs, document) {
    var title = i18n.document.base.ui.editDraftTitle;
    var editor = Tel100.view.document.editor.Creator.create({ title: title, closable: true });
    editor.setDocument(document);
    editor.on('documentsent', function(document) {
      tabs.remove(editor);
      this.refreshFoldersAndDocuments();
    }.bind(this));
    tabs.add(editor);
    tabs.setActiveTab(editor);
  },

  openCurrentDocument: function(tabs, document) {
    var title = document.get('docnumber');
    var editor = Tel100.view.document.editor.Editor.create({ title: title, closable: true });
    editor.getViewModel().set('document', document);
    editor.on('documentchanged', function(document) {
      this.refreshFoldersAndDocuments();
    }.bind(this));
    tabs.add(editor);
    tabs.setActiveTab(editor);
  },

  deleteFromCustom: function(folder_id, doc_id) {
            var opts = {};
            opts.method = 'DELETE';
            opts.url = '/api/folder/document';
            opts.params = { folder_id: folder_id, doc_id: doc_id };
            Ext.Ajax.request(opts);
  },

  onTabpanelFolderChosen: function(tabpanel) {
    this.getView().getComponent('documentTabs').setActiveTab(0);
  },

  onFoldersRefresh: function(tabpanel) {
    this.onRefresh();
  },

  refreshFoldersAndDocuments: function() {
    var folders = this.getView().up('main').down('documentfoldertab');
    folders.refresh();
    this.onRefresh();
  }
});

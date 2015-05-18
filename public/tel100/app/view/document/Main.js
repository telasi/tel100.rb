Ext.define('Tel100.view.document.Main', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmain',

  controller: 'documentmain',
  viewModel: {
    type: 'documentmain'
  },
  layout: 'border',
  defaultListenerScope: true,

  items: [{
    xtype: 'documentfoldertab',
    width: 250,
    collapsible: true,
    region: 'west',
    split: true,
    listeners: {
      folderChosen: {
        fn: 'onTabpanelFolderChosen',
        scope: 'controller'
      },
      foldersrefresh: {
        fn: 'onFoldersRefresh',
        scope: 'controller'
      }
    }
  }, {
    xtype: 'tabpanel',
    region: 'center',
    border: false,
    itemId: 'documentTabs',
    activeTab: 0,
    items: [{
      xtype: 'panel',
      dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
          handler: 'onRefresh',
          bind: {
            text: '{i18n.document.base.ui.refresh}'
          }
        }, {
          handler: 'onNewDocument',
          cls: 'success-button',
          bind: {
            text: '{i18n.document.base.ui.newDocument}'
          }
        }, '->', {
          handler: 'onDeleteDraft',
          cls: 'danger-button',
          bind: {
            text: '{i18n.document.base.ui.deleteDraft}',
            disabled: '{deleteDraftButtonDisabled}'
          }
        }]
      }],
      border: false,
      layout: 'fit',
      bind: {
        title: '{i18n.document.base.ui.documents}'
      },
      items: [{
        xtype: 'documentgridpanel',
        bind: {
          selection: '{selection}'
        },
        listeners: {
          documentopen: 'onGridpanelDocumentopen',
          documentsign: 'onGridpanelDocumentsign',
          documentauthor: 'onGridpanelDocumentauthor'
        }
      }]
    }]
  }],

  listeners: {
    beforerender: 'onPanelBeforeRender'
  },

  onGridpanelDocumentopen: function(doc) {
    this.getController().openDocument(doc);
  },

  onGridpanelDocumentsign: function(doc) {
    var view = this;
    var dialog = Ext.create('Tel100.view.document.comment.Sign', { modal: true });
    dialog.getViewModel().set('document', doc);
    dialog.on('signed', function() {
      view.onRefresh();
    });
    dialog.show();
  },

  onGridpanelDocumentauthor: function(doc) {
    var view = this;
    var dialog = Ext.create('Tel100.view.document.comment.Author', { modal: true });
    dialog.getViewModel().set('document', doc);
    dialog.on('authored', function() {
      view.onRefresh();
    });
    dialog.show();
  },

  onPanelBeforeRender: function(component, eOpts) {
    var view = this;
    var search = this.down('documentfoldersearch');
    search.on('searchstart', function(url, params) {
      view.down('documentgridpanel').getController().setStoreConfig({url: url, extraParams: params });
      view.down('documentgridpanel').refresh();
    });
  },

  onNewDocument: function() {
    this.getController().onNewDocument();
  },

  onRefresh: function() {
    this.getController().onRefresh();
    this.down('documentfoldertab').fireEvent('documentgridrefresh');
  },

  onDeleteDraft: function() {
    this.getController().onDeleteDraft();
  }
});

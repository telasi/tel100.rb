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
        }, {
          handler: 'onForward',
          cls: 'success-button',
          bind: {
            text: '{i18n.document.base.ui.forward}',
            disabled: '{forwardButtonDisabled}'
          }
        }, {
          handler: 'onResult',
          cls: 'success-button',
          bind: {
            text: '{i18n.document.base.ui.result}',
            disabled: '{resultButtonDisabled}'
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
          documentauthor: 'onGridpanelDocumentauthor',
          selectionchange: 'onGridPanelSelectionChange'
        }
      }]
    }]
  }],

  listeners: {
    beforerender: 'onPanelBeforeRender'
  },

  onGridPanelSelectionChange: function(model, selected){
    var vm = this.getViewModel();
    var disableForwardButton = false;
    var disableResultButton = false;
    var role = null;

    disableForwardButton = disableResultButton = selected.length == 0;

    for(i=0; i<selected.length;i++){
      var select = selected[i];

      // if(select.get('status') === helpers.document.status.DRAFT || 
      //    select.get('status') === helpers.document.status.COMPLETED || 
      //    select.get('status') === helpers.document.status.CANCELED){
      //   disableForwardButton = true;
      //   disableResultButton = true;
      //   break;
      // };

      if(select.get('incoming').length != 1){
        disableResultButton = true;
        break;
      };

      // get role and check if all selected has same role
      if (role === null){
        role = this.getRole(select);
        if(role === null) {
          disableResultButton = true;          
        }
      } else {
        var temprole = this.getRole(select);
        if(temprole != role){
          disableResultButton = true;
          break;  
        }
      }
    };

    vm.set('disableResultButton', disableResultButton);
    vm.set('disableForwardButton', disableForwardButton);    
  },

  getRole: function(record){
    if(record.get('as_assignee') === 1){
      return 'assignee';
    } else if (record.get('as_signee') === 1 ) { 
      return 'signee';
    } else if (record.get('as_owner') === 1 && record.get('as_sender') === 1) { 
      return 'author';
    };
    return null;
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

    // listen to proxy changes
    var mainView = view.up('main');
    mainView.on('proxychanged', function() {
      var doctabs = view.down('#documentTabs');
      var tabs = doctabs.items;
      for (var i = 1; i < tabs.length; i++) {
        var tab = tabs.getAt(i);
        doctabs.remove(tab);
      }
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
  },

  onResult: function() {
    var grid = this.down('documentgridpanel');
    var selection = grid.getSelection();

    var dialog = Ext.create('Tel100.view.document.comment.Result',{
      viewModel: {
        data: {
          selectedDocuments : selection
        }
      }
    });
    dialog.on('close', function(document) {
      this.onRefresh();
    }.bind(this));
    dialog.show();
  },

  onForward: function() {
    var view = this;
    var grid = view.down('documentgridpanel');
    var selection = grid.getSelection();

    // var dialog = Ext.create('Tel100.view.document.motions.Forward');
    // dialog.show();

    var dialog = helpers.party.getPartyDialog(function(assignees) {
      view.getController().forwardDocuments(selection, assignees);
    });
    dialog.show();
  }
});

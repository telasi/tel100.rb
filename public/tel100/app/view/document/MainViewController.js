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
    this.refreshFoldersAndDocuments();
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
  },

  addReceiverToDocument: function(document_id, parent_id, receiver, motion_values, callback) {
    var extType = receiver.get('ext_type');

    helpers.api.document.motion.createDraft({
      params: {
        document_id: document_id,
        parent_id: parent_id,
        receiver_id: receiver.id,
        receiver_type: extType,
        receiver_role: 'assignee',
        send_type_id: motion_values["send_type_id"],
        motion_text: motion_values["motion_text"],
        due_date: motion_values["due_date"]
      },
      success: function(motionData) {
        var motion = Ext.create('Tel100.model.document.Motion', motionData);
        if (callback) {
          callback(null, motion);
        }
      }.bind(this),
      failure: function(error) {
        Ext.Msg.alert('error', 'error');
      }.bind(this)
    });
  },

  sendDraftMotions: function(document_id, callback){
      helpers.api.document.motion.sendDraft(document_id, {
        success: function(data) {
          if (callback) {
            callback();
          }
        }.bind(this),
        failure: function(data){
          Ext.Msg.alert('error', 'error');
        }.bind(this)
      });
  },

  forwardDocuments: function(selection, receivers, motion_values) {
    var cntrl = this;

    if (selection && receivers) {
      for (var i = 0; i < selection.length; i++){
        var tasks = [];

        var document_id = selection[i].get('id');
        var incoming = selection[i].get('incoming');
        if (incoming){
          var role = incoming[0].role;
          if(role === helpers.document.role.SENDER){
            parent_id = null;  
          } else {
            parent_id = incoming[0].id;
          }
        };

        for (var k = 0; k < receivers.length; k++) {
          var t = (function(document_id, parent_id, motion_values, receiver) {
            return function(callback) {
              cntrl.addReceiverToDocument(document_id, parent_id, receiver, motion_values, callback);
            };
          })(document_id, parent_id, motion_values, receivers[k]);

          tasks.push(t);
        }

        var t = (function(document_id) {
            return function(callback) {
              cntrl.sendDraftMotions(document_id, callback);
            };
        })(document_id);

        tasks.push(t);
        async.series(tasks);
      }
    };
  },
});

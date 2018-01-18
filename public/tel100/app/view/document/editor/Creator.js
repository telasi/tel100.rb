Ext.define('Tel100.view.document.editor.Creator', {
  extend: 'Ext.container.Container',
  alias: 'widget.documenteditorcreator',

  controller: 'documenteditorcreator',
  viewModel: {
    type: 'documenteditorcreator'
  },

  border: false,
  layout: 'border',
  defaultListenerScope: true,

  listeners: {
    beforerender: {
      fn: 'onBeforeRender',
      scope: 'controller'
    },
    documentchange: {
      fn: 'onDocumentChange',
      buffer: 500,
      scope: 'controller'
    }
  },

  items: [{
    xtype: 'tabpanel',
    region: 'center',
    activeTab: 0,
    deferredRender: false,
    tabPosition: 'bottom',
    items: [{
      xtype: 'panel',
      border: false,
      layout: 'border',
      bodyBorder: false,
      bind: {
        title: '{i18n.document.base.ui.newDocumentTab}'
      },

      dockedItems: [{
        xtype: 'toolbar',
        region: 'north',
        dock: 'top',
        border: false,
        items: [{
          xtype: 'button',
          bind: {
            disabled: '{sendButtonDisabled}',
            text: '{i18n.document.base.ui.send}'
          },
          listeners: {
            click: {
              fn: 'onSendClick',
              scope: 'controller'
            }
          }
        }, {
          xtype: 'button',
          bind: {
            disabled: '{saveButtonDisabled}',
            text: '{saveButtonText}'
          },
          listeners: {
            click: {
              fn: 'onSaveClick',
              scope: 'controller'
            }
          }
        }, {
        xtype: 'documenteditorprintbutton',
          listeners: {
            'print': {
              fn: 'onDocumentPrintClick',
              scope: 'controller'
            }
          }
        }, {
          xtype: 'tbfill'
        }]
      }],

      items: [{
        xtype: 'container',
        flex: 1,
        region: 'center',
        baseCls: 'white-panel',
        border: false,
        padding: 5,
        layout: {
          type: 'vbox',
          align: 'stretch'
        },

        items: [{
          xtype: 'textfield',
          submitEmptyText: false,
          labelAlign: 'top',
          emptyText: 'enter document\'s subject',
          bind: {
            fieldLabel: '{i18n.document.base.subject}',
            value: '{document.subject}'
          }
        }, {
          // xtype: 'htmleditor',
          xtype: 'tinymce_textarea',
          noWysiwyg: false,
          tinyMCEConfig: helpers.tinymce.getConfig(),
          style: { border: '0' },
          flex: 1,
          itemId: 'documentBody',
          labelAlign: 'top',
          bind: {
            fieldLabel: '{i18n.document.base.body}'
          },
          listeners: {
            change: 'onHtmleditorChange'
          }
        }]
      }, {
        xtype: 'container',
        region: 'east',
        split: true,
        border: false,
        width: 400,
        layout: {
          type: 'accordion',
          hideCollapseTool: true
        },
        items: [{
          xtype: 'documenteditorgeneral',
          bind: {
            title: '{i18n.document.base.ui.generalTabTitle}'
          }
        },{
          xtype: 'documentgnercpanel',
          itemId: 'gnerc',
          bind: {
            hidden: '{!isGnerc}'
          }
        }, {
          xtype: 'documentrelationpanel',
          itemId: 'relations'
        }, {
          xtype: 'documentmotionssigneepanel',
          listeners: {
            datachanged: 'onSigneesChanged'
          }
        }, {
          xtype: 'documentmotionsassigneepanel',
          listeners: {
            datachanged: 'onAssigneeChange'
          }
        }, {
          xtype: 'documentmotionsauthorpanel',
          listeners: {
            datachanged: 'onAuthorsChanged'
          }
        }, {
          xtype: 'documentfilepanel',
          itemId: 'files'
        }]
      }]
    }, {
      xtype: 'panel',
      border: false,
      layout: 'fit',
      bodyBorder: false,
      bind: {
        title: '{i18n.document.base.ui.motionsTabTitle}'
      },

      items: [{
        xtype: 'documentmotionsoutpanel',
        border: false,
        bodyBorder: false,
        listeners: {
          draftmotionchanged: 'onDraftmotionChanged',
          datachanged: 'onReceiversChanged'
        }
      }]
    }]
  }],

  onHtmleditorChange: function(field, newValue, oldValue, eOpts) {
    var view = field.up('documenteditorcreator');
    var vm = view.getViewModel();
    var document = vm.get('document');
    document.set('body', newValue);
  },

  onSigneesChanged: function(panel, operation, item) {
    this.down('documentmotionsoutpanel').refresh();
  },

  onAssigneeChange: function(panel, operation, item) {
    this.down('documentmotionsoutpanel').refresh();
  },

  onAuthorsChanged: function(panel, operation, item) {
    this.down('documentmotionsoutpanel').refresh();
  },

  onDraftmotionChanged: function(hasDraftMotion) {
    var vm = this.getViewModel();
    vm.set('hasDraftMotion', hasDraftMotion);
  },

  onReceiversChanged: function(panel, operation, item) {
    var signeesPanel = this.down('documentmotionssigneepanel');
    var assigneesPanel = this.down('documentmotionsassigneepanel');
    var authorPanel = this.down('documentmotionsauthorpanel');
    signeesPanel.refresh();
    assigneesPanel.refresh();
    authorPanel.refresh();
  },

  setDocument: function(doc) {
    var bodyText = this.down('#documentBody');
    var vm = this.getViewModel();
    vm.set('document', doc);
    bodyText.setValue(doc.get('body'));
  }
});

// -- CreatorViewController

Ext.define('Tel100.view.document.editor.CreatorViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditorcreator',

  onBeforeRender: function(component, eOpts) {
    var view = this.getView();
    var vm = this.getViewModel();

    // fire documentchange
    var onChange = function() {
      var doc = vm.get('document');
      if (doc.dirty) { vm.set('isSaved', false); }
      view.fireEvent('documentchange', doc);
    };
    var options = { deep: true };
    vm.bind('{document}', onChange, this, options);

    // var motionsPanel = view.down('documentmotionsoutpanel');
    // motionsPanel.getViewModel().bind('{hasDraftMotion}', function() {
    //   console.log('HERE!');
    // }, this);

    // setting files as editable
    var filesPanel = view.down('#files');
    filesPanel.setEditable(true);

    // setting gnerc as editable
    var gnercPanel = view.down('#gnerc');
    gnercPanel.setEditable(true);

    // setting relations as editable
    var relationPanel = view.down('#relations');
    relationPanel.setEditable(true);
  },

  onDocumentChange: function(document) {
    var vm = this.getViewModel();

    // update subject/body properties
    if (document) {
      vm.set('hasSubject', document.get('subject'));
      vm.set('hasBody', document.get('body'));
    }

    helpers.document.type.setDocumentDefaults(document);

    // save changes
    if (document.dirty) {
      vm.set('isSaving', true);
      var changes = document.getChanges();
      helpers.api.document.base.updateDraft(document.id, {
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

  onSendClick: function(button, e, eOpts) {
    var vm = this.getViewModel();
    var isSending = vm.get('isSending');
    if (!isSending) {
      var view = this.getView();
      var document = vm.get('document');
      var subject = document.get('subject');
      var body = document.get('body');
      if (!subject) {
        Ext.Msg.alert(i18n.errors.title, i18n.document.base.errors.empty_subject);
        return;
      }
      vm.set('isSending', true);
      helpers.api.document.base.sendDraft(document.id, {
        success: function() {
          view.fireEvent('documentsent', document);
        }.bind(this),
        failure: function(msg, object) {
          vm.set('isSending', false);
          if(object){
            if(object.error_code == 1){
              this.askForAuthor(msg, object.party_id);
            }
          } else {
            Ext.Msg.alert(i18n.errors.title, msg);
          }
        }.bind(this)
      });
    }
  },

  askForAuthor: function(msg, id){
    var view = this;

    Ext.Msg.prompt({
                title : 'Error',
                msg : msg,
                width : 300,
                buttons : Ext.Msg.OK,
                fn: function(buttonValue, inputText, showConfig){
                      dialog = Ext.create('Tel100.view.hr.party.Edit', {
                        title: 'Edit',
                        viewModel: { data: { id: id} }
                      });

                      dialog.show();
                }
            });

  },

  onSaveClick: function(button, e, eOpts) {
    var doc = this.getViewModel().get('document');
    this.onDocumentChange(doc);
  },

  onDocumentPrintClick: function(printParameters, e, eOpts) {
    var vm = this.getViewModel();
    var view = this.getView();
    var document = vm.get('document');
    var url = '/api/documents/print/document/' + document.id + '?lang=' + helpers.i18n.getCurrentLocale();
    for (var key in printParameters) {
      url += '&' + key + '=' + printParameters[key];
    }
    // helpers.api.document.print.showPDFwindow(url);
    window.open(url, 'tel100');
  }
});

// CreatorViewModel

Ext.define('Tel100.view.document.editor.CreatorViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documenteditorcreator',

  data: {
    document: null,
    isSaving: false,
    isSaved: true,
    isSending: false
  },

  formulas: {
    saveButtonText: function(get) {
      var isSaving = get('isSaving');
      var isSaved = get('isSaved');
      if (isSaving) {
        return i18n.ui.saving;
      } else {
        if (isSaved) {
          return i18n.ui.saved;
        } else {
          return i18n.ui.save;
        }
      }
    },
    saveButtonDisabled: function(get) {
      var isSaving = get('isSaving');
      var isSaved = get('isSaved');
      return isSaving || isSaved;
    },
    sendButtonDisabled: function(get) {
      // disable when sending document
      if (get('isSending')) { return true; }
      // disable when no draft motion
      if (!get('hasDraftMotion')) { return true; }
      // checking subject/body
      if (!get('hasSubject')) { return true; }
      // if (!get('hasBody')) { return true; }
      // send is open
      return false;
    },
    isGnerc: function(get) {
      return Ext.Array.contains([13, 14, 15, 16], get('document.type_id'));
    }
  }
});

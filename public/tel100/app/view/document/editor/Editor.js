Ext.define('Tel100.view.document.editor.Editor', {
  extend: 'Ext.container.Container',
  alias: 'widget.documenteditoreditor',

  controller: 'documenteditoreditor',
  viewModel: {
    type: 'documenteditoreditor'
  },
  layout: 'border',
  defaultListenerScope: true,

  items: [{
    xtype: 'tabpanel',
    region: 'center',
    border: false,
    padding: '',
    activeTab: 0,
    deferredRender: false,
    tabPosition: 'bottom',
    dockedItems: [{
      xtype: 'toolbar',
      dock: 'top',
      items: [{
        xtype: 'button',
        bind: {
          text: '{i18n.ui.refresh}'
        },
        listeners: {
          click: 'refresh'
        }
      }, {
        xtype: 'button',
        bind: {
          text: '{i18n.document.comment.actions.reply}'
        },
        listeners: {
          click: {
            fn: 'onReplyClick',
            scope: 'controller'
          }
        }
      }, {
        xtype: 'button',
        bind: {
          text: '{i18n.document.comment.actions.edit}',
          hidden: '{hideEditButton}'
        },
        listeners: {
          click: {
            fn: 'onEditClick',
            scope: 'controller'
          }
        }
      }, {
        xtype: 'button',
        bind: {
          text: '{i18n.document.base.ui.card}'
        },
        listeners: {
          click: {
            fn: 'onCardPrintClick',
            scope: 'controller'
          }
        }
      }, {
        xtype: 'documenteditorprintbutton',
        listeners: {
          'print': {
            fn: 'onDocumentPrint',
            scope: 'controller'
          }
        }
      }, {
        xtype: 'button',
        bind: {
          hidden: '{hideSignButton}',
          text: '{i18n.document.comment.actions.sign}'
        },
        listeners: {
          click: 'onSignDocument'
        }
      }, {
        xtype: 'button',
        bind: {
          hidden: '{hideAuthorButton}',
          text: '{i18n.document.comment.actions.author}'
        },
        listeners: {
          click: 'onAuthorDocument'
        }
      }, {
        xtype: 'button',
        bind: {
          hidden: '{hideHistoryButton}',
          text: '{i18n.document.base.ui.history}'
        },
        listeners: {
          click: 'onHistoryShow'
        }
      }]
    }],
    items: [{
      xtype: 'panel',
      border: false,
      layout: 'border',
      bind: {
        title: '{i18n.document.base.ui.contentTabTitle}'
      },
      items: [{
        xtype: 'container',
        region: 'center',
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
        items: [{
          xtype: 'form',
          margins: '0',
          autoScroll: true,
          border: false,
          cls: 'document-subject',
          resizable: false,
          layout: {
            type: 'vbox',
            align: 'stretch'
          },
          items: [{
            xtype: 'displayfield',
            flex: 1,
            itemId: 'fldAuthors',
            shrinkWrap: 2,
            fieldStyle: 'height: inherit',
            bind: {
              fieldLabel: '{i18n.document.base.authors}',
              value: '{authors}'
            }
          }, {
            xtype: 'displayfield',
            flex: 1,
            itemId: 'fldDocumentInfo',
            shrinkWrap: 2,
            width: '100%',
            fieldStyle: 'height: inherit',
            bind: {
              fieldLabel: '{i18n.document.base.doc}',
              value: '{docinfo}'
            }
          }, {
            xtype: 'displayfield',
            flex: 1,
            itemId: 'fldSignees',
            shrinkWrap: 2,
            fieldStyle: 'height: inherit',
            bind: {
              hidden: '{hideSignees}',
              fieldLabel: '{i18n.document.base.signees}',
              value: '{signees}'
            }
          }, {
            xtype: 'displayfield',
            flex: 1,
            itemId: 'fldIncoming',
            shrinkWrap: 2,
            fieldStyle: 'height: inherit',
            bind: {
              hidden: '{hideIncoming}',
              fieldLabel: '{i18n.document.base.from}',
              value: '{incoming}'
            }
          }, {
            xtype: 'displayfield',
            flex: 1,
            itemId: 'fldOutgoing',
            shrinkWrap: 2,
            fieldStyle: 'height: inherit',
            bind: {
              hidden: '{hideOutgoing}',
              fieldLabel: '{i18n.document.base.to}',
              value: '{outgoing}'
            }
          }, {
            xtype: 'textfield',
            flex: 1,
            width: '100%',
            editable: false,
            bind: {
              fieldLabel: '{i18n.document.base.subject}',
              value: '{document.subject}'
            }
          }]
        }, {
          xtype: 'container',
          flex: 1,
          cls: 'document-body',
          overflowY: 'scroll',
          bind: {
            html: '{document.body}'
          }
        }]
      }, {
        xtype: 'container',
        region: 'east',
        split: true,
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
        }, {
          xtype: 'documentmotionsreceiverspanel'
        }, {
          xtype: 'documentmotionstree'
        }, {
          xtype: 'documentmotionsresultpanel',
          listeners: {
            commentadded: 'onPanelCommentadded'
          }
        }, {
          xtype: 'documentcommentpanel'
        }, {
          xtype: 'documentfilepanel'
        }, {
          xtype: 'documentrelationpanel'
        }]
      }]
    }, {
      xtype: 'panel',
      border: false,
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      bind: {
        title: '{i18n.document.base.ui.motionsTabTitle}'
      },
      items: [{
        xtype: 'documentmotionsinpanel',
        flex: 1,
        listeners: {
          motionchanged: {
            fn: 'onInMotionChanged',
            scope: 'controller'
          }
        }
      }, {
        xtype: 'splitter',
        width: 5
      }, {
        xtype: 'documentmotionsoutpanel',
        border: false,
        flex: 1
      }]
    }]
  }],

  listeners: {
    destroy: {
      fn: 'onDestroy',
      scope: 'controller'
    },

    afterrender: {
      fn: 'onContainerAfterRender',
      scope: 'controller'
    }
  },

  onSignDocument: function(button, e, eOpts) {
    var view = this;
    var vm = view.getViewModel();
    var doc = vm.get('document');
    var dialog = Ext.create('Tel100.view.document.comment.Sign', { modal: true });
    dialog.getViewModel().set('document', doc);
    dialog.on('signed', function() {
      view.refresh();
      view.fireEvent('documentchanged', doc);
    });
    dialog.show();
  },

  onAuthorDocument: function(button, e, eOpts) {
    var view = this;
    var vm = view.getViewModel();
    var doc = vm.get('document');
    var dialog = Ext.create('Tel100.view.document.comment.Author', { modal: true });
    dialog.getViewModel().set('document', doc);
    dialog.on('authored', function() {
      view.refresh();
      view.fireEvent('documentchanged', doc);
    });
    dialog.show();
  },

  onPanelCommentadded: function(panel) {
    var commentsPanel = this.down('documentcommentpanel');
    commentsPanel.refresh(function() {
      commentsPanel.setCollapsed(false);
    });
    var doc = this.getViewModel().get('document');
    this.fireEvent('documentchanged', doc);
    this.refresh();
  },

  initComponent: function() {
    this.callParent();
    var general = this.down('documenteditorgeneral');
    general.setReadonly(true);
  },

  refresh: function() {
    var view = this;
    view.setLoading(true);
    var vm = view.getViewModel();
    var doc = vm.get('document');
    doc.load({
      callback: function() {
        view.setLoading(false);

        var assigneesPanel = view.down('documentmotionsreceiverspanel');
        var commentsPanel = view.down('documentcommentpanel');
        var treePanel = view.down('documentmotionstree');
        var filesPanel = view.down('documentfilepanel');

        assigneesPanel.refresh();
        commentsPanel.refresh();
        treePanel.refresh();
        filesPanel.refresh();
      }
    });
  },

  onHistoryShow: function(){
    var vm = this.getViewModel();
    var document = vm.get('document');

    var historyWindow = Ext.create('Tel100.view.document.history.Window', {
      title: 'History',
      viewModel: {
        data: {
          document: document
        }
      }
    });
    historyWindow.show();
  }
});

// EditorViewController


Ext.define('Tel100.view.document.editor.EditorViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditoreditor',

  onEditClick: function(button, e, eOpts) {
    var vm = this.getViewModel();
    var document = vm.get('document');
    var title = [ i18n.document.comment.actions.edit, ': ', document.get('docnumber')].join('');

    var editWindow = Ext.create('Tel100.view.document.editor.Modify', {
      title: title,
      viewModel: {
        data: {
          document: document
        }
      }
    });

    editWindow.show();
  },

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

  onDocumentPrint: function(printParams) {
    var vm = this.getViewModel();
    var document = vm.get('document');
    var url = '/api/documents/print/document/' + document.id + '?lang=' + helpers.i18n.getCurrentLocale();
    for(var key in printParams){
      if(printParams[key]){
        url += '&'+ key + '=true';
      }
    }
    // helpers.api.document.print.showPDFwindow(url);
    window.open(url, 'tel100');
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

// EditorViewModel

Ext.define('Tel100.view.document.editor.EditorViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documenteditoreditor',

  data: {
    document: null,
    printParams: {
      subject: false,
      signature: false,
      assignees: false,
      author: false
    }
  },

  formulas: {
    hideEditButton: function(get){
      return !get('document.is_editable');
    },

    hideSignButton: function(get) {
      return get('document.as_signee') !== 1;
    },

    hideAuthorButton: function(get) {
      return get('document.as_author') !== 1;
    },

    hideHistoryButton: function(get) {
      return !get('document.has_history');
    },

    authors: function(get) {
      var authors = get('document.authors');
      var text = [];
      if (authors.length) {
        for(var i = 0; i < authors.length; i++) {
          var author = authors[i];
          var decor = helpers.document.status.statusDecoration(author.status);
          text.push([
          '<span class="' + decor.style + '">',
          '<i class="fa ' + decor.icon + '"></i> ',
          '<a data-id="' + author.author_id + '" data-class="' + author.author_type + '">' + author.name + '</a>',
          ( author.response ? ' &mdash; ' + author.response : '' ),
          '</span>'
          ].join(''));
        }
        return text.join('; ');
      } else {
        var status = get('document.status');
        var decor = helpers.document.status.statusDecoration(status);
        var senderName = get('document.sender_name');
        var senderId = get('document.sender_id');
        var senderType = get('document.sender_type');
        return [
        //     '<strong class="text-success">' + i18n.document.base.sender + '</strong> &mdash; ',
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        '<a data-id="' + senderId + '" data-class="' + senderType + '">' + senderName + '</a>',
        '</span>'
        ].join('');
      }
    },

    hideSignees: function(get) {
      var signees = get('document.signees');
      return !signees || signees.length === 0;
    },

    signees: function(get) {
      var signees = get('document.signees');
      var text = [];
      for(var i = 0; i < signees.length; i++) {
        var signee = signees[i];
        var decor = helpers.document.status.statusDecoration(signee.status);
        text.push([
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        '<a data-id="' + signee.signee_id + '" data-class="' + signee.signee_type + '">' + signee.name + '</a>',
        ( signee.response ? ' &mdash; ' + signee.response : '' ),
        '</span> ',
        ( signee.completed_at ? '<span class="text-danger">' + signee.completed_at + '</span>' : '' )
        ].join(''));
      }
      return text.join('; ');
    },

    docinfo: function(get) {
      var docnumber = get('document.docnumber');
      var typeName = get('document.type.name');
      var status = get('document.status');
      var decor = helpers.document.status.statusDecoration(status);

      var actualSender = get('document.actual_sender');
      var senderName = get('document.sender_name');
      var senderId = get('document.sender_id');
      var senderUserId = get('document.sender_user_id');
      var senderType = get('document.sender_type');
      var sentAt = get('document.sent_at_f');
      var senderText = '<strong><a data-id="' + senderId + '" data-class="' + senderType + '">' + senderName + '</a></strong>';
      if (actualSender && senderUserId !== actualSender.id) {
        senderText += ' (' + '<strong><a data-id="' + actualSender.id + '" data-class="Sys::User">' + actualSender.name + '</a>)';
      }

      return [
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        '<strong>' + docnumber + '</strong>',
        '</span> ',
        '<span class="text-muted">' + typeName + '</span> &mdash; ',
        senderText + ', ',
        '<span class="text-danger">' + sentAt + '</span>'
      ].join('');
    },

    incoming: function(get) {
      var incoming = get('document.incoming');

      if (incoming) {
        var text = [];
        incoming.forEach(function(motion) {
          text.push(helpers.document.renderer.renderMotion(motion, { as: 'sender' }));
        });
        return text.join('; ');
      }

      return null;
    },

    hideIncoming: function(get) {
      var incoming = get('document.incoming');
      if (incoming) {
        return incoming.length == 0;
      }
      return true;
    },

    outgoing: function(get) {
      var outgoing = get('document.outgoing');

      if (outgoing) {
        var text = [];
        outgoing.forEach(function(motion) {
          text.push(helpers.document.renderer.renderMotion(motion, { as: 'receiver' }));
        });
        return text.join('; ');
      }

      return null;
    },

    hideOutgoing: function(get) {
      var outgoing = get('document.outgoing');
      if (outgoing) {
        return outgoing.length == 0;
      }
      return true;
    }
  }
});

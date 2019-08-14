Ext.define('Tel100.view.document.editor.Template', {
  extend: 'Ext.container.Container',
  alias: 'widget.documenteditortemplate',

  controller: 'documenteditortemplate',
  viewModel: {
    type: 'documenteditortemplate'
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
          text: '{i18n.document.comment.actions.use}',
        },
        listeners: {
          click: {
            fn: 'onUseClick',
            scope: 'controller'
          }
        }
      }]
    }],
    items: [{
      xtype: 'panel',
      border: false,
      layout: 'border',
      bind: {
        title: '{i18n.document.base.ui.Template}'
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
          xtype: 'documentmotionssigneepanel',
          itemId: 'signees'
        }, {
          xtype: 'documentmotionsauthorpanel',
          itemId: 'authors'
        }, {
          xtype: 'documentgnercpanel',
          bind: {
            hidden: '{!isGnerc}'
          }
        }, {
          xtype: 'documentmotionsreceiverspanel',
          itemId: 'assignees',
          // bind: {
          //   hidden: '{notMyDocument}'
          // },
          // listeners: {
          //   commentadded: 'onPanelCommentadded'
          // }
        }, {
          xtype: 'documentfilepanel'
        }]
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

  initComponent: function() {
    this.callParent();
    var general = this.down('documenteditorgeneral');
    general.setReadonly(true);

    var signeesPanel = this.down('#signees');
    signeesPanel.setEditable(false);

    var authorsPanel = this.down('#authors');
    authorsPanel.setEditable(false);

    var assigneesPanel = this.down('#assignees');
    assigneesPanel.setEditable(false);
  }

});

// EditorViewController


Ext.define('Tel100.view.document.editor.TemplateViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditortemplate',

  onUseClick: function(button, e, eOpts) {
    var vm = this.getViewModel();
    var document = vm.get('document');

    helpers.api.document.base.clone(document.id, {
      success: function(data) {
        var doc = Ext.create('Tel100.model.document.Base', data);
        // this.getViewModel().set('selection', doc);
        this.getView().up('documentmain').getController().openDocument(doc);
      }.bind(this)
    });
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
  }
});

// EditorViewModel

Ext.define('Tel100.view.document.editor.TemplateViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documenteditortemplate',

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
      var typeName = get('document.type.name');
      var status = get('document.status');
      var decor = helpers.document.status.statusDecoration(status);

      var actualSender = get('document.actual_sender');
      var senderName = get('document.sender_name');
      var senderId = get('document.sender_id');
      var senderUserId = get('document.sender_user_id');
      var senderType = get('document.sender_type');
      var senderText = '<strong><a data-id="' + senderId + '" data-class="' + senderType + '">' + senderName + '</a></strong>';
      if (actualSender && senderUserId !== actualSender.id) {
        senderText += ' (' + '<strong><a data-id="' + actualSender.id + '" data-class="Sys::User">' + actualSender.name + '</a>)';
      }

      return [
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        '</span> ',
        '<span class="text-muted">' + typeName + '</span> &mdash; ',
        senderText
      ].join('');
    },

    incoming: function(get) {
      var incoming = get('document.incoming');

      if (incoming) {
        var text = [];
        incoming.forEach(function(motion) {
          var motion_text = helpers.document.renderer.renderMotion(motion, { as: 'sender' });
          if ( motion.motion_text ) {
           motion_text = motion_text + ' &mdash; ' + motion.motion_text;
          }
          text.push(motion_text);
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
    },

    notMyDocument: function(get) {
      var doc = this.get('document');
      return !doc.get('is_mydoc');
    },

    isGnerc: function(get) {
      return Ext.Array.contains(helpers.document.type.GNERC_TYPES, get('document.type_id'));
    }
  }
});

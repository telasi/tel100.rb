Ext.define('Tel100.view.document.editor.Modify', {
  extend: 'Ext.window.Window',
  alias: 'widget.documenteditormodify',

  requires: [
    'Tel100.view.document.editor.ModifyViewModel',
    'Tel100.view.document.editor.ModifyViewController'
  ],

  controller: 'documenteditormodify',
  viewModel: {
    type: 'documenteditormodify'
  },
  layout: 'border',
  defaultListenerScope: true,
  modal: true,
  width: '90%',
  height: '90%',

  listeners: {
    beforerender: {
      fn: 'onBeforeRender',
      scope: 'controller'
    }
  },

  items: [
    {
      xtype: 'panel',
      border: false,
      region: 'center',
      layout: 'border',
      bodyBorder: true,
      dockedItems: [
        {
          xtype: 'toolbar',
          region: 'south',
          dock: 'bottom',
          border: false,
          items: [
            {
              xtype: 'tbfill'
            },
            {
              xtype: 'button',
              bind: {
                text: '{i18n.ui.save}'
              },
              listeners: {
                click: {
                  fn: 'onSaveClick',
                  scope: 'controller'
                }
              }
            },
            {
              xtype: 'button',
              bind: {
                text: '{i18n.ui.cancel}'
              },
              listeners: {
                click: {
                  fn: 'onCancelClick',
                  scope: 'controller'
                }
              }
            }
          ]
        }
      ],
      items: [
        {
          xtype: 'container',
          flex: 1,
          region: 'center',
          baseCls: 'white-panel',
          border: false,
          padding: '10',
          layout: {
            type: 'vbox',
            align: 'stretch'
          },
          items: [
            {
              xtype: 'textfield',
              submitEmptyText: false,
              padding: 5,
              labelAlign: 'top',
              emptyText: 'enter document\'s subject',
              bind: {
                fieldLabel: '{i18n.document.base.subject}',
                value: '{document.subject}',
                readOnly: '{!canEditSubject}'
              }
            },
            {
              xtype: 'fieldcontainer',
              layout: 'hbox',
              items:[{
                  flex: 1,
                  xtype: 'textfield',
                  submitEmptyText: false,
                  padding: 5,
                  labelAlign: 'top',
                  emptyText: 'enter document\'s number',
                  bind: {
                    fieldLabel: '{i18n.document.base.docnumber2}',
                    value: '{document.docnumber2}',
                    readOnly: '{!canEditNumber}'
                  }
                },
                {
                  xtype: 'datefield',
                  format: 'd/m/Y',
                  padding: 5,
                  labelAlign: 'top',
                  emptyText: 'enter document\'s number',
                  bind: {
                    fieldLabel: '{i18n.document.base.docdate}',
                    value: '{document.docdate}',
                    readOnly: '{!canEditDate}'
                  }
                }]
            },
            {
              //xtype: 'htmleditor',
              xtype: 'tinymce_textarea',
              noWysiwyg: false,
              tinyMCEConfig: helpers.tinymce.getConfig(),
              style: { border: '0' },
              flex: 1,
              itemId: 'documentBody',
              padding: '0 5 5 5',
              labelAlign: 'top',
              bind: {
              //   fieldLabel: '{i18n.document.base.body}'
                readOnly: '{!canEditText}'
              },
              listeners: {
                // click: 'onHtmleditorClick',
                change: 'onHtmleditorChange'
              }
            }
          ]
        },
        {
          xtype: 'container',
          region: 'east',
          split: true,
          border: false,
          width: 400,
          layout: {
            type: 'accordion',
            hideCollapseTool: true
          },
          items: [
            {
              xtype: 'documentmotionsauthormodifypanel',
              bind: {
                hidden: '{!author_one}'
              },
              listeners: {
                datachanged: 'onAuthorChanged'
              }
            },
            {
              xtype: 'documentmotionssigneemodifypanel',
              bind: {
                hidden: '{!canEditSignees}'
              },
              listeners: {
                datachanged: 'onSigneesChanged'
              }
            },
            {
              xtype: 'documentmotionsassigneemodifypanel',
              listeners: {
                datachanged: 'onAssigneeChange'
              }
            },
            {
              xtype: 'documentfilemodifypanel',
              itemId: 'files'
            }
          ]
        }
      ]
    }
      ],

  onHtmleditorChange: function(field, newValue, oldValue, eOpts) {
    var view = field.up('documenteditormodify');
    var vm = view.getViewModel();
    if(vm.get('canEditText')){
      var document = vm.get('document');
      document.set('body', newValue);
    }
  },

  // onHtmleditorClick: function(field){
  //   var view = field.up('documenteditormodify');
  //   var vm = view.getViewModel();
  //   vm.set('editMode', true);
  // },

  initComponent: function() {
    this.callParent();

    var view = this;
    var viewModel = this.getViewModel();

    var document = viewModel.get('document');

    var fileview = this.down('documentfilemodifypanel');
    var fileViewModel = fileview.getViewModel();

    helpers.api.document.edit.modification(document.id, { success: function(data) {
        var is_auto_signee = data.is_auto_signee;
        viewModel.set('is_auto_signee', is_auto_signee);
        fileViewModel.set('is_auto_signee', is_auto_signee);
      }
    });
  },

});
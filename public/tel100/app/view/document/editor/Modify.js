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
                value: '{document.subject}'
              }
            },
            {
              xtype: 'textfield',
              submitEmptyText: false,
              padding: 5,
              labelAlign: 'top',
              emptyText: 'enter document\'s number',
              bind: {
                fieldLabel: '{i18n.document.base.docnumber2}',
                value: '{document.docnumber2}'
              }
            },
            {
              xtype: 'htmleditor',
              flex: 1,
              itemId: 'documentBody',
              padding: '0 5 5 5',
              labelAlign: 'top',
              bind: {
                fieldLabel: '{i18n.document.base.body}'
              },
              listeners: {
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
              xtype: 'documentmotionssigneemodifypanel',
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
    var document = vm.get('document');
    document.set('body', newValue);
  }

});
Ext.define('Tel100.view.hr.party.Edit', {
  extend: 'Ext.window.Window',
  alias: 'widget.hrpartyedit',

  requires: [
    'Tel100.view.hr.party.EditViewModel',
    'Tel100.view.hr.party.EditViewController',
    'Ext.form.Panel',
    'Ext.tab.Panel',
    'Ext.tab.Tab',
    'Ext.form.field.Text'
  ],

  config: {
    buttonAlign: 'center'
  },

  controller: 'hrpartyedit',
  viewModel: {
    type: 'hrpartyedit'
  },
  resizable: false,
  width: 500,
  layout: 'fit',
  modal: true,

  bind: {
    title: 'Edit'
  },
  items: [
    {
      xtype: 'form',
      buttonAlign: 'center',
      bodyPadding: 0,
      header: false,
      title: 'My Form',
      url: '/api/hr/party/update',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      items: [
        {
          xtype: 'tabpanel',
          activeTab: 0,
          items: [
            {
              xtype: 'panel',
              layout: 'form',
              title: 'KA',
              items: [
                {
                  xtype: 'textfield',
                  name: 'name_ka',
                  allowBlank: false,

                  bind: {
                    fieldLabel: '{i18n.hr.party.fields.name}',
                    value: '{partyedit.data.items.0.name_ka}'
                  }
                },
                {
                  xtype: 'textfield',
                  name: 'address_ka',
                  bind: {
                    fieldLabel: '{i18n.hr.party.fields.address}',
                    value: '{partyedit.data.items.0.address_ka}'
                  }
                },
                {
                  xtype: 'textfield',
                  name: 'contact_ka',
                  bind: {
                    fieldLabel: '{i18n.hr.party.fields.contact}',
                    value: '{partyedit.data.items.0.contact_ka}'
                  }
                }
              ]
            },
            {
              xtype: 'panel',
              layout: 'form',
              title: 'RU',
              items: [
                {
                  xtype: 'textfield',
                  name: 'name_ru',
                  bind: {
                    fieldLabel: '{i18n.hr.party.fields.name}',
                    value: '{partyedit.data.items.0.name_ru}'
                  }
                },
                {
                  xtype: 'textfield',
                  name: 'address_ru',
                  bind: {
                    fieldLabel: '{i18n.hr.party.fields.address}',
                    value: '{partyedit.data.items.0.address_ru}'
                  }
                },
                {
                  xtype: 'textfield',
                  name: 'contact_ru',
                  bind: {
                    fieldLabel: '{i18n.hr.party.fields.contact}',
                    value: '{partyedit.data.items.0.contact_ru}'
                  }
                }
              ]
            },
            {
              xtype: 'panel',
              layout: 'form',
              title: 'EN',
              items: [
                {
                  xtype: 'textfield',
                  name: 'name_en',
                  bind: {
                    fieldLabel: '{i18n.hr.party.fields.name}',
                    value: '{partyedit.data.items.0.name_en}'
                  }
                },
                {
                  xtype: 'textfield',
                  name: 'address_en',
                  bind: {
                    fieldLabel: '{i18n.hr.party.fields.address}',
                    value: '{partyedit.data.items.0.address_en}'
                  }
                },
                {
                  xtype: 'textfield',
                  name: 'contact_en',
                  bind: {
                    fieldLabel: '{i18n.hr.party.fields.contact}',
                    value: '{partyedit.data.items.0.contact_en}'
                  }
                }
              ]
            }
          ]
        },
        {
          xtype: 'container',
          layout: 'form',
          items: [
            {
              xtype: 'textfield',
              name: 'identity',
              bind: {
                fieldLabel: '{i18n.hr.party.fields.identity}',
                value: '{partyedit.data.items.0.identity}'
              }
            },
            {
              xtype: 'textfield',
              name: 'phones',
              bind: {
                fieldLabel: '{i18n.hr.party.fields.phones}',
                value: '{partyedit.data.items.0.phones}'
              }
            },
            {
              xtype: 'textfield',
              name: 'customer',
              bind: {
                fieldLabel: '{i18n.hr.customer.fields.accnumb}',
                value: '{partyedit.data.items.0.customer}'
              }
            },
            {
              xtype: 'textfield',
              fieldLabel: 'Email',
              name: 'email',
              bind: {
                value: '{partyedit.data.items.0.email}'
              }
            }
          ]
        },
        {
          xtype: 'button',
          margin: 5,
          bind: {
            text: '{i18n.ui.save}'
          },
          listeners: {
            click: 'onButtonClick'
          }
        }
      ]
    }
  ],

  // initComponent: function() {
  //   this.callParent();
  //   var view = this;
  //   var viewModel = this.getViewModel();
  //   debugger;
  //   viewModel.bind('{partyedit}', function(store) {
  //     if (store) {
  //       store.view = view;
  //       store.viewModel = viewModel;
  //     }
  //   });
  //   debugger;
  //   viewModel.getStore('partyedit').load();
  // },

});
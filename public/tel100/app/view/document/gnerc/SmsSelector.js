/*
 * File: app/view/party/Selector.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Tel100.view.document.gnerc.SmsSelector', {
  extend: 'Ext.window.Window',
  alias: 'widget.smsselector',

  requires: [
    'Ext.tab.Panel',
    'Ext.grid.Panel',
    'Ext.grid.View',
    'Ext.grid.column.Column',
  ],

  controller: 'smsselector',
  viewModel: {
    type: 'smsselector'
  },
  height: 500,
  width: 950,
  autoDestroy: false,
  // closeAction: 'hide',
  title: 'Select Sms',
  maximizable: true,
  modal: true,
  defaultListenerScope: true,

   layout: {
     type: 'vbox',
     align: 'stretch'
  },
  items: [
    {
      xtype: 'gridpanel',
      cls: 'panel-with-border',
      itemId: 'selectedSmses',
      bodyBorder: true,
      hideHeaders: true,
      flex: 1,
      bind: {
        title: '{i18n.selector.selectedSmses}',
        store: '{smses}'
      },
      columns: [
      {
          xtype: 'gridcolumn',
          cellWrap: true,
          renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
             return '<code>' + value + '</code>';
          },
          dataIndex: 'description',
          text: 'Description',
          flex: 1
        },
        {
          xtype: 'gridcolumn',
          cellWrap: true,
          // renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
          //   if(record.toHtml){
          //     return record.toHtml();
          //   }
          // },
          dataIndex: 'text',
          text: 'Text',
          flex: 2
        }
      ],
      listeners: {
        celldblclick: 'onSelectedSmsesCellDblClick',
        selectionchange: 'onSelectionChange'
      }
    },
    {
      xtype: 'textareafield',
      height: 50,
      bind: {
        value: '{curtext}'
      }
    }
  ],
  dockedItems: [
    {
      xtype: 'toolbar',
      flex: 1,
      dock: 'bottom',
      items: [
        {
          xtype: 'button',
          bind: {
            text: '{i18n.ui.cancel}'
          },
          listeners: {
            click: 'onCancelClick'
          }
        },
        {
          xtype: 'tbspacer',
          flex: 1
        },
        {
          xtype: 'button',
          bind: {
            text: '{i18n.selector.selectorConfirm}'
          },
          listeners: {
            click: 'onSelectClicked'
          }
        }
      ]
    }
  ],

  onCancelClick: function(button, e, eOpts) {
    this.close();
  },

  onSelectClicked: function(button, e, eOpts) {
    this.fireEvent('smsselectioncomplete', this.getViewModel().get('curtext'));
    this.close();
  },

  onSelectionChange: function(grid, selected, eOpts){
    this.getViewModel().set('curtext', selected[0].get('text'));
  },

  onStoreBeforeLoad: function(store, operation, eOpts) {
    // var ps = this.up('partyselector');
    // var vm = ps.getViewModel();
    // var pr = store.getProxy();
    // pr.setExtraParams({hideHR: vm.get('hideHR'), hideParty: vm.get('hideParty'), hideCustomers: vm.get('hideCustomers')});
  }

});

Ext.define('Tel100.view.document.gnerc.SmsSelectorController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.smsselector',

});

Ext.define('Tel100.view.document.gnerc.SmsSelectorViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.smsselector',

  data: {
    curtext: null,
    id: null
  },

  stores: {
    smses: {
      autoLoad: true,
      model: 'Tel100.model.document.Smses',
      proxy: {
        type: 'ajax',
        extraParams: {
          id: '{id}'
        },
        url: '/api/documents/gnerc/smses',
        reader: {
          type: 'json'
        }
      },
      listeners: {
        beforeload: 'onStoreBeforeLoad'
      }
    }
  }
});

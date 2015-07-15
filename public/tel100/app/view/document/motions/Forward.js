Ext.define('Tel100.view.document.motions.Forward', {
  extend: 'Ext.window.Window',
  alias: 'widget.documentmotionsforwardpanel',

  controller: 'documentmotionsforwardpanel',
  viewModel: {
    type: 'documentmotionsforwardpanel'
  },
  modal: true,
  width: 700,
  height: 400,

  layout: 'border',

  bind: {
    title: '{i18n.document.motion.forward}'
  },

  items: [{
    xtype: 'gridpanel',
    region: 'west',
    width: 300,
    split: true,
    bind: {
      store: '{assignees}'
    },
    columns: [{
      xtype: 'gridcolumn',
      resizable: false,
      sortable: false,
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            if(record.toHtml){
              return record.toHtml();
            }
          },
      dataIndex: 'name',
      hideable: false,
      flex: 1,
      bind: {
        text: '{i18n.document.motion.add_assignees}'
      }
    }]
  }, {
    xtype: 'form',
    bodyPadding: 5,
    region: 'center',
    layout: 'form',
    items: [{
      xtype: 'combobox',
      flex: 1,
      tpl: '<tpl for="."><div class="x-boundlist-item">{html_name}</div></tpl>',
      itemId: 'result-types',
      editable: false,
      autoSelect: false,
      displayField: 'name',
      valueField: 'id',
      name: 'send_type_id',
      bind: {
        fieldLabel: '{i18n.document.motion.send_type}',
        store: '{responseTypes}'
      }
    }, {
      xtype: 'textareafield',
      name: 'motion_text',
      flex: 1,
      height: 300,
      bind: {
        fieldLabel: '{i18n.document.motion.motion_text}',
      }
    },{
      xtype: 'datefield',
      name: 'due_date',
      format: 'd/m/Y',
      bind: {
        fieldLabel: '{i18n.document.motion.due_date}'
      }
    }]
  }],

  dockedItems: [{
    xtype: 'toolbar',
    flex: 1,
    dock: 'bottom',
    autoScroll: true,
    items: [{
      xtype: 'button',
      handler: function(button, e) {
        var view = this.up('documentmotionsforwardpanel');
        var dialog = helpers.party.getPartyDialog(function(assignees) {
          var store = view.getViewModel().getStore('assignees');
          for(var i = 0; i < assignees.length; i++){
            store.add(assignees[i]);
          }
        });
        dialog.show();
      },
      bind: {
        text: '{i18n.document.motion.actions.add_assignee}'
      }
    }, {
      xtype: 'tbspacer',
      flex: 1
    }, {
      xtype: 'button',
      handler: function(button, e) {
        var dialog = this.up('documentmotionsforwardpanel');
        var form = dialog.down('form').getForm();
        if (form.isValid()){
          var store = dialog.getViewModel().getStore('assignees');
          var records = store.getData().getRange();
          var motion_values = form.getValues();
          dialog.fireEvent('forwardassignees', records, motion_values);
          dialog.close();
        } else {
          Ext.Msg.alert('Error', 'Wrong values');
        }
      },
      bind: {
        text: '{i18n.document.motion.actions.send_assigness}'
      }
    }]
  }],

});

Ext.define('Tel100.view.document.motions.ForwardViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsforwardpanel',

});

Ext.define('Tel100.view.document.motions.ForwardViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsforwardpanel',

  stores: {
    assignees: {
    },
    responseTypes: {
      autoLoad: true,
      model: 'Tel100.model.document.ResponseType',
      proxy: {
        type: 'ajax',
        extraParams: {
          type: 'send',
          role: 'assignee'
        },
        url: '/api/documents/response_types',
        reader: {
          type: 'json'
        }
      }
    }
  }
});

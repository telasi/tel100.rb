Ext.define('Tel100.view.document.file.ModifyPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentfilemodifypanel',

  requires: [
    'Tel100.view.document.file.ModifyPanelViewModel',
    'Tel100.view.document.file.ModifyPanelViewController',
    'Ext.toolbar.Toolbar',
    'Ext.form.Panel',
    'Ext.form.field.File',
    'Ext.grid.Panel',
    'Ext.grid.View',
    'Ext.grid.column.Action',
    'Ext.panel.Tool'
  ],

  controller: 'documentfilemodifypanel',
  viewModel: {
    type: 'documentfilemodifypanel'
  },
  border: false,
  layout: 'anchor',
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.file.attachments} ({fileCount})'
  },
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      border: 0,
      bind: {
        hidden: '{notEditable}'
      },
      items: [
        {
          xtype: 'form',
          border: false,
          padding: 0,
          bodyPadding: 0,
          items: [
            {
              xtype: 'filefield',
              cls: 'file-upload',
              allowBlank: false,
              padding: 0,
              name: 'file',
              buttonText: '<i class="fa fa-plus"></i>',
              listeners: {
                change: {
                  fn: 'onFilefieldChange',
                  scope: 'controller'
                }
              }
            }
          ]
        }
      ]
    }
  ],
  items: [
    {
      xtype: 'gridpanel',
      autoScroll: true,
      border: false,
      hideHeaders: true,
      scroll: 'vertical',
      bind: {
        store: '{files}'
      },
      viewConfig: {
        getRowClass: function(record, rowIndex, rowParams, store) {
          var status = record.get('status');
          text = helpers.document.status.motionStatusRowClass(status, record);
          if(record.get('deleted')){
            return 'row-text-deleted';
          }
        
        return text;
        }
      },
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'name',
          flex: 1,
          renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            if(record.get('state') && record.get('state') == 1){
              return ['<span style="text-decoration: line-through;">', value, '</span'].join('');
            } else {
              return value;
            }
          },
        },
        {
          xtype: 'actioncolumn',
          width: 24,
          // bind: {
          //   hidden: '{notDeletable}'
          // },
          items: [
            {
              handler: function(view, rowIndex, colIndex, item, e, record, row) {
                record.set('deleted', true);
              },
              getClass: function(v, meta, rec) {
                var is_auto_signee = this.up('documentfilemodifypanel').getViewModel().get('is_auto_signee');
                  if(rec.data.state != 2 && is_auto_signee) {
                      return 'x-hidden';
                  }
              },
              icon: '/images/delete.gif'
            }
          ]
        }
      ],
      listeners: {
        celldblclick: {
          fn: 'onGridpanelCellDblClick',
          scope: 'controller'
        }
      }
    },{
      xtype: 'gridpanel',
      autoScroll: true,
      border: false,
      hideHeaders: true,
      scroll: 'vertical',
      bind: {
        store: '{filestemp}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'name',
          flex: 1
        },
        {
          xtype: 'actioncolumn',
          width: 24,
          items: [
            {
              handler: function(view, rowIndex, colIndex, item, e, record, row) {
                var id = record.id;
                helpers.api.document.edit.filedelete(id, {
                  success: function() {
                    view.up('documentfilemodifypanel').refresh();
                  }
                });
              },
              getClass: function(v, meta, rec) {
                var is_auto_signee = this.up('documentfilemodifypanel').getViewModel().get('is_auto_signee');
                  if(rec.data.state != 2 && is_auto_signee) {
                      return 'x-hidden';
                  }
              },
              icon: '/images/delete.gif'
            }
          ]
        }
      ],
      listeners: {
        celldblclick: {
          fn: 'onGridpanelCellDblClick',
          scope: 'controller'
        }
      }
    }
  ],
  tools: [
    {
      xtype: 'tool',
      type: 'refresh',
      listeners: {
        click: 'onRefresh'
      }
    }
  ],

  onRefresh: function(tool, e, owner, eOpts) {
    // this.prepare();
    this.refresh();
  },

  refresh: function() {
    var vm = this.getViewModel();
    vm.getStore('files').load();
    vm.getStore('filestemp').load();
  },

  prepare: function(){
    var view = this;
    var viewModel = this.getViewModel();
    var document = viewModel.get('document');

    helpers.api.document.edit.prepare(document.id);
  },

  initComponent: function() {
    this.callParent();

    var view = this;
    var viewModel = this.getViewModel();

    // this.prepare();

    viewModel.bind('{files}', function(store) {
      if (store) {
        store.view = view;
        store.viewModel = viewModel;
      }
    });

    viewModel.bind('{filestemp}', function(store) {
      if (store) {
        store.view = view;
        store.viewModel = viewModel;
      }
    });
  },

  setEditable: function(editable) {
    var vm = this.getViewModel();
    vm.set('editable', editable);
  },

  getEditable: function() {
    var vm = this.getViewModel();
    return vm.get('editable');
  }

});
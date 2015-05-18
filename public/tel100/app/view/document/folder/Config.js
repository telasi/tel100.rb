Ext.define('Tel100.view.document.folder.Config', {
  extend: 'Ext.window.Window',
  alias: 'widget.documentfolderconfig',

  controller: 'documentfolderconfig',
  viewModel: {
    type: 'documentfolderconfig'
  },
  height: 353,
  width: 303,
  layout: 'fit',
  modal: true,

  bind: {
    title: '{i18n.document.folder.categories.b}'
  },
  items: [
    {
      xtype: 'gridpanel',
      header: false,
      title: 'My Grid Panel',
      hideHeaders: true,
      store: 'CustomFolders',
      columns: [
        {
          xtype: 'gridcolumn',
          renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            return helpers.api.folders.folderDecoration(record.get('folder_type'), record.get('name'));
          },
          dataIndex: 'name',
          text: 'String',
          flex: 1
        }
      ],
      selModel: {
        selType: 'rowmodel'
      }
    }
  ],
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'right',
      vertical: true,
      items: [
        {
          xtype: 'button',
          text: '+',
          listeners: {
            click: 'onPlusButtonClick'
          }
        },
        {
          xtype: 'button',
          text: '-',
          listeners: {
            click: 'onMinusButtonClick'
          }
        },
        {
          xtype: 'button',
          text: '^'
        },
        {
          xtype: 'button',
          text: 'v'
        }
      ]
    }
  ]
});

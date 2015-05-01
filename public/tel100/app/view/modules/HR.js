Ext.define('Tel100.view.modules.HR', {
  extend: 'Ext.container.Container',
  alias: 'widget.moduleshr',

  controller: 'moduleshr',
  layout: 'fit',
  viewModel: {
    type: 'moduleshr'
  },

  items: [{
    xtype: 'tabpanel',
    activeTab: 0,
    layout: 'fit',
    items: [{
      xtype: 'panel',
      bind: { title: '{i18n.vacation.ui.title}' },
      dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
          xtype: 'button',
          bind: { text: '{i18n.vacation.ui.button}' },
          listeners: { click: 'onButtonClick' }
        }]
      }],
      items: [{
        xtype: 'gridpanel',
        title: 'ისტორია',
        bind: { store: '{vacationlist}' },
        columns: [{
          xtype: 'datecolumn',
          dataIndex: 'from_date',
          flex: 2,
          format: 'd/m/Y',
          bind: {
            text: '{i18n.vacation.fields.from}'
          }
        },
        {
          xtype: 'datecolumn',
          dataIndex: 'to_date',
          flex: 2,
          format: 'd/m/Y',
          bind: {
            text: '{i18n.vacation.fields.to}'
          }
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'type_name',
          flex: 10,
          bind: {
            text: '{i18n.vacation.fields.type}'
          }
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'full_name',
          flex: 10,
          bind: {
            text: '{i18n.vacation.fields.substitude}'
          }
        }]
      }]
    }, {
      xtype: 'panel',
      layout: 'fit',
      title: 'HR Structure',
      items: [{
        xtype: 'hrtreepanel'
      }]
    }
  ]}
]});

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

Ext.define('Tel100.view.modules.HRViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.moduleshr',

  onButtonClick: function(button, e, eOpts) {
    me = this;
    var vacationwindow = Ext.create('Tel100.view.hr.vacation.Window',
      {
        listeners: {
          vacationadded: function(action){
            me.refreshVacationGrid();
        }
      }
      });
    vacationwindow.show();
  },

  refreshVacationGrid: function(){
    var view = this.getView();
    view.down('gridpanel').getStroe().reload();
  }
});

Ext.define('Tel100.view.modules.HRViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.moduleshr',

  stores: {
    vacationlist: {
      autoLoad: true,
      proxy: {
        type: 'rest',
        url: '/api/vacation/list'
      },
      fields: [ 'id', 'from_date', 'to_date', 'full_name', 'type_name' ]
    }
  }
});

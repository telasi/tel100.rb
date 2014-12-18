Ext.define('Tel100.view.sys.user.AdminPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.sysuseradminpanel',

  requires: [
    // 'Tel100.view.sys.user.AdminPanelViewModel',
    // 'Tel100.view.sys.user.AdminPanelViewController',
    'Tel100.view.sys.user.grid.Panel',
    'Tel100.view.sys.user.form.Panel',
    'Ext.grid.Panel',
    'Ext.form.Panel'
  ],

  // controller: 'documenttypeadminpanel',
  // viewModel: {
  //   type: 'documenttypeadminpanel'
  // },
  layout: 'border',

  items: [{
    xtype: 'sysusergridpanel',
    reference: 'grid',
    width: 300,
    region: 'west',
    split: true,
    bind: {
      // selection: '{selected}',
      // title: '{i18n.admin.documents.types}'
    },
    listeners: {
      // selectionchange: 'onTypeSelected'
    }
  }, {
    xtype: 'sysuserformpanel',
    reference: 'form',
    region: 'center',
    // listeners: {
    //   typecreated: 'onTypeCreated',
    //   typeupdated: 'onTypeUpdated',
    //   typedeleted: 'onTypeDeleted'
    // }
  }]
});

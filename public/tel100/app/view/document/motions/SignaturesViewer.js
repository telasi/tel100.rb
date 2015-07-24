Ext.define('Tel100.view.document.motions.SignaturesViewer', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentmotionssignaturesviewer',

  controller: 'documentmotionssignaturesviewer',
  viewModel: {
    type: 'documentmotionssignaturesviewer'
  },
  hideHeaders: true,
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.motion.signatures} ({signatureCount})',
    store: '{signatures}'
  },
  columns: [
    {
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        var status = record.get('status');
        var decor = helpers.document.status.statusDecoration(status);
        var text = '<strong>' + value + '</strong>';
        var role = record.get('role');
        var roleName = i18n.document.role[role];
        text += ', <span class="text-muted">' + roleName + '</span>';
        var date = record.get('date');
        if (date) { text = text + ' &mdash; ' + date; }
        return [
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        text,
        '</span>'
        ].join('');
      },
      dataIndex: 'name',
      text: 'name',
      flex: 1
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
    this.refresh();
  },

  refresh: function() {
    this.getStore().load();
  },

  onStoreLoad: function(store, records, successful, eOpts) {
    var vm = this.getViewModel();
    vm.set('signatureCount', store.count());
  }

});
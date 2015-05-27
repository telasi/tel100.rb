Ext.define('Tel100.view.document.motions.InPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmotionsinpanel',

  viewModel: {
    type: 'documentmotionsinpanel'
  },

  border: false,
  layout: 'fit',
  bodyBorder: false,

  bind: {
    title: '<i class="fa fa-inbox"></i> {i18n.document.motion.inMotions}'
  },

  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      xtype: 'button',
      handler: function(button, e) {
        var panel = this.up('documentmotionsinpanel');
        var grid = panel.down('documentmotionsingrid');
        grid.refresh();
      },
      bind: {
        text: '{i18n.ui.refresh}'
      }
    }]
  }],

  items: [{
    xtype: 'documentmotionsingrid'
  }],

  initComponent: function() {
    this.callParent();
    var self = this;
    var grid = this.down('documentmotionsingrid');
    var vm = grid.getViewModel();
    vm.bind('{activeMotion}', function(motion) {
      self.fireEvent('motionchanged', motion);
    });
  },

  getActiveMotion: function() {
    var grid = this.down('documentmotionsingrid');
    return grid.getActiveMotion();
  }
});

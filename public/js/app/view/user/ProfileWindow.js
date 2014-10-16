Ext.define('Telasi.view.user.ProfileWindow', {
  extend: 'Ext.window.Window',
  alias : 'widget.profileWindow',
  modal: true,
  resizable: false,

  requires: [
    'Telasi.view.user.HRInfo',
    'Telasi.view.user.Editor',
  ],

  title: 'თქვენი პროფილი',
  width: 500,

  items: [{
    xtype: 'tabpanel',
    items: [{
      title: 'HR',
      items: { xtype: 'profileHRInfo' }
    }, {
      title: 'პერსონალური',
      items: { xtype: 'userEditor' }
    }]
  }]
});

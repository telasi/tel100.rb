Ext.define('Telasi.view.user.ProfileWindow', {
  extend: 'Ext.window.Window',
  alias : 'widget.profileWindow',
  modal: true,
  resizable: false,
  border: false,

  requires: [
    'Telasi.view.user.HRInfo',
    'Telasi.view.user.Editor',
    'Telasi.view.user.ChangePassword',
  ],

  title: 'თქვენი პროფილი',
  width: 500,

  items: [{
    xtype: 'tabpanel',
    border: false,
    items: [{
      title: '<i class="fa fa-bank"></i> თანამშრომელი',
      items: { xtype: 'profileHRInfo' },
      border: false,
    }, {
      title: '<i class="fa fa-user"></i> სისტემური',
      items: { xtype: 'userEditor' },
      border: false,
    }, {
      title: '<i class="fa fa-lock"></i> პაროლის შეცვლა',
      items: { xtype: 'changePassword' },
      border: false,
    }]
  }]
});

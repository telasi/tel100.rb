Ext.define('Telasi.view.user.ProfileWindow', {
  extend: 'Ext.window.Window',
  alias : 'widget.profileWindow',
  modal: true,
  resizable: false,

  requires: [
    'Telasi.view.user.HRInfo',
    'Telasi.view.user.Editor',
    'Telasi.view.user.ChangePassword',
  ],

  title: 'თქვენი პროფილი',
  width: 500,

  items: [{
    xtype: 'tabpanel',
    items: [{
      title: '<i class="fa fa-bank"></i> თანამშრომელი',
      items: { xtype: 'profileHRInfo' }
    }, {
      title: '<i class="fa fa-user"></i> სისტემური',
      items: { xtype: 'userEditor' }
    }, {
      title: '<i class="fa fa-lock"></i> პაროლის შეცვლა',
      items: { xtype: 'changePassword' }
    }]
  }]
});

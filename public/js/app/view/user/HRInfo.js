Ext.define('Telasi.view.user.HRInfo', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.profileHRInfo',
  padding: 10,

  items: [{
    xtype: 'displayfield',
    bind: '<strong>{currentUser.employee.personNumber}</strong>',
    fieldLabel: 'თანამშრ.#',
  }, {
    xtype: 'displayfield',
    bind: '{currentUser.employee.organization.name}',
    fieldLabel: 'თანამდებობა',
  }, {
    xtype: 'displayfield',
    bind: '{currentUser.employee.fullName}',
    fieldLabel: 'სახელი,გვარი',
  }],
});

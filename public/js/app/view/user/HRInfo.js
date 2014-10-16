Ext.define('Telasi.view.user.HRInfo', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.profileHRInfo',
  padding: 10,

  items: [{
    xtype: 'displayfield',
    bind: '<strong>{user.employee.personNumber}</strong>',
    fieldLabel: 'თანამშრ.#',
  }, {
    xtype: 'displayfield',
    bind: '{user.employee.organization.name}',
    fieldLabel: 'თანამდებობა',
  }, {
    xtype: 'displayfield',
    bind: '{user.employee.fullName}',
    fieldLabel: 'სახელი,გვარი',
  }],
});

Ext.define('Telasi.view.common.Header', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.appheader',
  cls: 'application-header',
  requires: [
    'Telasi.view.user.Box',
    'Telasi.view.common.Title'
  ],

  layout: 'hbox',
  items: [{
    xtype: 'apptitle',
    flex: 2
  }, {
    xtype: 'userbox',
  }]
});

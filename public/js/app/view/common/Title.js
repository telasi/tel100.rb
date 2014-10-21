Ext.define('Telasi.view.common.Title', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.apptitle',
  cls: 'application-title',
  border: false,

  items: [{
    xtype: 'label',
    html: '<i class="fa fa-send-o"></i> tel100',
    flex: 2
  }]
});

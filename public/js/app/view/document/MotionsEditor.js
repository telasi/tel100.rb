Ext.define('Telasi.view.document.MotionsEditor', {
  extend: 'Ext.form.Panel',
  xtype: 'documentMotionsEditor',
  border: false,
  tools: [{
    type: 'gear',
    handler: 'onEditMotions'
  }],
  html: 'motionsEditor'
});

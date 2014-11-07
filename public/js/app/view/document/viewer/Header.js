Ext.define('Telasi.view.document.viewer.Header', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-header',
  layout: 'border',

  layout: 'form',

  fieldDefaults: {
    labelAlign: 'right',
    labelWidth: 100,
    msgTarget: 'side',
    cls: 'text-muted',
  },

  items:[
    { xtype: 'displayfield', fieldLabel: 'თემა', bind: '{doc.subject}', cls: 'text-muted',},
    // { xtype: 'displayfield', fieldLabel: 'ავტორები', bind: '{doc.author_user.full_name}'},
    { xtype: 'displayfield', fieldLabel: 'გამგზავნი', bind: '{doc.sender_user.full_name}'},
    { xtype: 'displayfield', fieldLabel: 'მფლობელი', bind: '{doc.owner_user.full_name}'},
  ],
});
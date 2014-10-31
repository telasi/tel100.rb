Ext.define('Telasi.view.document.viewer.Header', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-header',
  layout: 'border',

  layout: 'form',

  fieldDefaults: {
    labelAlign: 'right',
    labelWidth: 100,
    msgTarget: 'side'
  },

  items:[
    { xtype: 'displayfield', fieldLabel: 'თემა', bind: '{doc.subject}'},
    { xtype: 'displayfield', fieldLabel: 'ავტორები', bind: '{doc.author_fullname}'},
    { xtype: 'displayfield', fieldLabel: 'გამგზავნი', bind: '{doc.sender_fullname}'},
    { xtype: 'displayfield', fieldLabel: 'მფლობელი', bind: '{doc.owner_fullname}'},
    { xtype: 'displayfield', fieldLabel: 'ადრესატი', bind: '{doc.fullname}'},
  ],
});
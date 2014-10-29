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
    { xtype: 'displayfield', fieldLabel: 'თემა', bind: '{currentDocument.subject}'},
    { xtype: 'displayfield', fieldLabel: 'ავტორები', bind: '{currentDocument.author_fullname}'},
    { xtype: 'displayfield', fieldLabel: 'გამგზავნი', bind: '{currentDocument.sender_fullname}'},
    { xtype: 'displayfield', fieldLabel: 'მფლობელი', bind: '{currentDocument.owner_fullname}'},
    { xtype: 'displayfield', fieldLabel: 'ადრესატი', bind: '{currentDocument.fullname}'},
  ],
});
Ext.define('Telasi.view.document.viewer.Header', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-header',
  // layout: 'form',

  bodyPadding: 0,
  padding: 0,

  fieldDefaults: {
    labelAlign: 'right',
    labelWidth: 100,
    msgTarget: 'side',
    margin: 0,
    // labelStyle: 'padding: 0 0 0 0;',
  },

  items:[
    { xtype: 'displayfield', fieldLabel: 'თემა', bind: '{doc.subject}', fieldCls: 'text-success text-strong x-form-display-field' },
    { xtype: 'fieldset', collapsed: true }, 
    { xtype: 'displayfield', fieldLabel: 'ავტორები', bind: '{doc.authors}', renderer: window.Telasi.documentUtils.getAuthorList },
    { xtype: 'displayfield', fieldLabel: 'გამგზავნი', bind: '{doc.sender_user}', 
        renderer: function(value, metaInfo) { if (value){ return window.Telasi.hrUtils.getPerson( value ); } }
    },
    { xtype: 'displayfield', fieldLabel: 'მფლობელი', bind: '{doc.owner_user}',
        renderer: function(value, metaInfo) { if (value){ return window.Telasi.hrUtils.getPerson( value ); } }
    },
  ],
});
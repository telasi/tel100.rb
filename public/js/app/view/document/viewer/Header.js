Ext.define('Telasi.view.document.viewer.Header', {
  extend: 'Ext.form.Panel',
  xtype: 'document-viewer-header',
  layout: 'border',

  layout: 'form',

  fieldDefaults: {
    labelAlign: 'right',
    labelWidth: 100,
    msgTarget: 'side',
    fieldCls: 'text-strong x-form-display-field',
  },

  items:[
    { xtype: 'displayfield', fieldLabel: 'თემა', bind: '{doc.subject}', fieldCls: 'text-success text-strong x-form-display-field' },
    { xtype: 'displayfield', fieldLabel: 'ავტორები', bind: '{doc.authors}', 
        renderer: window.Telasi.documentUtils.getAuthorList },
    { xtype: 'displayfield', fieldLabel: 'გამგზავნი', bind: '{doc.sender_user}', 
        renderer: function(value, metaInfo) {
          if (value){ return window.Telasi.hrUtils.renderStructure( Ext.create('Ext.data.Model', value) ); }
        }
    },
    { xtype: 'displayfield', fieldLabel: 'მფლობელი', bind: '{doc.owner_user}',
        renderer: function(value, metaInfo) {
          if (value){ return window.Telasi.hrUtils.renderStructure( Ext.create('Ext.data.Model', value) ); }
        }
    },
  ],
});
Ext.define('Telasi.view.document.viewer.MotionPanel', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-motionpanel',

  requires: [
     'Telasi.view.document.viewer.MotionTree',
     'Telasi.view.document.Utils'
  ],

  layout: {
    type: 'vbox',
    align: 'stretch'
  },

  items: [
          {
            xtype: 'document-viewer-motiontree',
            flex: 1,
          },
          {
            xtype: 'form',
            itemId: 'motionDetails',
            closable: false,
            height: 150,
            fieldDefaults: {
              labelAlign: 'right',
              labelWidth: 100,
              msgTarget: 'side',
              fieldCls: 'text-strong x-form-display-field'
            },

            items: [
              { xtype: 'displayfield', fieldLabel: 'ადრესატი', name: 'name', 
                  // renderer: function(value, metaInfo) {
                  //   return window.Telasi.hrUtils.getPerson( metaInfo.record );
                  // }
              },
              { xtype: 'displayfield', fieldLabel: 'სტატუსი',   name: 'status', renderer: window.Telasi.documentUtils.getStatusText },
              { xtype: 'displayfield', fieldLabel: 'რეზოლუცია', name: 'motion_text'},
              { xtype: 'displayfield', fieldLabel: 'შედეგი',    name: 'response_text'},
              { xtype: 'displayfield', fieldLabel: 'თარიღი',    name: 'due_date', renderer: window.Telasi.documentUtils.getDate },
            ],

          }
  ],
});

Ext.define('Telasi.view.document.viewer.Detail', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-detail',
  layout: 'accordion',
  bodyPadding: 0,

  requires: [
     'Telasi.view.document.editor.General',
     'Telasi.view.document.viewer.MotionPanel',
  ],

  defaults: {
    bodyPadding: 5,
    bodyBorder: false,
    hideCollapseTool: true
  },

  items: [{
    xtype: 'document-editor-general',
    title: '<i class="fa fa-bookmark-o"></i> ძირითადი',
    autoScroll: true,
    listeners: { afterrender: function(){
      this.getForm().getFields().each(function(field){ field.setReadOnly(true) })
    }}
  },{
    xtype: 'document-viewer-motionpanel',
    title: '<i class="fa fa-random"></i> დოკუმენტის მოძრაობა',
    bodyPadding: 0,
  }],
});

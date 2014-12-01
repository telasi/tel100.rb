Ext.define('Telasi.view.document.viewer.Detail', {
  extend: 'Ext.panel.Panel',
  layout: 'accordion',
  xtype: 'document-viewer-detail',
  bodyPadding: 0,

  requires: [
     'Telasi.view.document.editor.General',
     'Telasi.view.document.motions.Tree',
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
    xtype: 'document-motiontree',
    title: '<i class="fa fa-random"></i> დოკუმენტის მოძრაობა',
    bodyPadding: 0,
  }],
});

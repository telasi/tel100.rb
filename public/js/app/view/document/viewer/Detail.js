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
  }, {
    xtype: 'panel',
    title: '<i class="fa fa-edit"></i> ხელმომწერები',
    padding: 0,
    bodyPadding: 0
  }, {
    xtype: 'panel',
    title: '<i class="fa fa-send-o"></i> ადრესატები',
    bodyPadding: 0
  }, {
    xtype: 'document-motiontree',
    title: '<i class="fa fa-car"></i> დოკუმენტის მოძრაობა',
    bodyPadding: 0
  }],
});

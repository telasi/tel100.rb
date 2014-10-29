Ext.define('Telasi.view.document.viewer.Detail', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-detail',
  layout: 'accordion',
  bodyPadding: 0,

  requires: [
     'Telasi.view.document.viewer.MotionTree',
  ],

  items: [{
      xtype: 'document-viewer-motiontree',
      title: '<i class="fa fa-random"></i> დოკუმენტის მოძრაობა',
  }]
});

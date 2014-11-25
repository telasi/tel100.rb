Ext.define('Telasi.view.document.viewer.ViewerController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.viewerController',

  requires: [
    'Telasi.view.document.comment.CommentDialog'
  ],

  control: {
    'document-viewer-motiontree': {
      itemclick: function(tree, record, item, index, e, eOpts) {
        var motionDetailPanel = tree.up('document-viewer-viewer').down('#motionDetails');
        var form = motionDetailPanel.getForm().loadRecord(record);
      }
    },
  },

  onAddComment: function(button, event) {
    var view = this.getView();
    var doc = this.getViewModel().get('doc');
    var dialog = Ext.create('Telasi.view.document.comment.CommentDialog', { doc: doc });
    dialog.on('document-comment-added', function() {
      var grid = view.down('document-comments-grid');
      grid.controller.refresh();
    });
    dialog.show();
  },
});

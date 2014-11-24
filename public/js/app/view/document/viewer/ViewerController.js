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
    var dialog = Ext.create('Telasi.view.document.comment.CommentDialog');
    var doc = this.getViewModel().get('doc');
    dialog.on('document-comment-send', function(status, response_text) {
      dialog.setLoading(true);
      Ext.Ajax.request({
        url: '/api/docs/add_comment',
        method: 'POST',
        jsonData: {
          id: doc.id,
          status: status,
          response_text: response_text
        },
        success: function(response, opts) {
          var data = JSON.parse(response.responseText);
          if (data.success) {

            // TODO: fire refresh event

            dialog.setLoading(false);
          } else {
            Ext.MessageBox.show({
              title: 'შეცდომა',
              msg: data.error,
              buttons: Ext.MessageBox.OK,
              icon: Ext.window.MessageBox.ERROR
            });
          }
        },
        failure: function() {
          Ext.MessageBox.show({
            title: 'შეცდომა',
            msg: 'სერვერზე გაგზავნის შეცდომა',
            buttons: Ext.MessageBox.OK,
            icon: Ext.window.MessageBox.ERROR
          });
          dialog.setLoading(false);
        },
      });
    });
    dialog.show();
  },
});

Ext.define('Telasi.view.document.comment.CommentDialogController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.document-comment-dialog-controller',

  'onSendComment': function() {
    var dialog = this.getView();
    var doc = dialog.doc;
    dialog.setLoading(true);

    var segment = dialog.down('segmentedbutton');
    var status = segment.items.filterBy(function(x){ return x.pressed; }).getAt(0).statusId;
    var response_text = dialog.down('textarea').getRawValue();

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
        dialog.setLoading(false);
        if (data.success) {
          dialog.fireEvent('document-comment-added');
          dialog.close();
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
  }
});

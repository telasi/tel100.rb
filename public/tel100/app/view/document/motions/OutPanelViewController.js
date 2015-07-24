Ext.define('Tel100.view.document.motions.OutPanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsoutpanel',

  addReceiver: function(receiver) {
    var extType = receiver.get('ext_type');
    var document = this.getViewModel().get('document');
    var grid = this.getView().getGrid();
    var parentId = grid.getViewModel().get('parentId');
    helpers.api.document.motion.createDraft({
      params: {
        document_id: document.id,
        receiver_id: receiver.id,
        receiver_role: 'assignee',
        ordering: 1,
        parent_id: parentId,
        receiver_type: receiver.get('ext_type')
      },
      success: function(motionData) {
        var motion = Ext.create('Tel100.model.document.Motion', motionData);
        var view = this.getView();
        var grid = view.down('documentmotionsoutgrid');
        var store = grid.getStore();
        store.add(motion);
        view.fireEvent('datachanged', view, 'add', motion);
      }.bind(this),
      failure: function(error) {
        console.error(error);
      }.bind(this)
    });
  },

  addReceivers: function(receivers) {
    if (receivers) {
      for (var i = 0; i < receivers.length; i++) {
        this.addReceiver( receivers[i]);
      }
    }
  },

  onPanelBeforeDestroy: function(component, eOpts) {
    if (this.receiverDialog) {
      this.receiverDialog.destroy();
    }
  }
});

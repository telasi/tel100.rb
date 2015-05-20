Ext.define('Tel100.view.document.motions.AssigneePanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsassigneepanel',

  addReceiver: function(receiver, callback) {
    var view = this.getView();
    var grid = view.getGrid();
    var vm = this.getViewModel();
    var extType = receiver.get('ext_type');
    var document = vm.get('document');


    // XXX: do we need parent ID here?
    //
    // var parentId = grid.getViewModel().get('parentId');

    helpers.api.document.motion.createDraft({
      params: {
        document_id: document.id,
        // parent_id: parentId,
        parent_id: null,
        receiver_id: receiver.id,
        receiver_type: extType,
        receiver_role: 'assignee'
      },
      success: function(motionData) {
        var motion = Ext.create('Tel100.model.document.Motion', motionData);
        var store = grid.getStore();
        store.add(motion);
        view.fireEvent('datachanged', view, 'add', motion);
        if (callback) {
          callback(null, motion);
        }
      }.bind(this),
      failure: function(error) {
        console.error(error);
      }.bind(this)
    });
  },

  addReceivers: function(receivers) {
    var cntrl = this;
    if (receivers) {
      var tasks = [];
      for (var i = 0; i < receivers.length; i++) {
        var t = (function(receiver) {
          return function(callback) {
            cntrl.addReceiver(receiver, callback);
          }
        })(receivers[i]);
        tasks.push(t);
      }
      async.series(tasks);
    }
  },

  onBeforeRender: function(component, eOpts) {
    var view = this.getView();
    var vm = this.getViewModel();
    var onChange = function(newVal, oldVal, binding) {
      if (newVal && newVal.dirty) {
        var motion = newVal;
        var changes = motion.getChanges();
        helpers.api.document.motion.updateDraft(motion.id, {
          params: changes,
          success: function() {
            motion.commit();
            view.fireEvent('datachanged', view, 'update', motion);
            if (changes.send_type_id) {
              view.refresh();
            }
          }.bind(this),
          failure: function(message) {
            motion.reject();
            console.error(message);
          }
        });
      }
    };
    var options = { deep: true };
    vm.bind('{selection}', onChange, this, { deep: true });
  }
});

Ext.define('Tel100.view.document.motions.AssigneeModifyPanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsassigneemodifypanel',

  addTempReceiver: function(receiver, callback) {
    var view = this.getView();
    var grid = view.getGrid();
    var vm = this.getViewModel();
    var extType = receiver.get('ext_type');
    var document = vm.get('document');
    var store = vm.getStore('motions');

    motionData = {
      status: 0,
      receiver: receiver.data,
      send_type_id: 11,
      motion_text: null,
      due_date: null,
      temp: true
    };

    var motion = Ext.create('Tel100.model.document.Motion', motionData);
    store.add(motion);
    if (callback) {
      callback(null, motion);
    }
  },

  addTempReceivers: function(receivers) {
    var cntrl = this;
    if (receivers) {
      var tasks = [];
      for (var i = 0; i < receivers.length; i++) {
        var t = (function(receiver) {
          return function(callback) {
            cntrl.addTempReceiver(receiver, callback);
          }
        })(receivers[i]);
        tasks.push(t);
      }
      async.series(tasks);
    }
  },

  onBeforeRender: function(component, eOpts) {
    // var view = this.getView();
    // var vm = this.getViewModel();
    // var onChange = function(newVal, oldVal, binding) {
    //   if (newVal && newVal.dirty) {
    //     var motion = newVal;
    //     var changes = motion.getChanges();
    //     helpers.api.document.motion.updateDraft(motion.id, {
    //       params: changes,
    //       success: function() {
    //         motion.commit();
    //         view.fireEvent('datachanged', view, 'update', motion);
    //         if (changes.send_type_id) {
    //           view.refresh();
    //         }
    //       }.bind(this),
    //       failure: function(message) {
    //         motion.reject();
    //         console.error(message);
    //       }
    //     });
    //   }
    // };
    // var options = { deep: true };
    // vm.bind('{selection}', onChange, this, { deep: true });
  }

});

Ext.define('Tel100.view.document.motions.AuthorModifyPanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsauthormodifypanel',

  addTempReceiver: function(receiver, callback) {
    var view = this.getView();
    var grid = view.getGrid();
    var vm = this.getViewModel();
    var extType = receiver.get('ext_type');
    var document = vm.get('document');
    var store = vm.getStore('motions');
    var responseTypeStore = vm.getStore('responseTypes');
    var send_type_id = responseTypeStore.min('id');

    motionData = {
      status: 0,
      receiver: receiver.data,
      send_type_id: send_type_id,
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

});

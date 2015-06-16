Ext.define('Tel100.view.document.motions.SigneeModifyPanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionssigneemodifypanel',

  addTempReceiver: function(receiver, callback) {
    var view = this.getView();
    var grid = view.getGrid();
    var vm = this.getViewModel();
    var extType = receiver.get('ext_type');
    var document = vm.get('document');
    var store = vm.getStore('motions');

    var max = 0;
    store.each(function(record){ max = record.get('ordering'); });
    max++;

    motionData = {
      status: 1,
      ordering: max,
      receiver: receiver.data,
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
    var vm = this.getViewModel();
    var onChange = function(newVal, oldVal, binding) {
       if (newVal && newVal.dirty) {
         var motion = newVal;
         var changes = motion.getChanges();
         // only when ordering is changed
         if(changes.ordering){
            var vm = this.getViewModel();
            var st = vm.getStore('motions');
            // reject if ordering less or equal motion with CURRENT status
            for(i=0;i<st.data.length; i++){
              var item = st.data.items[i];
              if( newVal.id == item.id ){ continue; };
              if( (newVal.get('ordering') <= item.get('ordering')) && ( [2, 3, -3].indexOf(item.get('status')) > 0 ) ){
                   motion.reject();
                   return;
                };
            };
         }
        motion.commit();
       }
    };
    var options = { deep: true };
    vm.bind('{selection}', onChange, this, { deep: true });
  }
});

Ext.define('Tel100.view.document.motions.AssigneeAddDialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsassigneeadddialog',

  addReceivers: function(receivers) {
    var cntrl = this;
    if (receivers) {
      var tasks = [];
      for (var i = 0; i < receivers.length; i++) {
        var t = (function(receiver) {
          return function(callback) {
            cntrl.addReceiver(receiver, callback);
          };
        })(receivers[i]);
        tasks.push(t);
      }
      async.series(tasks);
    }
  },

  addReceiver: function(receiver, callback) {
    var view = this.getView();
    var vm = this.getViewModel();
    var extType = receiver.get('ext_type');
    var document = vm.get('document');
    var parentId = vm.get('parentId');
    var grid = view.down('#grid-out');

    helpers.api.document.motion.createDraft({
      params: {
        document_id: document.id,
        parent_id: parentId,
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

  showOutMotionsContextMenu: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    if (record && record.get('status') === helpers.document.status.DRAFT) {
      var ctrl = this;
      var panel = ctrl.getView();
      var gridMenu = Ext.create('Ext.menu.Menu', {
        items: [{
          text: i18n.document.motion.actions.delete_assignee,
          icon: '/images/delete.png',
          handler: function() {
            var vm = ctrl.getViewModel();
            var grid = panel.down('#grid-out');
            helpers.api.document.motion.deleteDraft(record.id, {
              success: function() {
                grid.getStore().remove(record);
                panel.fireEvent('datachanged', panel, 'delete');
              }
            });
          }
        }]
      });
      e.stopEvent();
      gridMenu.showAt(e.getXY());
    }
  },

  onEdit: function(editor, context, eOpts) {
    var motion = context.record;
    if (motion && motion.dirty) {
      var view = this.getView();
      var changes = motion.getChanges();
      helpers.api.document.motion.updateDraft(motion.id, {
        params: changes,
        success: function() {
          motion.commit();
          view.fireEvent('datachanged', view, 'update', motion);
          if(changes.send_type_id) { view.refreshOutgrid(); }
        }.bind(this),
        failure: function(message) {
          motion.reject();
          console.error(message);
        }
      });
    }
  },

  onStoreLoad: function(store, records, successful, eOpts) {
    var vm = this.getViewModel();
    vm.set('selection', records[0]);
  }
});

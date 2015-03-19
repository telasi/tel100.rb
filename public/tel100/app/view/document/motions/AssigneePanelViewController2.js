/*
 * File: app/view/document/motions/AssigneePanelViewController2.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Tel100.view.document.motions.AssigneePanelViewController2', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsauthorpanel',

  addReceiver: function(receiver) {
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
        receiver_role: 'author'
      },
      success: function(motionData) {
        var motion = Ext.create('Tel100.model.document.Motion', motionData);
        var store = grid.getStore();
        store.add(motion);
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

/*
 * File: app/view/document/motions/OutPanelViewController.js
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

Ext.define('Tel100.view.document.motions.OutPanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsoutpanel',

  requires: [
    'Tel100.view.party.Selector'
  ],

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

    // selection change
    var onChange = function(newVal, oldVal, binding) {
      if (newVal) {
        this.getView().fireEvent('motionchange', newVal);
      }
    };
    var options = { deep: true };
    vm.bind('{selection}', onChange, this, options);

    // selector dialog initalization
    if (!this.receiverDialog) {
      this.receiverDialog = Ext.create('Tel100.view.party.Selector', {
        title: i18n.document.motion.selectReceiver
      });

      this.receiverDialog.on('selectioncomplete', function(receivers) {
        if (receivers.length > 0) {
          for (var i = 0; i < receivers.length; i++) {
            this.addReceiver(receivers[i]);
          }
        }
      }.bind(this));
    }
  },

  onPanelMotionChange: function(motion) {
    if (motion.dirty) {
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
  },

  onPanelBeforeDestroy: function(component, eOpts) {
    if (this.receiverDialog) {
      this.receiverDialog.destroy();
    }
  }

});

/*
 * File: app/view/document/motions/OutPanelViewController.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
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
    helpers.api.document.motion.createDraft({
      params: {
        document_id: document.id,
        receiver_id: receiver.id,
        receiver_type: receiver.get('ext_type')
      },
      success: function(motionData) {
        var motion = Ext.create('Tel100.model.document.Motion', motionData);
        var view = this.getView();
        var grid = view.down('documentmotionsoutgrid');
        var store = grid.getStore();
        store.add(motion);
      }.bind(this)
    });
  },

  onAddReceiver: function(tool, e, owner, eOpts) {
    var receiverDialog = Ext.create('Tel100.view.party.Selector', {
      title: i18n.document.motion.selectReceiver
    });
    receiverDialog.show();
    receiverDialog.on('selectioncomplete', function(receivers) {
      if (receivers.length > 0) {
        for (var i = 0; i < receivers.length; i++) {
          this.addReceiver(receivers[i]);
        }
      }
    }.bind(this));
  }

});

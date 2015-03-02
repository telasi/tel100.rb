/*
 * File: app/view/hr/vacation/WindowViewController.js
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

Ext.define('Tel100.view.hr.vacation.WindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.hrvacationwindow',

  onSelectSubstitude: function(button, e, eOpts) {
    var receiverDialog = Ext.create('Tel100.view.party.Selector', {
      title: i18n.document.motion.selectReceiver
    });
    receiverDialog.show();
    receiverDialog.on('selectioncomplete', function(receivers) {
      if (receivers.length > 0) {
        var substituder = receivers[0];
        this.getView().down('form').getForm().findField('substitude').setValue(substituder.id);
        this.getView().down('form').getForm().findField('substitude_name').setValue(substituder.data.full_name);
      }
    }.bind(this));
  },

  onOKButtonClick: function(button, e, eOpts) {
    var form = button.up('form').getForm();
    if(form.isValid()) {
      form.submit({
        success: function(form,action) {
          button.up('window').close();
          //we have to close the window here!!
        },
        failure: function(form,action){
          Ext.MessageBox.alert('Error',action.result.message);
        }});
      } else {
        Ext.Msg.alert('Invalid Data', 'Please correct form errors.');
      }
  },

  onCancelButtonClick: function(button, e, eOpts) {
    button.up('window').close();
  }

});

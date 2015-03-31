/*
 * File: app/view/hr/party/GridViewController.js
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

Ext.define('Tel100.view.hr.party.GridViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.hrpartygrid',

  onButtonClick1: function(button, e, eOpts) {
    var form = this.getView().down('form');
    var params = form.getValues();
    this.getStore('party').getProxy().setExtraParams(params);

    //this.getStore('customer').load({ params: form.getValues() });
    var st = this.getStore('party');
    st.removeAll();
    st.currentPage = 1;
    this.getStore('party').load();
  },

  onButtonClick: function(button, e, eOpts) {
    var newDialog = Ext.create('Tel100.view.hr.party.Add', {
      title: i18n.document.motion.selectReceiver
    });
    newDialog.show();
  }

});
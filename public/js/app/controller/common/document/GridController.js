Ext.define('Telasi.controller.common.document.GridController', {
     extend: 'Ext.app.ViewController',
     alias: 'controller.documentgrid',

     init: function() {
       this.lookupReference('pagingtoolbar')
          .setStore(this.getStore('documents'));
     }
});
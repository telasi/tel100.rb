/*
 * File: app/view/document/editor/EditorViewController.js
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

Ext.define('Tel100.view.document.editor.EditorViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditoreditor',

  onInMotionChanged: function(motion) {
    var view = this.getView();
    var outPanel = view.down('documentmotionsoutpanel');
    if (!motion || motion.get('type') === 'document') {
      outPanel.setParentId(null);
    } else {
      outPanel.setParentId(motion.id);
    }
    outPanel.refresh();
  },

  onDestroy: function(component, eOpts) {
    if (component.commentsDialog) {
      component.commentsDialog.destroy();
    }
  }

});

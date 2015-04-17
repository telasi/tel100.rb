/*
 * File: app/view/document/motions/MotionQuickViewViewModel.js
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

Ext.define('Tel100.view.document.motions.MotionQuickViewViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsmotionquickview',

  requires: [
    'Ext.app.bind.Formula'
  ],

  data: 'motion: null',

  formulas: {
    sender: function(get) {
      var type = get('motion.type');
      var status = get('motion.status');
      if (type === 'motion') {
        var senderName = get('motion.sender');
        var sendType = get('motion.send_type');
        var receivedAt = get('motion.received_at');
        return [
        '<strong>' + senderName + '</strong>, ',
        '<span class="text-muted">' + sendType + '</span> ',
        '<span class="text-danger">' + receivedAt + '</span>'
        ].join('');
      } else {
        var doc = get('document');
        var status = doc.get('status');
        var senderName = doc.get('sender_name');
        var docnumber = doc.get('docnumber');
        var decor = helpers.document.status.statusDecoration(status);
        var sentAt = doc.get('sent_at_f');
        return [
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        '#<strong>' + docnumber + '</strong> ',
        senderName + ' ',
        '<span class="text-danger">' + (sentAt || '') + '</span>',
        '</span>'
        ].join('');
      }
    },
    receiver: function(get) {
      var type = get('motion.type');
      var status = get('motion.status');
      if (type === 'motion') {
        var decor = helpers.document.status.statusDecoration(status);
        var receiverName = get('motion.receiver');
        var responseType = get('motion.response_type');
        var completedAt = get('motion.completed_at');
        return [
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        '<strong>' + receiverName + '</strong>',
        ( completedAt ? ', <span class="text-muted">' + responseType + '</span> ' : ''),
        '<span class="text-danger">' + (completedAt || '') + '</span>',
        '</span>'
        ].join('');
      } else {
        return '';
      }
    }
  }

});
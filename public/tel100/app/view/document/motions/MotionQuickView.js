Ext.define('Tel100.view.document.motions.MotionQuickView', {
  extend: 'Ext.container.Container',
  alias: 'widget.documentmotionsmotionquickview',

  viewModel: {
    type: 'documentmotionsmotionquickview'
  },

  autoScroll: true,
  bind: {
    html: '{html}'
  },

  getMotion: function() {
    this.getViewModel().get('motion');
  },

  setMotion: function(motion) {
    this.getViewModel().set('motion', motion);
  }
});

Ext.define('Tel100.view.document.motions.MotionQuickViewViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsmotionquickview'
});

Ext.define('Tel100.view.document.motions.MotionQuickViewViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsmotionquickview',

  requires: [
    'Ext.app.bind.Formula'
  ],

  data: {
    motion: null
  },

  formulas: {
    html: function(get) {
      // sender name and text
      var motion = get('motion');

      var sender = get('motion.sender');
      var senderName;
      if (sender.name) {
        senderName = sender.name;
      } else {
        senderName = sender;
      }
      var senderText = '<strong>' + senderName + '</strong> &rarr;';

      // send type and text
      var sendType = get('motion.send_type') || get('motion.send_type_name');
      var sendText = get('motion.motion_text');
      var sendingStatus = '';
      if (sendType && sendType !== '--') { sendingStatus = sendType; }
      if (sendText) { sendingStatus += ' <span class="text-muted">' + sendText + '</span>'; }
      if (sendingStatus !== '') { sendingStatus += ' &rarr;'; }

      // receive date
      var receivedAt = get('motion.received_at');
      if (typeof receivedAt === 'object') {
        receivedAt = Ext.Date.format(receivedAt, 'd/m/Y G:i A');
      }
      var receivedAtText = receivedAt ? '<span class="text-danger">' + receivedAt + '</span> &rarr;' : '';

      // 
      var status = get('motion.status');
      var decor = helpers.document.status.statusDecoration(status);
      var receiver = get('motion.receiver');
      var receiverName;
      if (receiver.name) {
        receiverName = receiver.name;
      } else {
        receiverName = receiver;
      }
      var receiverText = '<span class="' + decor.style + '">' +
          '<i class="fa ' + decor.icon + '"></i> ' +
          '<strong>' + receiverName + '</strong>';

      // response text
      var responseType = get('motion.response_type') || get('motion.resp_type_name');
      var responseText = get('motion.response_text');
      var responseStatus = '';
      if (responseType && responseType !== '--') { responseStatus = responseType; }
      if (responseText) { responseStatus += ' <span class="text-muted">' + responseText + '</span>'; }

      // complete date
      var completedAt = get('motion.completed_at');
      if (typeof completedAt === 'object') {
        completedAt = Ext.Date.format(completedAt, 'd/m/Y G:i A');
      }
      var completedAtText = completedAt ? '&rarr; <span class="text-danger">' + completedAt + '</span>' : '';

      return [
        '<p style="padding:8px;margin:0;">',
        senderText, sendingStatus,
        receivedAtText, receiverText,
        responseStatus, completedAtText,
        '</p>'
      ].join(' ');
    }
  }
});

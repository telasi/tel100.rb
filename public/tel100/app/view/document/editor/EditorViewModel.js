Ext.define('Tel100.view.document.editor.EditorViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documenteditoreditor',

  data: {
    document: null,
    printParams: {
      subject: false,
      signature: false,
      assignees: false,
      author: false
    }
  },

  formulas: {
    hideEditButton: function(get){
      return !get('document.is_editable');
    },

    hideSignButton: function(get) {
      return get('document.as_signee') !== 1;
    },

    hideAuthorButton: function(get) {
      return get('document.as_author') !== 1;
    },

    hideHistoryButton: function(get) {
      return !get('document.has_history');
    },

    authors: function(get) {
      var authors = get('document.authors');
      var text = [];
      if (authors.length) {
        for(var i = 0; i < authors.length; i++) {
          var author = authors[i];
          var decor = helpers.document.status.statusDecoration(author.status);
          text.push([
          '<span class="' + decor.style + '">',
          '<i class="fa ' + decor.icon + '"></i> ',
          '<a data-id="' + author.author_id + '" data-class="' + author.author_type + '">' + author.name + '</a>',
          ( author.response ? ' &mdash; ' + author.response : '' ),
          '</span>'
          ].join(''));
        }
        return text.join('; ');
      } else {
        var status = get('document.status');
        var decor = helpers.document.status.statusDecoration(status);
        var senderName = get('document.sender_name');
        var senderId = get('document.sender_id');
        var senderType = get('document.sender_type');
        return [
        //     '<strong class="text-success">' + i18n.document.base.sender + '</strong> &mdash; ',
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        '<a data-id="' + senderId + '" data-class="' + senderType + '">' + senderName + '</a>',
        '</span>'
        ].join('');
      }
    },

    hideSignees: function(get) {
      var signees = get('document.signees');
      return !signees || signees.length === 0;
    },

    signees: function(get) {
      var signees = get('document.signees');
      var text = [];
      for(var i = 0; i < signees.length; i++) {
        var signee = signees[i];
        var decor = helpers.document.status.statusDecoration(signee.status);
        text.push([
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        '<a data-id="' + signee.signee_id + '" data-class="' + signee.signee_type + '">' + signee.name + '</a>',
        ( signee.response ? ' &mdash; ' + signee.response : '' ),
        '</span> ',
        ( signee.completed_at ? '<span class="text-danger">' + signee.completed_at + '</span>' : '' )
        ].join(''));
      }
      return text.join('; ');
    },

    docinfo: function(get) {
      var docnumber = get('document.docnumber');
      var typeName = get('document.type.name');
      var status = get('document.status');
      var decor = helpers.document.status.statusDecoration(status);

      var actualSender = get('document.actual_sender');
      var senderName = get('document.sender_name');
      var senderId = get('document.sender_id');
      var senderUserId = get('document.sender_user_id');
      var senderType = get('document.sender_type');
      var sentAt = get('document.sent_at_f');
      var senderText = '<strong><a data-id="' + senderId + '" data-class="' + senderType + '">' + senderName + '</a></strong>';
      if (actualSender && senderUserId !== actualSender.id) {
        senderText += ' (' + '<strong><a data-id="' + actualSender.id + '" data-class="Sys::User">' + actualSender.name + '</a>)';
      }

      return [
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        '<strong>' + docnumber + '</strong>',
        '</span> ',
        '<span class="text-muted">' + typeName + '</span> &mdash; ',
        senderText + ', ',
        '<span class="text-danger">' + sentAt + '</span>'
      ].join('');
    },

    incoming: function(get) {
      var incoming = get('document.incoming');
      var text = [];
      incoming.forEach(function(motion) {
        text.push(helpers.document.renderer.renderMotion(motion, { as: 'sender' }));
      });
      return text.join('; ');
    },

    hideIncoming: function(get) {
      return !get('document.incoming').length;
    },

    outgoing: function(get) {
      var outgoing = get('document.outgoing');
      var text = [];
      outgoing.forEach(function(motion) {
        text.push(helpers.document.renderer.renderMotion(motion, { as: 'receiver' }));
      });
      return text.join('; ');
    },

    hideOutgoing: function(get) {
      return !get('document.outgoing').length;
    }
  }
});

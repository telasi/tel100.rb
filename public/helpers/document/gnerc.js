var GNERC_STATUS_INITIAL = 0;
var GNERC_STATUS_SENDING = 1;
var GNERC_STATUS_SENT = 2;
var GNERC_STATUS_ANSWERED_SENDING = 3;
var GNERC_STATUS_ANSWERED_SENT = 4;
var GNERC_STATUS_ERROR = -1;

var formatGnercStatus = function(status, opts) {

  var text = [];
  var textId, iconId, styleId;

  if(status === GNERC_STATUS_INITIAL){
    textId = 'initial';
    iconId = 'fa-circle-o';
    styleId = 'label-info';
  } else if (status === GNERC_STATUS_SENDING) {
    textId = 'ready';
    iconId = 'fa-truck';
    styleId = 'label-warning';
  } else if (status === GNERC_STATUS_SENT) {
    textId = 'sent';
    iconId = 'fa-check';
    styleId = 'label-success';
  } else if (status === GNERC_STATUS_ANSWERED_SENDING) {
    textId = 'answered_ready';
    iconId = 'fa-truck-moving';
    styleId = 'label-warning';
  } else if (status === GNERC_STATUS_ANSWERED_SENT) {
    textId = 'answered';
    iconId = 'fa-check-double';
    styleId = 'label-success';
  } else if (status === GNERC_STATUS_ERROR) {
    textId = 'error';
    iconId = 'fa-circle-o';
    styleId = 'label-danger';
  };

  text.push([
        '<span class="label ' + styleId + '">',
        '<i class="fa ' + iconId + '"></i> ', i18n.document.base.gnerc_statuses[textId],
        '</span>'
      ].join(''));

  return text;
};

module.exports = {
  formatGnercStatus: formatGnercStatus
};
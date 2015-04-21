var motionDialog;

var getPropertiesDialog = function(motion) {

  // create party listener if not created yet
  if (!motionDialog) {
    motionDialog = Ext.create('Tel100.view.document.motions.Properties', {
      closeAction: 'hide',
      modal: true
    });
  }

  motionDialog.setMotion(motion);

  // return dialog to the user
  return motionDialog;
};

/**
 * This function is used for decorating receivers in document grid.
 */
var formatReceivers = function(data, metaData) {
    var text = [];
    var tooltip = [];
    var stats = [];
    var countCurrent = 0;
    var countCompleted = 0;
    var countCanceled = 0;

    for(var i = 0; i < data.length; i++) {
      var person = data[i];
      var status = person.status;
      tooltip.push(person.name);
      if(i < 2){
        var decor = helpers.document.status.statusDecoration(status);
        text.push([
          '<span class="' + decor.style + '">',
          '<i class="fa ' + decor.icon + '"></i> ',
          person.name,
          '</span>'
        ].join(''));
      } else {
        if (status === helpers.document.status.CURRENT) {
          countCurrent += 1;
        } else if (status === helpers.document.status.COMPLETED) {
          countCompleted += 1;
        } else {
          countCanceled += 1;
        }
      }
    }

    metaData.tdAttr = 'data-qtip="' + tooltip.join('; ') + '"';

    if (countCurrent) { stats.push('<span class="label label-info"><i class="fa fa-clock-o"></i> ' + countCurrent + '</span>'); }
    if (countCompleted) { stats.push('<span class="label label-success"><i class="fa fa-tick"></i> ' + countCompleted + '</span>'); }
    if (countCanceled) { stats.push('<span class="label label-danger"><i class="fa fa-times"></i> ' + countCanceled + '</span>'); }

    if (countCurrent + countCanceled + countCompleted) {
      text.push('კიდევ: ' + stats.join(' '));
    }

    return text.join('<br>');
  }


module.exports = {
  getPropertiesDialog: getPropertiesDialog,
  formatReceivers: formatReceivers
};

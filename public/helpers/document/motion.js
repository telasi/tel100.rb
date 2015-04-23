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
  var countOthers = 0;

  for(var i = 0; i < data.length; i++) {
    var person = data[i];
    var status = person.status;
    var tooltipitem = person.name;
    if(person.position){ tooltipitem = [tooltipitem, ' (' , person.position.trim(), ')'].join('')};
    tooltip.push(tooltipitem);
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
      } else if (status === helpers.document.status.CANCELED) {
        countCanceled += 1;
      } else {
        countOthers += 1;
      }
    }
  }

  metaData.tdAttr = 'data-qtip="' + tooltip.join('; ') + '"';

  if (countCurrent) stats.push('<span class="label label-info"><i class="fa fa-clock-o"></i> ' + countCurrent + '</span>');
  if (countCompleted) stats.push('<span class="label label-success"><i class="fa fa-check"></i> ' + countCompleted + '</span>');
  if (countCanceled) stats.push('<span class="label label-danger"><i class="fa fa-times"></i> ' + countCanceled + '</span>');
  if (countOthers) stats.push('<span class="label label-warning"><i class="fa fa-circle-o"></i> ' + countOthers + '</span>');

  if (countCurrent + countCanceled + countCompleted + countOthers) {
    text.push('კიდევ: ' + stats.join(' '));
  }

  return text.join('<br>');
};

var formatResponses = function(data, metaData) {
  var text = [];
  var tooltip = [];
  var stats = [];
  var count = 0;
  var datetext = '';

  for(var i = 0; i < data.length; i++) {
    var motion = data[i];
    var status = motion.status;
    var motion_text = motion.current_status;
    if(motion_text === '--'){continue;};
    if(motion.due_date){ 
      datetext = Ext.Date.format(Ext.Date.parse(motion.due_date, "Y-m-d\\TH:i:s.u\\Z"), "d/m/Y")
      motion_text = [motion_text, ' (', datetext, ')'].join(''); 
    };
    tooltip.push(motion_text);
    if(i < 2){
      var decor = helpers.document.status.statusDecoration(status);
      text.push([
        '<span class="' + decor.style + '">',
        '<i class="fa ' + decor.icon + '"></i> ',
        motion.current_status,
        '<br>',
        datetext,
        '</span>'
      ].join(''));
    } else {
      count++;
    }
  }

  metaData.tdAttr = 'data-qtip="' + tooltip.join('; ') + '"';

  if (count) {
    text.push('კიდევ: ' + count);
  }

  return text.join('<br>');
};

module.exports = {
  getPropertiesDialog: getPropertiesDialog,
  formatReceivers: formatReceivers,
  formatResponses: formatResponses
};

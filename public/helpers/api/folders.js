var folderDecoration = function(folderType, name){
  switch(folderType){
  	case 0: return ['<i class="fa fa-folder-open-o"></i> ', name].join('');
  	case 1: return ['<i class="fa fa-filter"></i> ', name].join('');
  }
};

module.exports = {
  folderDecoration: folderDecoration
};
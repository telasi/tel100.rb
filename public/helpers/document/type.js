var setDocumentDefaults = function(document){
	if( document.get('type_id') === 19 && document.get('original_number') == null){
      var d = new Date(Date.parse(document.get('updated_at')));
      document.set('original_number','PR-' + ("0" + d.getDate()).slice(-2) + ("0"+(d.getMonth()+1)).slice(-2) + '/');
      document.dirty = true;
    }
}

module.exports = {
  GNERC_TYPES: [13, 14, 15, 16],
  setDocumentDefaults: setDocumentDefaults
};

var Tel100 = (function() {

  var pageIsLoading;

  var openUrl = function(url) {
    if ( !pageIsLoading ) {
      window.location = url;
      pageIsLoading = true;
    }
  };

  var goBack = function() {
    if ( !pageIsLoading ) {
      window.history.back();
      pageIsLoading = true;
    }
  };

  return {
    historyBack: function(evt) {
      evt.preventDefault();
      try {
        goBack();
      } catch(e) {
        var $this = $(this);
        var url = $this && typeof $this.attr === 'function' && $this.attr('href')
        if (url) { openUrl(url); }
      }
    },

    paginateNavigation: function(evt) {
      evt.preventDefault();
      if (evt.keyCode === 37 && evt.ctrlKey) {
        var url = $('.pagination .prev a').attr('href');
        if (url) { openUrl(url); }
      } else if (evt.keyCode === 39 && evt.ctrlKey) {
        var url = $('.pagination .next a').attr('href');
        if (url) { openUrl(url); }
      }
    },
  };

})();

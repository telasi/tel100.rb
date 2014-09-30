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

    trackingSearch: function() {
      $('a[data-save-search]').click(function(evt) {
        evt.preventDefault();
        var path
          , href = $(this).attr('href')
          , origin = window.location.origin;
        if (href.indexOf(origin) === 0) { path = href.slice(window.location.origin.length); }
        else { path = href; }
        var search = window.localStorage.getItem('pathsearch:'+path);
        window.location = href + (search || '');
      });

      window.onload = function() {
        if (window.location.search) {
          window.localStorage.setItem('pathsearch:' + window.location.pathname, window.location.search);
        }
      };
    },

    openUrl: openUrl,
  };

})();

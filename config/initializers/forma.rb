# -*- encoding : utf-8 -*-

def save_search_function(object, url, opts)
  object.button_action url, opts.merge({
    html: { 'data-save-search' => true }
  })
end

module Forma
  class Viewer
    def save_search_action(url, opts); save_search_function(self, url, opts) end
  end

  class Editor
    def save_search_action(url, opts); save_search_function(self, url, opts) end
  end
end

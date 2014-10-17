# -*- encoding : utf-8 -*-
module PaginateHelper

  def paginate(collection, opts={})
    html = [ will_paginate(collection, renderer: BootstrapPagination::Rails) ]

    # if (opts[:keyboardNavigation] && collection.total_pages > 1)
    #   html << %Q{
    #     <div class="text-muted">
    #       გამოიყენეთ კომბინაცია <code>Ctrl &rarr;</code> და <code>Ctrl &larr;</code>
    #       შემდეგ და წინა გვერდზე გადასასვლელად
    #     </div>
    #     <script type="text/javascript">
    #       $(function(){
    #         $('body').keyup(Tel100.paginateNavigation);
    #       });
    #     </script>
    #   }
    # end

    html.join.html_safe
  end

end

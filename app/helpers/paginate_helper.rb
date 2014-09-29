# -*- encoding : utf-8 -*-
module PaginateHelper

  def paginate2(collection, opts={})
    html = [ will_paginate(collection, renderer: BootstrapPagination::Rails) ]
    if (opts[:keyboardNavigation])
      html << %Q{
        <div class="text-muted">
          გამოიყენეთ კომბინაცია <code>Ctrl &rarr;</code> და <code>Ctrl &larr;</code>
          შემდეგ და წინა გვერდზე გადასასვლელად
        </div>
        <script type="text/javascript">
          $(function(){
            $('body').keyup(Tel100.paginateNavigation);
          });
        </script>
      }
    end
    html.join.html_safe
  end

end

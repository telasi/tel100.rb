# -*- encoding : utf-8 -*-
class Admin::ResponseTypesController < AdminController
  def index
    @title = 'პასუხის სახეობები'
    @types = Document::ResponseType.order('ordering, id')
  end
end

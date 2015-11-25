module Reports
  class IncomingController < ApplicationController
    def report1
      d1 = Date.new(2015, 9, 7)
      d2 = Date.new(2015, 9, 8)
      @docs = Document::Base.where('docdate BETWEEN ? AND ?', d1, d2).where({
        direction: 'in', type_id: 5
      }).order(:id)
    end
  end
end

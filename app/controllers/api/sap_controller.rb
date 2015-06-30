# -*- encoding : utf-8 -*-
class Api::SapController < ApiController
  def sync
    Sap::Synchronizer.sync
  end

  def hrupdate
    date = params[:date].present? ? Date.parse(params[:date]) : DateTime.now

    updatehr(date)

    render json: { success: true }
  end

  def updatehr(date)
    Sap::Synchronizer.updatehr(date)
  end

  def job
    Sap::Synchronizer.sync
    Sap::Synchronizer.updatehr(SapSync::SapSync.sap_sync_date)
    SapSync::SapSync.increase
    render :text => "#{SapSync::SapSync.sap_sync_date}"
  end
end

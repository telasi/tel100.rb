class SapBackgroundJob
  include Sidekiq::Worker

  def perform
  	Sap::Synchronizer.sync
    Sap::Synchronizer.updatehr(DateTime.now)
  end
end
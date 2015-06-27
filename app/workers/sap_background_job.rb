class SapBackgroundJob
  include Sidekiq::Worker

  def perform
  	Api::SapController.sync
    Api::SapController.updatehr(DateTime.now)
  end
end
class FileMoveWorker
  include Sidekiq::Worker

  def perform(folder, act)
  	if act == 'archive'
  		archived = 0
  	else 
  		archived = 1
  	end
  	Document::File.where("folder = :month and archived = :archived", month: folder, archived: archived).map{ |f| f.send(act) }
  end
end
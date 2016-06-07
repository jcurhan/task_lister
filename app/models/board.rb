class Board < ActiveRecord::Base
  has_many :lists
  has_many :tasks, through: :lists
  validates :name, presence: true

  def self.find_boards_by_search(search_hash)
    self.where("name LIKE ?", "%#{search_hash['search']}%")
  end

  def self.average_lists_per_active_board
    boards_with_lists = self.select {|board| board.lists.count > 0}
    "%.2f" % (boards_with_lists.inject(0) {|sum, board| sum + board.lists.count} / boards_with_lists.size)
  end
end
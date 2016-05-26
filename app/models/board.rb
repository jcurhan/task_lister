class Board < ActiveRecord::Base
  has_many :lists
  has_many :tasks, through: :lists
  validates :name, presence: true

  def self.find_boards_by_search(search_hash)
    self.where("name LIKE ?", "%#{search_hash['search']}%")
  end
end

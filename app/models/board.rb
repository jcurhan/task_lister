class Board < ActiveRecord::Base
  has_many :lists
  has_many :tasks, through: :lists
  validates :name, presence: true
end

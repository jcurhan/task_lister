# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class List < ActiveRecord::Base
  belongs_to :board
  has_many :tasks
  validates :title, presence: true

  def persisted_tasks
    self.tasks.select(&:persisted?)
  end

  def sorted_tasks_by_priority
    low = self.persisted_tasks.select{|task| task.priority == "Low"}
    medium = self.persisted_tasks.select{|task| task.priority == "Medium"}
    high = self.persisted_tasks.select{|task| task.priority == "High"}
    high + medium + low
  end

  def self.average_tasks_per_list
    lists_with_tasks = self.select {|list| list.tasks.count > 0}
    "%.2f" % (lists_with_tasks.inject(0) {|sum, list| sum + list.tasks.count} / lists_with_tasks.size)
  end
end

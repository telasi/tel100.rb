# -*- encoding : utf-8 -*-
module Utils
  def array_to_tree(array)
    object_hash = array.index_by{ |node| node[:id] }
    object_hash[nil] = { root: true }

    object_hash.each_value do |node|
      next if node[:root]
      next if node[:parent_id] && !object_hash[ node[:parent_id] ] # throw away orphans
      children = object_hash[node[:parent_id]][:children] ||= []
      children << node
    end

    object_hash.each_value do |node|
      node[:leaf] = !node[:children].present?
    end

    tree = object_hash[ nil ]
  end
end

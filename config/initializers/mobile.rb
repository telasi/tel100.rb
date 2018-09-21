module Mobile
  def self.compact_mobile(number)
    number.scan(/[0-9]/).join('') if number
  end

  # Correct mobiles are those which are 9 digits after compaction and start with the digit '5'.
  def self.correct_mobile?(number)
    compacted = compact_mobile(number)
    (not not (compacted =~ /^[0-9]{9}$/)) and (compacted[0] == '5')
  end

end
# -*- encoding : utf-8 -*-
require 'prawn'

class Prawn::Document
  def change_font(font = 'default', size = 10)
    case font.to_s
    when 'default' then ff = 'DejaVuSans'
    when 'bold'    then ff = 'DejaVuSans-Bold'
    when 'italic'  then ff = 'DejaVuSans-Oblique'
    when 'bold-italic' then ff = 'DejaVuSans-BoldOblique'
    when 'serif'       then ff = 'DejaVuSerif'
    when 'serif-italic' then ff = 'DejaVuSerif-Italic'
    when 'serif-bold' then ff = 'DejaVuSerif-Bold'
    when 'serif-bold-italic' then ff = 'DejaVuSerif-BoldItalic'
    else ff = 'DejaVuSans'
    end
    self.font File.expand_path("#{Rails.root}/app/assets/fonts/#{ff}.ttf", __FILE__), :size => size
  end
end

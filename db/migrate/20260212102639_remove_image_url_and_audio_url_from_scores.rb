class RemoveImageUrlAndAudioUrlFromScores < ActiveRecord::Migration[8.1]
  def change
    remove_column :scores, :image_url, :string
    remove_column :scores, :audio_url, :string
  end
end

class CreateScores < ActiveRecord::Migration[7.1]
  def change
    create_table :scores do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :score_type, default: 0, null: false
      t.string :image_url, null: false
      t.string :score_url
      t.string :audio_url
      t.string :instruments
      t.string :tags

      t.timestamps
    end
    
    add_index :scores, :score_type
    add_index :scores, :created_at
  end
end

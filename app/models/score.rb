class Score < ApplicationRecord
  validates :title, presence: true, length: { minimum: 2, maximum: 200 }
  validates :description, presence: true, length: { minimum: 10, maximum: 2000 }
  validates :score_type, presence: true

  # Optional URL for score viewing
  validates :score_url, format: { with: /\Ahttps?:\/\/.+\z/, message: "must be a valid URL" }, allow_blank: true


  scope :arrangements, -> { where(score_type: 0) }
  scope :compositions, -> { where(score_type: 1) }
  scope :recent, -> { order(created_at: :desc) }

  # Methods to fetch image/audio internally
  def image_path
    "scores_preview/#{id}.png"
  end

  def audio_path
    "scores_preview/#{id}.mp3"
  end

  def original_audio_path
    "scores_original/#{id}.mp3"
  end

  def arrangement? 
    score_type == 0 
  end 
  def composition? 
    score_type == 1 
  end
end

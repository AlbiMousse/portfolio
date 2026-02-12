class ScoresController < ApplicationController
  def index
    @arrangements = Score.arrangements.recent
    @compositions = Score.compositions.recent
  end

  def show
    @score = Score.find(params[:id])
  end
end

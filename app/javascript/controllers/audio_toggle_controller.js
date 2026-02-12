import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["player", "button"]
  static values = { selectedClass: String }

  connect() {
    this.selectedClass = this.data.get("selectedClass") || "bg-white/20"
  }

    playOriginal(event) {
    const audio = event.currentTarget.closest("section").querySelector(".score-audio")
    if (!audio) return
    audio.src = audio.dataset.original
    audio.play()
    this._highlightButton(event.currentTarget)
    }

    playScore(event) {
    const audio = event.currentTarget.closest("section").querySelector(".score-audio")
    if (!audio) return
    audio.src = audio.dataset.score
    audio.play()
    this._highlightButton(event.currentTarget)
    }
  _highlightButton(selectedButton) {
    this.buttonTargets.forEach((btn) => btn.classList.remove(this.selectedClass))
    selectedButton.classList.add(this.selectedClass)
  }
}

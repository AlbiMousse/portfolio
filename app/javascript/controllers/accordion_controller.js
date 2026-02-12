// app/javascript/controllers/accordion_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content", "toggle"]

  connect() {
    this.open = this.element.dataset.open === "true"
    if (this.open) this.expand(false)
  }

  toggle() {
    this.open ? this.collapse() : this.expand()
    this.open = !this.open
  }

  expand(animate = true) {
    const content = this.contentTarget
    content.classList.remove("hidden")

    const height = content.scrollHeight
    content.style.maxHeight = animate ? "0px" : `${height}px`
    content.style.opacity = "0"

    requestAnimationFrame(() => {
      content.style.maxHeight = `${height}px`
      content.style.opacity = "1"
    })

    this.toggleTarget.classList.add("rotate-180")
  }

  collapse() {
    const content = this.contentTarget
    content.style.maxHeight = "0px"
    content.style.opacity = "0"

    this.toggleTarget.classList.remove("rotate-180")

    setTimeout(() => {
      content.classList.add("hidden")
    }, 300)
  }
}

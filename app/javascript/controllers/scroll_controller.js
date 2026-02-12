import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["navbar"]

  connect() {
    console.log("Scroll controller connected")
    if (this.hasNavbarTarget) {
      console.log("Navbar target found")
      this.element.addEventListener("scroll", () => this.onScroll())
      this.onScroll()
    } else {
      console.warn("Navbar target not found")
    }
    this.setupSVGMorphing()
  }

  onScroll() {
    const scrollTop = this.element.scrollTop
    const shouldBeGlass = scrollTop > 50

    if (shouldBeGlass) {
      this.navbarTarget.classList.add("backdrop-blur-md")
      this.navbarTarget.classList.add("bg-white/10")
      this.navbarTarget.classList.add("border")
      this.navbarTarget.classList.add("border-white/10")
      this.navbarTarget.classList.add("rounded-full")
    } else {
      this.navbarTarget.classList.remove("backdrop-blur-md")
      this.navbarTarget.classList.remove("bg-white/10")
      this.navbarTarget.classList.remove("border")
      this.navbarTarget.classList.remove("border-white/10")
      this.navbarTarget.classList.remove("rounded-full")
    }

    this.updateSVGMorphing()
  }

  setupSVGMorphing() {
    this.sections = Array.from(document.querySelectorAll("[data-animated-background-section]"))
    this.bgElement = document.querySelector("[data-controller*='animated-background']")
    if (!this.bgElement) {
      console.warn("Animated background element not found")
    }
    this.updateSVGMorphing()
  }

  updateSVGMorphing() {
    if (!this.sections || this.sections.length === 0 || !this.bgElement) return

    const scrollTop = this.element.scrollTop
    const viewportHeight = this.element.clientHeight

    let currentSectionIndex = 0
    let scrollProgress = 0

    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i]
      const nextSection = this.sections[i + 1]
      const containerRect = this.element.getBoundingClientRect()
      const sectionRect = section.getBoundingClientRect()

      const sectionTop =
        sectionRect.top - containerRect.top + scrollTop

      const start = sectionTop - viewportHeight * 0.3 + 128 + 85
      const end = sectionTop + section.offsetHeight - viewportHeight * 0.3 + 128 + 128 + 85

      console.log(`Section ${i}: start ${start.toFixed(2)}, end ${end.toFixed(2)}, scrollTop ${scrollTop.toFixed(2)}`)
      console.log(`Section ${i}: in view ${scrollTop >= start && scrollTop <= end}`)
      console.log("")
      console.log("scrollTop >= start && scrollTop <= end:", scrollTop >= start && scrollTop <= end)
      

      if (scrollTop >= start && scrollTop <= end) {
        currentSectionIndex = i
        scrollProgress = ((scrollTop - start) / (end - start))
        console.log(`Section ${i}: progress ${scrollProgress.toFixed(2)}`)
        scrollProgress = Math.max(0, Math.min(1, scrollProgress))
        break
      }
    }

    const currentSection = this.sections[currentSectionIndex]
    const nextSection = this.sections[currentSectionIndex + 1]

    this.bgElement.dispatchEvent(new CustomEvent("scroll-morph", {
      detail: {
        fromSection: currentSection.id,
        toSection: nextSection ? nextSection.id : currentSection.id,
        progress: scrollProgress
      }
    }))
  }
}

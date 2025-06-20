// Main JavaScript file
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const yearElement = document.getElementById("current-year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        e.preventDefault()
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Header scroll effect
  const header = document.getElementById("header")
  if (header) {
    // Check if we're on the homepage
    const isHomepage = window.location.pathname === "/" || window.location.pathname === "/index.html"

    if (isHomepage) {
      // Only apply scroll effect on homepage
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.remove("bg-transparent", "py-4")
          header.classList.add("bg-white/95", "backdrop-blur", "shadow-md", "py-2")
        } else {
          header.classList.add("bg-transparent", "py-4")
          header.classList.remove("bg-white/95", "backdrop-blur", "shadow-md", "py-2")
        }
      })

      // Initial check
      if (window.scrollY > 50) {
        header.classList.remove("bg-transparent", "py-4")
        header.classList.add("bg-white/95", "backdrop-blur", "shadow-md", "py-2")
      }
    } else {
      // On other pages, always show solid header
      header.classList.remove("bg-transparent", "py-4")
      header.classList.add("bg-white", "shadow-md", "py-2")
    }
  }

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const closeMenuButton = document.getElementById("close-menu")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && closeMenuButton && mobileMenu) {
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

    function openMobileMenu() {
      mobileMenu.classList.remove("translate-x-full")
      mobileMenu.classList.add("translate-x-0")
      document.body.classList.add("overflow-hidden")
    }

    function closeMobileMenu() {
      mobileMenu.classList.remove("translate-x-0")
      mobileMenu.classList.add("translate-x-full")
      document.body.classList.remove("overflow-hidden")
    }

    mobileMenuButton.addEventListener("click", openMobileMenu)
    closeMenuButton.addEventListener("click", closeMobileMenu)

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu)
    })
  }
})

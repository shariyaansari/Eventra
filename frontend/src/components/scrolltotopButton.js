import './scrolltotopButton.css';

export default function createScrollToTopButton() {
    if (document.getElementById("scrollToTopBtn")) return; // Prevent duplicates
  
    const button = document.createElement("button");
    button.id = "scrollToTopBtn";
    button.textContent = "↑";
    document.body.appendChild(button);
  
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          button.classList.add("show");
        } else {
          button.classList.remove("show");
        }
      });
  
    // Scroll to top smoothly
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
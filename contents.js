document.addEventListener("DOMContentLoaded", function() {
    const blogLink = document.querySelector("a[href='/blog']");
    const portfolioLink = document.querySelector("a[href='/portfolio']");
    const contactLink = document.querySelector("a[href='/contact']");

    const blogSection = document.getElementById("blog-section");
    const portfolioSection = document.getElementById("portfolio-section");
    const contactSection = document.getElementById("contact-section");

    function hideAllSections() {
        blogSection.classList.add("hidden");
        portfolioSection.classList.add("hidden");
        contactSection.classList.add("hidden");
    }

    blogLink.addEventListener("click", function(event) {
        event.preventDefault();
        hideAllSections();
        blogSection.classList.remove("hidden");
    });

    portfolioLink.addEventListener("click", function(event) {
        event.preventDefault();
        hideAllSections();
        portfolioSection.classList.remove("hidden");
    });

    contactLink.addEventListener("click", function(event) {
        event.preventDefault();
        hideAllSections();
        contactSection.classList.remove("hidden");
    });
});

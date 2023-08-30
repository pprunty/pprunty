// document.addEventListener("DOMContentLoaded", function() {
//     const blogLink = document.querySelector("a[href='/blog']");
//     const portfolioLink = document.querySelector("a[href='/portfolio']");
//     const contactLink = document.querySelector("a[href='/contact']");
//
//     const blogSection = document.getElementById("blog-section");
//     const portfolioSection = document.getElementById("portfolio-section");
//     const contactSection = document.getElementById("contact-section");
//
//     function hideAllSections() {
//         blogSection.classList.add("hidden");
//         portfolioSection.classList.add("hidden");
//         contactSection.classList.add("hidden");
//     }
//
//     blogLink.addEventListener("click", function(event) {
//         event.preventDefault();
//         hideAllSections();
//         blogSection.classList.remove("hidden");
//     });
//
//     portfolioLink.addEventListener("click", function(event) {
//         event.preventDefault();
//         hideAllSections();
//         portfolioSection.classList.remove("hidden");
//     });
//
//     contactLink.addEventListener("click", function(event) {
//         event.preventDefault();
//         hideAllSections();
//         contactSection.classList.remove("hidden");
//     });
// });


document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            // Load content via AJAX and update your main content area
            const url = this.getAttribute('href');
            fetch(url)
                .then(response => response.text())
                .then(html => {
                    // Extract the part you want to update
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    const newContent = doc.querySelector("div#content").innerHTML;

                    // Update the content
                    document.querySelector("div#content").innerHTML = newContent;
                });
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach((link) => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});

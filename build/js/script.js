// Get the button element
var myButton = document.getElementById("scrollToTop");

// Show the button when user scrolls down 20px from the top
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButton.style.display = "block";
        document.body.style.backgroundColor = "red"; // Debugging line

    } else {
        myButton.style.display = "none";
    }
}

// Scroll to top when button is clicked
myButton.addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

myButton.addEventListener('click', function() {
    console.log("Button clicked!"); // Debugging line
    document.body.style.backgroundColor = "red"; // Debugging line
});

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

document.addEventListener("DOMContentLoaded", function() {
    const anchors = document.querySelectorAll('a');

    anchors.forEach(anchor => {
        if (anchor.host !== window.location.host) {
            anchor.setAttribute('target', '_blank');
            // To improve security when using target="_blank"
            anchor.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.loading');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.remove('loading');
        });
    });
});

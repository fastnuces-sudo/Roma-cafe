/*
    Aroma Café - Main JavaScript
    -----------------------------
    Features:
    1. Contact form validation
    2. Menu filtering by category
    3. "Back to top" button behavior
    4. Dynamic current year in footer

    All code is kept simple and well-commented for easy explanation.
*/

document.addEventListener("DOMContentLoaded", function () {
    initCurrentYear();
    initBackToTopButton();
    initMenuFilter();
    initContactFormValidation();
});

/**
 * Sets the current year in all elements with id="current-year".
 */
function initCurrentYear() {
    var yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * Shows / hides the "Back to Top" button and scrolls to top on click.
 */
function initBackToTopButton() {
    var btn = document.getElementById("back-to-top");
    if (!btn) return;

    // Show button when user scrolls down a bit
    window.addEventListener("scroll", function () {
        if (window.scrollY > 250) {
            btn.style.display = "flex";
            btn.style.opacity = "1";
        } else {
            btn.style.opacity = "0";
            // Small timeout to hide after fade-out
            setTimeout(function () {
                if (window.scrollY <= 250) {
                    btn.style.display = "none";
                }
            }, 200);
        }
    });

    // Scroll smoothly to top when button is clicked
    btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/**
 * Menu filtering logic for menu.html.
 * Hides / shows menu items based on the selected category.
 */
function initMenuFilter() {
    var filterContainer = document.querySelector(".menu-filter");
    if (!filterContainer) return; // Only runs on menu page

    var buttons = filterContainer.querySelectorAll(".filter-btn");
    var items = document.querySelectorAll(".menu-item");

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var filter = btn.getAttribute("data-filter");

            // Update active button styling
            buttons.forEach(function (b) {
                b.classList.remove("active");
            });
            btn.classList.add("active");

            // Show / hide items based on filter
            items.forEach(function (item) {
                var category = item.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
}

/**
 * Contact form validation for contact.html.
 * Checks:
 *  - Name: not empty
 *  - Email: basic email format
 *  - Subject: not empty
 *  - Message: minimum length
 *  - Phone: simple length check (optional field)
 */
function initContactFormValidation() {
    var form = document.getElementById("contact-form");
    if (!form) return; // Only runs on contact page

    // Helper function to show an error message
    function showError(id, message) {
        var errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Helper function to clear all error messages
    function clearErrors() {
        var errorMessages = form.querySelectorAll(".error-message");
        errorMessages.forEach(function (msg) {
            msg.textContent = "";
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission

        clearErrors();

        // Get form field values
        var name = form.name.value.trim();
        var email = form.email.value.trim();
        var phone = form.phone.value.trim();
        var subject = form.subject.value.trim();
        var message = form.message.value.trim();

        var isValid = true;

        // Validate name
        if (name === "") {
            showError("error-name", "Please enter your full name.");
            isValid = false;
        }

        // Validate email with a simple regular expression
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            showError("error-email", "Please enter your email address.");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            showError("error-email", "Please enter a valid email address.");
            isValid = false;
        }

        // Phone is optional, but if filled, do a basic check
        if (phone !== "" && phone.length < 7) {
            showError("error-phone", "Please enter a valid phone number.");
            isValid = false;
        }

        // Validate subject
        if (subject === "") {
            showError("error-subject", "Please enter a subject.");
            isValid = false;
        }

        // Validate message length
        if (message === "") {
            showError("error-message", "Please enter your message.");
            isValid = false;
        } else if (message.length < 10) {
            showError(
                "error-message",
                "Your message should be at least 10 characters long."
            );
            isValid = false;
        }

        // Status element for overall feedback
        var statusElement = document.getElementById("form-status");
        if (!statusElement) return;

        if (isValid) {
            // If valid, show success message and reset form
            statusElement.textContent =
                "Thank you! Your message has been sent successfully (demo).";
            statusElement.style.color = "#27ae60";

            form.reset();
        } else {
            // If invalid, show general error message
            statusElement.textContent =
                "Please correct the highlighted errors and try again.";
            statusElement.style.color = "#c0392b";
        }
    });
}
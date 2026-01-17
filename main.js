document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle - FIXED
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", (e) => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        // FIXED: Use classList.toggle instead of setAttribute
        menuBtnIcon.classList.toggle("ri-close-line", isOpen);
        menuBtnIcon.classList.toggle("ri-menu-3-line", !isOpen);
    });

    // Close menu when clicking nav links - FIXED
    navLinks.addEventListener("click", (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove("open");
            menuBtnIcon.classList.remove("ri-close-line");
            menuBtnIcon.classList.add("ri-menu-3-line");
        }
    });

    // ScrollReveal Configuration
    const scrollRevealOption = {
        distance: "50px",
        origin: "bottom",
        duration: 1000,
    };

    // Header Animations
    ScrollReveal().reveal(".header__image img", {
        ...scrollRevealOption,
        origin: "right",
        interval: 500,
    });
    ScrollReveal().reveal(".header__content h1", {
        ...scrollRevealOption,
        delay: 1500,
    });
    ScrollReveal().reveal(".header__content .section__description", {
        ...scrollRevealOption,
        delay: 2000,
    });
    ScrollReveal().reveal(".header__content form", {
        ...scrollRevealOption,
        delay: 2500,
    });

    // About Section Animations
    ScrollReveal().reveal(".choose__image img", {
        ...scrollRevealOption,
        origin: "left",
    });
    ScrollReveal().reveal(".choose__content .section__subheader", {
        ...scrollRevealOption,
        delay: 500,
    });
    ScrollReveal().reveal(".choose__content .section__header", {
        ...scrollRevealOption,
        delay: 1000,
    });
    ScrollReveal().reveal(".choose__list li", {
        ...scrollRevealOption,
        delay: 1500,
        interval: 500,
    });

    // Explore Section Animations
    ScrollReveal().reveal(".explore__image img", {
        ...scrollRevealOption,
        origin: "right",
    });
    ScrollReveal().reveal(".explore__content .section__subheader", {
        ...scrollRevealOption,
        delay: 500,
    });
    ScrollReveal().reveal(".explore__content .section__header", {
        ...scrollRevealOption,
        delay: 1000,
    });
    ScrollReveal().reveal(".explore__content .section__description", {
        ...scrollRevealOption,
        delay: 1500,
    });
    ScrollReveal().reveal(".explore__content .explore__btn", {
        ...scrollRevealOption,
        delay: 2000,
    });
    ScrollReveal().reveal(".explore__grid div", {
        duration: 1000,
        delay: 2500,
        interval: 500,
    });

    // Client Testimonials Slider - FIXED prev logic
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    const clientCards = Array.from(document.querySelectorAll(".client__card"));

    next.addEventListener("click", () => {
        const current = clientCards.findIndex(card => card.classList.contains("active"));
        const nextIndex = (current + 1) % clientCards.length;
        clientCards[current].classList.remove("active");
        clientCards[nextIndex].classList.add("active");
    });

    prev.addEventListener("click", () => {
        // FIXED: Proper previous index calculation
        const current = clientCards.findIndex(card => card.classList.contains("active"));
        const prevIndex = current === 0 ? clientCards.length - 1 : current - 1;
        clientCards[current].classList.remove("active");
        clientCards[prevIndex].classList.add("active");
    });

    // Subscribe Section Animations
    ScrollReveal().reveal(".subscribe__container .section__header", {
        ...scrollRevealOption,
    });
    ScrollReveal().reveal(".subscribe__container .section__description", {
        ...scrollRevealOption,
        delay: 500,
    });
    ScrollReveal().reveal(".subscribe__container form", {
        ...scrollRevealOption,
        delay: 1000,
    });

    // Swiper Configuration - FIXED (remove duplicate from HTML)
    new Swiper(".popular__swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { 
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
        },
    });

    // FIXED Search/Filter Form - Logic was inverted
    const searchForm = document.querySelector("header form");
    const popularCards = document.querySelectorAll(".popular__card");

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const locationInput = searchForm.querySelector("input[name='location']").value.toLowerCase().trim();
        const priceInput = parseInt(searchForm.querySelector("input[name='price']").value.replace(/\D/g, "")) || 999999;

        popularCards.forEach(card => {
            const slide = card.closest(".swiper-slide");
            const cardLocation = card.querySelector("h4").textContent.toLowerCase();
            const cardPrice = parseInt(card.querySelector("p span").textContent.replace(/\D/g, ""));

            // FIXED: Show cards that MATCH criteria
            const matchesLocation = !locationInput || cardLocation.includes(locationInput);
            const matchesPrice = !priceInput || cardPrice <= priceInput;

            if (matchesLocation && matchesPrice) {
                slide.style.display = "";
                slide.style.opacity = "1";
            } else {
                slide.style.display = "none";
            }
        });
    });

    // Booking Tickets - ENHANCED
    document.querySelectorAll(".book-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".popular__card");
            const destination = card.querySelector("h4").textContent;
            const price = card.querySelector("p span").textContent;
            const rating = card.querySelector(".popular__rating").textContent;
            
            alert(`🎫 Booking Confirmed!\n\nDestination: ${destination}\nPrice: ${price} per person\nRating: ${rating}`);
        });
    });

    // Favorite functionality - ENHANCED
    document.querySelectorAll(".favorite").forEach(icon => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            const heartIcon = icon.querySelector("i");
            icon.classList.toggle("active");
            
            if (icon.classList.contains("active")) {
                heartIcon.classList.remove("ri-heart-line");
                heartIcon.classList.add("ri-heart-fill");
            } else {
                heartIcon.classList.remove("ri-heart-fill");
                heartIcon.classList.add("ri-heart-line");
            }
        });
    });

    // AI Suggest Button - ENHANCED
    document.getElementById("aiSuggest").addEventListener("click", () => {
        const priceInput = document.querySelector("input[name='price']");
        const price = parseInt(priceInput.value.replace(/\D/g, "")) || 0;

        let suggestion = "Goa";
        let reason = "perfect for budget travelers!";
        
        if (price > 30000) {
            suggestion = "Ladakh";
            reason = "adventure in high altitudes!";
        } else if (price > 25000) {
            suggestion = "Kerala";
            reason = "luxury backwaters experience!";
        } else if (price > 20000) {
            suggestion = "Manali";
            reason = "snowy mountain escape!";
        }

        alert(`🤖 AI Suggests: ${suggestion}\n💰 Budget: Rs. ${price.toLocaleString()}\n✨ Reason: ${reason}`);
        priceInput.value = ""; // Clear input after suggestion
    });

    // Theme Toggle Enhancement
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
        document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});

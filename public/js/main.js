document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // BURGER MENU
    // ===============================
    const burger = document.querySelector(".burger");
    const nav = document.querySelector("nav");

    if (burger) {
        burger.addEventListener("click", () => {
            nav.style.display = nav.style.display === "flex" ? "none" : "flex";
        });
    }

    // ===============================
    // MULTIPLE DROPDOWNS (INDEX PAGE)
    // ===============================
    document.querySelectorAll(".category").forEach(button => {
        button.addEventListener("click", () => {

            const targetId = button.getAttribute("data-target");
            const box = document.getElementById(targetId);

            // Close all other dropdowns
            document.querySelectorAll(".hidden-content").forEach(section => {
                if (section !== box) {
                    section.style.display = "none";
                }
            });

            // Toggle selected dropdown
            box.style.display = box.style.display === "block" ? "none" : "block";

            // Smooth scroll
            if (box.style.display === "block") {
                setTimeout(() => {
                    box.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 150);
            }
        });
    });

    // ===============================
    // POPUPS (OTHER PAGES)
    // ===============================
    document.querySelectorAll("[data-popup]").forEach(btn => {
        btn.addEventListener("click", () => {
            const popup = document.getElementById(btn.dataset.popup);
            popup.style.display = "flex";
        });
    });

    document.querySelectorAll(".close-popup").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".popup").style.display = "none";
        });
    });

});

// BURGER MENU
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector("nav");

    if (burger) {
        burger.addEventListener("click", () => {
            nav.style.display = nav.style.display === "flex" ? "none" : "flex";
        });
    }

    // CATEGORY EXPANDERS
    document.querySelectorAll(".category").forEach(cat => {
        cat.addEventListener("click", () => {
            const target = document.getElementById(cat.dataset.target);
            if (target.style.display === "block") {
                target.style.display = "none";
            } else {
                target.style.display = "block";
            }
        });
    });

    // POPUP HANDLER
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

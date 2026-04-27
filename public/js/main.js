document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector("nav");
    const infoBox = document.getElementById("info-box");

    // BURGER MENU
    if (burger) {
        burger.addEventListener("click", () => {
            nav.style.display = nav.style.display === "flex" ? "none" : "flex";
        });
    }

    // CATEGORY CLICK → LOAD CONTENT INTO ONE BOX
    document.querySelectorAll(".category").forEach(cat => {
        cat.addEventListener("click", () => {
            const targetId = cat.dataset.target;
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                infoBox.innerHTML = targetContent.innerHTML;
                infoBox.style.display = "block";
                infoBox.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // POPUPS
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

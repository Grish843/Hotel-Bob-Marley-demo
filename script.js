const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 35);
}
window.addEventListener("scroll", updateHeader);
updateHeader();

menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Reveal page sections as they enter the screen.
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});

// Open gallery photos in a full-screen viewer.
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
        const image = item.dataset.image;
        modalImage.src = image;
        modalImage.alt = item.querySelector("img").alt;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
});

function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
});
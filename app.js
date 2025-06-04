
const dark = document.getElementById("dark");

const mood = () => {

   document.body.classList.toggle("dark-theme");

   dark.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
}


dark.addEventListener("click", mood);
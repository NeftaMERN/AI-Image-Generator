const dark = document.getElementById("dark");

dark.addEventListener("click", mood = () => {

    const isDark = document.body.classList.toggle("dark-theme");

    dark.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";

});
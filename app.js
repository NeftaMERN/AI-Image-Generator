const dark = document.getElementById("dark");

(() => {

    const saveDark = localStorage.getItem("theme");

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDark = saveDark === "dark" || (!saveDark && systemDark); 

    document.body.classList.toggle("dark-theme");

    dark.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";


})() 

dark.addEventListener("click", mood = () => {

    const isDark = document.body.classList.toggle("dark-theme");

    dark.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";

});
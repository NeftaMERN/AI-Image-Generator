const dark = document.getElementById("dark");

window.addEventListener("DOMContentLoaded", () => {

    const saveDark = localStorage.getItem("theme");

    if(saveDark == "dark") {

        document.body.classList.add("dark-theme");

    }

})

dark.addEventListener("click", mood = () => {

    const isDark = document.body.classList.toggle("dark-theme");

    dark.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";

});
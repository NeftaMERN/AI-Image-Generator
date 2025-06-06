const dark = document.getElementById("dark");
const input = document.querySelector(".input");
const promobtn = document.querySelector(".promot-btn");
const form = document.querySelector(".form");
const select_model = document.getElementById("select_model");
const count_img = document.getElementById("count_img");
const count_ratio = document.getElementById("count_ratio");
const gallery_grid = document.querySelector(".gallery_grid");

const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
];

(() => {

    const saveDark = localStorage.getItem("theme");

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDark = saveDark === "dark" || (!saveDark && systemDark); 

    if( isDark ) {

        document.body.classList.add("dark-theme");

    }

    dark.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";


})() 

dark.addEventListener("click", mood = () => {

    const isDark = document.body.classList.toggle("dark-theme");

    dark.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";

    localStorage.setItem("theme", isDark ? "dark" : "light");

});

promobtn.addEventListener("click", () => {

    const promot = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];

    input.value = promot;
    input.focus();

});

const cerateImageCard = (selectModle, countIMG, countRatio, promotText) => {

    for (let i = 0; i < countIMG; i++) {

        gallery_grid.innerHTML += `<div class="img_card error loading" id = "img-card-${i}" style = "count_ratio:${countRatio}" >

                        <div class="status_container">

                            <div class="spinner">

                            </div>

                            <i class="fa-solid fa-triangle-exclamation"></i>

                            <p class="stautus_text">Generating...</p>

                        </div>

                        <img src="test.png" class="resalt_img">

                    </div>`

    }

}

const handleFormSubimt = (e) => {

    e.preventDefault();

    const selectModle = select_model.value;
    const countIMG = parseInt(count_img.value) || 1;
    const countRatio = count_ratio.value || "1/1";
    const promotText = input.value.trim();

    cerateImageCard(selectModle, countIMG, countRatio, promotText);

}

form.addEventListener("submit", handleFormSubimt);
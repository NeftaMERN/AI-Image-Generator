
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
  if (isDark) {
    document.body.classList.add("dark-theme");
  }
  dark.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();

dark.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  dark.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

promobtn.addEventListener("click", () => {
  const promot = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  input.value = promot;
  input.focus();
});

const generateImage = async (prompt) => {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: "Token YOUR_API_TOKEN_HERE",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "MODEL_VERSION_ID_HERE",
      input: { prompt }
    })
  });

  if (!response.ok) throw new Error("Initial request failed");

  const data = await response.json();
  let status = data.status;
  let outputUrl;

  while (status !== "succeeded" && status !== "failed") {
    await new Promise((r) => setTimeout(r, 1000));
    const poll = await fetch(`https://api.replicate.com/v1/predictions/${data.id}`, {
      headers: { Authorization: "Token YOUR_API_TOKEN_HERE" }
    });
    const pollData = await poll.json();
    status = pollData.status;
    if (status === "succeeded") outputUrl = pollData.output?.[0];
  }

  if (status === "failed" || !outputUrl) throw new Error("Image generation failed");

  return outputUrl;
};

const createImageCard = (id, prompt) => {
  gallery_grid.innerHTML += `
    <div class="img_card loading" id="img-card-${id}">
      <div class="status_container">
        <div class="spinner"></div>
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p class="status_text">Generating...</p>
      </div>
      <img src="" class="resalt_img" style="display:none;">
      <div class="img_daw">
        <button class="img_dawnlod_btn"><i class="fa-solid fa-download"></i></button>
      </div>
    </div>`;

  const card = document.getElementById(`img-card-${id}`);

  generateImage(prompt)
    .then((url) => {
      card.classList.remove("loading");
      const img = card.querySelector(".resalt_img");
      img.src = url;
      img.style.display = "block";
      card.querySelector(".status_text").style.display = "none";
    })
    .catch((err) => {
      console.error(err);
      card.classList.remove("loading");
      card.classList.add("error");
      card.querySelector(".status_text").textContent = "Failed to generate";
    });
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const promptText = input.value.trim();
  const countIMG = parseInt(count_img.value) || 1;
  if (!promptText) return;

  for (let i = 0; i < countIMG; i++) {
    createImageCard(i, promptText);
  }
};

form.addEventListener("submit", handleFormSubmit);

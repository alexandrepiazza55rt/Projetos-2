let searchBox = document.querySelector('#search-box');
let images = document.querySelectorAll('.container .container-image .image');
let modal = document.getElementById("myModal");
let modalContent = document.getElementById("modalContent");
let span = document.getElementsByClassName("close")[0];

async function fetchDescription(characterName) {
    try {
        const response = await fetch("descriptions.json");
        const data = await response.json();
        return data[characterName];
    } catch (error) {
        console.error("Erro ao buscar descrição:", error);
    }
}

images.forEach(image => {
    let characterName = image.querySelector("h3").innerText;
    image.setAttribute("data-character", characterName);
    image.addEventListener("click", async () => {
        let character = image.getAttribute("data-character");
        let description = await fetchDescription(character);
        let characterImage = image.querySelector("img").src;
        modalContent.innerHTML = `
          <h2>${character}</h2>
          <img src="${characterImage}" alt="${character}" />
          <p>${description || "Descrição não disponível"}</p>
        `;
        modal.style.display = "block";
    });
});

span.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

searchBox.oninput = () => {
    images.forEach(hide => hide.style.display = 'none');
    
    let value = searchBox.value.toLowerCase();

    images.forEach(filter => {
        let title = filter.getAttribute('data-title').toLowerCase();

        // Verifica se o valor está contido no atributo data-title
        if (title.includes(value)) {
            filter.style.display = "block";
        }
    });
}
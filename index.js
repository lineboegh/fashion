const endpoint = "https://kea-alt-del.dk/t7/api/categories";
const kategoriliste = document.querySelector(".kategoriliste");

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(json) {
  console.log(json);
  json.forEach((element) => {
    kategoriliste.innerHTML += `
    <a class="link" href="kategori.html?cat=${element.category}">
    <article class="kategoricard">
    <h2>${element.category}</h2>
    </article>
    </a>
      `;
  });
}

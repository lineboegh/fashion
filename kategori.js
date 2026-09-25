// TAG SEARCH PARAMETER (cat og det der kommer efter) FRA LINKET. DET ER DEFINERET FRA FORRIGE SIDE (INDEX.HTML)

const cat = new URLSearchParams(window.location.search).get("cat");
console.log(cat);

const endpoint = `https://kea-alt-del.dk/t7/api/products/?category=${cat}`;

const produktliste = document.querySelector(".produktliste");

// HENT DATA OG VIS + SKRIV INNERHTML

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(element) {
  console.log(element);
  element.forEach((element) => {
    produktliste.innerHTML += `
<a class="link" href="productdetails.html?id=${element.id}">
    <article class="card">
    <img src=https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp alt="produktbillede" />
    <h2>${element.productdisplayname}</h2>
    <h3>${element.articletype}</h3>
    <p>${element.category}</p>
    <p>${element.price} DKK</p>
    </article>
    </a>
    `;
  });
}

// TILBAGEKNAP
const tilbageknap = document.querySelector(".tilbageknap");
tilbageknap.addEventListener("click", () => history.back());

// H1 er samme som cat (kategorien)
const h1 = document.querySelector("h1");
h1.textContent = cat;

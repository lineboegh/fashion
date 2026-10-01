// TAG SEARCH PARAMETER (cat og det der kommer efter) FRA LINKET. DET ER DEFINERET FRA FORRIGE SIDE (INDEX.HTML)

const cat = new URLSearchParams(window.location.search).get("cat");
console.log(cat);

const endpoint = `https://kea-alt-del.dk/t7/api/products/?category=${cat}`;

const produktliste = document.querySelector(".produktliste");

// TILBAGEKNAP
const tilbageknap = document.querySelector(".tilbageknap");
tilbageknap.addEventListener("click", () => history.back());

// H1 er samme som cat (kategorien)
const h1 = document.querySelector("h1");
h1.textContent = cat;

// filtrering

// Vi siger at js skal lytte efter hvornår der klikkes på knapperne i .filtre-nav. Når der klikkes, skal der foretages funktionen vi har kaldt 'filtrer'
document.querySelectorAll(".filtre-nav button").forEach((button) => button.addEventListener("click", filtrer));

let alleData, udsnit;

// her definerer vi at vi skal have fat på data
// vi definerer også at alleData, udnsit og data er det samme - altså der står det samme i alle tre.
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    alleData = udsnit = data;
    visData(data);
  });

// nu definerer vi funktionen
function filtrer(e) {
  const valgt = e.target.textContent; //læs hvad der står i filter-knappen der klikkes på
  if (valgt == "Alle") {
    udsnit = alleData;
  } else {
    udsnit = alleData.filter((produkt) => produkt.gender == valgt);
  }
  visData(udsnit);
}

//definere const for span, hvor der skal vises antal af resultater
const visantal = document.querySelector(".filtre-nav span");

//funktion - det der skal vises på siden

function visData(element) {
  visantal.textContent = element.length; //her viser vi hvor mange søgeresultater, der er
  console.log(element);
  produktliste.innerHTML = "";
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

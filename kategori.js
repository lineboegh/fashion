// TAG SEARCH PARAMETER (cat og det der kommer efter) FRA LINKET. DET ER DEFINERET FRA FORRIGE SIDE (INDEX.HTML)

const cat = new URLSearchParams(window.location.search).get("cat");
console.log(cat);
const endpoint = `https://kea-alt-del.dk/t7/api/products/?category=${cat}&limit=30`;
const produktliste = document.querySelector(".produktliste");

let alleData, udsnit;

// TILBAGEKNAP
const tilbageknap = document.querySelector(".tilbageknap");
tilbageknap.addEventListener("click", () => history.back());

// Gør H1 til det samme som cat (kategorien)
const h1 = document.querySelector("h1");
h1.textContent = cat;

// ----------------------------------------------------------
// SORTERING

// Vi definerer at js skal lytte efter når vi trykker på sortering.
document.querySelectorAll(".sortering button").forEach((knap) => knap.addEventListener("click", sorter));

// Vi definerer funktionen
function sorter(event) {
  const valgt = event.target.textContent;
  console.log(valgt);
  if (valgt == "Pris lav-høj") {
    udsnit.sort((a, b) => a.price - b.price);
  } else if (valgt == "Pris høj-lav") {
    udsnit.sort((a, b) => b.price - a.price);
  } else if (valgt == "A-Z") {
    udsnit.sort((a, b) => a.productdisplayname.localeCompare(b.productdisplayname));
  } else if (valgt == "Z-A") {
    udsnit.sort((a, b) => b.productdisplayname.localeCompare(a.productdisplayname));
  }
  visData(udsnit);
}

// ----------------------------------------------------------

// FILTRERING

// Vi siger at js skal lytte efter hvornår der klikkes på knapperne i .filtre-nav. Når der klikkes, skal der foretages funktionen vi har kaldt 'filtrer'
document.querySelectorAll(".filtre-nav button").forEach((button) => button.addEventListener("click", filtrer));

// her definerer vi at vi skal have fat på data
// vi definerer også at alleData, udnsit og data er det samme - altså der står det samme i alle tre.
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    alleData = udsnit = data;
    visData(data);
  });

// nu definerer vi funktionen
function filtrer(event) {
  const valgt = event.target.textContent; //læs hvad der står i filter-knappen der klikkes på
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
    const tilbudspris = Math.round(element.price - (element.price * element.discount) / 100);
    produktliste.innerHTML += `
  
<a class="link ${element.soldout ? "udsolgt" : ""}" href="productdetails.html?id=${element.id}">
    <article class="card">
    <img src=https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp alt="produktbillede" />
    <h2>${element.productdisplayname}</h2>
    <h3>${element.articletype}</h3>
    <p>${element.category}</p>
    ${
      element.discount
        ? `<p class='tilbudslabel'>-${element.discount}%</p>
    <p><span class="førpris">Før DKK ${element.price},-</span> nu DKK ${tilbudspris},-</p>`
        : `<p>DKK ${element.price},-</p>`
    } 
    </article>
    </a>
    `;
  });
}

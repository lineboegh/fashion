const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

const produktdetaljer = document.querySelector(".produktdetaljer");
const titel = document.querySelector(".titel");
const tilbageknap = document.querySelector(".tilbageknap");

tilbageknap.addEventListener("click", () => history.back());

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(element) {
  console.log(element);
  produktdetaljer.innerHTML += `
        <article class="card">
            <img src=https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp alt="produktbillede" />
            <div>
            <h3>${element.articletype}</h3>
            <p>${element.category}</p>
            <p>${element.price} DKK</p>
            </div>
    </article>
      `;
  titel.innerHTML += `
              <h1>${element.productdisplayname}</h1>

  `;
}

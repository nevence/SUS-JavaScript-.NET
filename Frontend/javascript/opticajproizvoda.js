import { Komponente } from "./komponente.js";

let listaProizvoda = new Komponente();

// listaProizvoda.dodajProizvod1(1, "Laptop", "Elektronika", 1000);
// listaProizvoda.dodajProizvod1(2, "PC", "Elektronika", 900);
// listaProizvoda.dodajProizvod1(3, "Crevo", "Bastovanstvo", 10);
// listaProizvoda.dodajProizvod1(4, "Slavina", "Domacinstvo", 30);

document.addEventListener("DOMContentLoaded", async function (event) {
  await listaProizvoda
    .dohvatiProizvod()
    .then(() => {
      listaProizvoda.nacrtajTabeluProizvodi(
        "proizvodi-telo",
        listaProizvoda.listaProizvoda
      );
      listaProizvoda.nacrtajElementeZaSortiranje(
        "sortDiv-Proizvod",
        listaProizvoda.listaProizvoda
      );
    })
    .catch((error) => {
      console.error("Greška prilikom dohvatanja proizvoda:" + error);
      // Ovde možete dodati kod za obradu greške, ako je potrebno
    });
});

// Funkcija za dodavanje ID-ja u HREF tag linkova sa menija
document.addEventListener("DOMContentLoaded", function () {
  var meniElementi = document.querySelectorAll(".nav-link");
  var urlParams = new URLSearchParams(window.location.search);
  var skladisteId = urlParams.get("skladisteID");
  meniElementi.forEach(function (element) {
    var trenutniHref = element.getAttribute("href");
    var noviHref = trenutniHref + "?skladisteID=" + skladisteId;
    element.setAttribute("href", noviHref);
  });
});

// Funkcija dodaj novi proizvod
document
  .getElementById("dugme-dodaj")
  .addEventListener("click", function (event) {
    event.preventDefault();
    listaProizvoda.dodajProizvod();
  });

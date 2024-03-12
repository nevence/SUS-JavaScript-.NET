import { Komponente } from "./komponente.js";

let listaProizvoda = new Komponente();

// listaProizvoda.dodajSkladisteProizvod1(1, "Laptop", "Elektronika", 1000, 30);
// listaProizvoda.dodajSkladisteProizvod1(2, "PC", "Elektronika", 900, 30, 40);
// listaProizvoda.dodajSkladisteProizvod1(3, "Crevo", "Bastovanstvo", 10, 10);
// listaProizvoda.dodajSkladisteProizvod1(4, "Slavina", "Domacinstvo", 30, 100);
// listaProizvoda.dodajSkladisteProizvod1(5, "Saksija", "Bastovanstvo", 30, 100);
// listaProizvoda.dodajSkladisteProizvod1(9, "Lavabo", "Domacinstvo", 30, 100);

// listaProizvoda.dodajSkladiste1(
//   1,
//   "Novi Sad 1",
//   "A.M 2",
//   10000,
//   listaProizvoda.vratiPopunjenostSkladista()
// );
// listaProizvoda.dodajSkladiste1(2, "Smederevo", "A.M 11", 10000, 2000);
// listaProizvoda.dodajSkladiste1(3, "Nis", "A.M 10", 10000, 2000);
// listaProizvoda.dodajSkladiste1(4, "Beograd", "A.M 9", 9000, 4000);

document.addEventListener("DOMContentLoaded", async function (event) {
  await listaProizvoda
    .dohvatiSkladiste()
    .then(() => {
      listaProizvoda.popuniGrafickiPrikazSkladista(
        skladisteId,
        listaProizvoda.listaSkladista
      );
    })
    .catch((error) => {
      console.error("Greška prilikom dohvatanja skladišta:", error);
      // Ovde možete dodati kod za obradu greške, ako je potrebno
    });
});

var urlParams = new URLSearchParams(window.location.search);
var skladisteId = urlParams.get("skladisteID");

// Funkcija za dodavanje ID-ja u HREF tag linkova sa menija
document.addEventListener("DOMContentLoaded", function () {
  var meniElementi = document.querySelectorAll(".nav-link");
  meniElementi.forEach(function (element) {
    var trenutniHref = element.getAttribute("href");
    var noviHref = trenutniHref + "?skladisteID=" + skladisteId;
    element.setAttribute("href", noviHref);
  });
});

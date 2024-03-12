import { Komponente } from "./komponente.js";

let listaProizvoda = new Komponente();

var urlParams = new URLSearchParams(window.location.search);
var skladisteId = urlParams.get("skladisteID");

// listaProizvoda.dodajSkladisteProizvod1(
//   1,
//   "Laptop ajsdhkaj hkjadha jskdja j hjakj dshjk adhjkj",
//   "Elektronika",
//   1000,
//   30
// );
// listaProizvoda.dodajSkladisteProizvod1(2, "PC", "Elektronika", 900, 30, 40);
// listaProizvoda.dodajSkladisteProizvod1(3, "Crevo", "Bastovanstvo", 10, 10);
// listaProizvoda.dodajSkladisteProizvod1(4, "Slavina", "Domacinstvo", 30, 100);
// listaProizvoda.dodajSkladisteProizvod1(5, "Saksija", "Bastovanstvo", 30, 100);
// listaProizvoda.dodajSkladisteProizvod1(9, "Lavabo", "Domacinstvo", 30, 100);

document.addEventListener("DOMContentLoaded", async function (event) {
  var urlParams = new URLSearchParams(window.location.search);
  var skladisteId = urlParams.get("skladisteID");
  await listaProizvoda
    .dohvatiSkladisteProizvod(skladisteId)
    .then(() => {
      listaProizvoda.nacrtajTabeluSkladisteProizvodi(
        "skladisteproizvod-telo",
        listaProizvoda.listaSkladisteProizvod
      );
      listaProizvoda.nacrtajElementeZaSortiranje(
        "sortDiv-SkladisteProizvod",
        listaProizvoda.listaSkladisteProizvod
      );
      listaProizvoda.listaSkladisteProizvod.forEach((proizvod) => {
        const opcija = document.createElement("option");
        opcija.innerHTML = proizvod.Naziv;
        opcija.value = proizvod.ID;
        document.getElementById("odaberi-proizvod").appendChild(opcija);
      });
    })
    .catch((error) => {
      console.error("Greška prilikom dohvatanja proizvoda:" + error);
      // Ovde možete dodati kod za obradu greške, ako je potrebno
    });
});

document.addEventListener("DOMContentLoaded", async function (event) {
  try {
    await listaProizvoda.dohvatiProizvod();
    listaProizvoda.listaProizvoda.forEach((proizvod) => {
      const opcija = document.createElement("option");
      opcija.innerHTML = proizvod.Naziv;
      opcija.value = proizvod.ID;
      document.getElementById("izaberi-proizvod").appendChild(opcija);
    });
  } catch (error) {
    console.error("Greška prilikom dohvatanja proizvoda:" + error);
    // Ovde možete dodati kod za obradu greške, ako je potrebno
  }
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

// Funkcija za isporucivanje proizvoda
document
  .getElementById("dugme-isporuci")
  .addEventListener("click", function (event) {
    var urlParams = new URLSearchParams(window.location.search);
    var skladisteId = urlParams.get("skladisteID");
    event.preventDefault();
    listaProizvoda.isporuciSkladisteProizvod(skladisteId);
  });

// Funkcija za porucivanje proizvoda
document
  .getElementById("dugme-poruci")
  .addEventListener("click", function (event) {
    var urlParams = new URLSearchParams(window.location.search);
    var skladisteId = urlParams.get("skladisteID");
    event.preventDefault();
    listaProizvoda.poruciSkladisteProizvod(skladisteId);
  });

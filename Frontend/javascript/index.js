import { Komponente } from "./komponente.js";

// let listaProizvoda = new Komponente();
// listaProizvoda.dohvatiSkladiste();
// console.log(listaProizvoda.listaSkladista);
// listaProizvoda.dodajSkladiste1(1, "Novi Sad 1", "A.M 2", 10000, 1200);
// listaProizvoda.dodajSkladiste1(2, "Smederevo", "A.M 11", 10000, 2000);
// listaProizvoda.dodajSkladiste1(3, "Nis", "A.M 10", 10000, 2000);
// listaProizvoda.dodajSkladiste1(4, "Beograd", "A.M 9", 9000, 4000);
let listaProizvoda = new Komponente();

document.addEventListener("DOMContentLoaded", async function (event) {
  await listaProizvoda
    .dohvatiSkladiste()
    .then(() => {
      listaProizvoda.nacrtajTabeluSkladista("skladiste-telo");
      listaProizvoda.nacrtajElementeZaSortiranje(
        "sortDiv-Skladiste",
        listaProizvoda.listaSkladista
      );
    })
    .catch((error) => {
      console.error("Greška prilikom dohvatanja skladišta:", error);
      // Ovde možete dodati kod za obradu greške, ako je potrebno
    });
});

document
  .getElementById("dugme-dodaj-skladiste")
  .addEventListener("click", function (event) {
    event.preventDefault();
    listaProizvoda.dodajSkladiste();
  });

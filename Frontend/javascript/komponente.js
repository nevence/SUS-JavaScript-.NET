class Proizvod {
  constructor(ID, Naziv, Kategorija, Cena) {
    this.ID = ID;
    this.Naziv = Naziv;
    this.Kategorija = Kategorija;
    this.Cena = Cena;
  }
}

class SkladisteProizvod {
  constructor(ID, Naziv, Kategorija, Cena, Kolicina) {
    this.ID = ID;
    this.Naziv = Naziv;
    this.Kategorija = Kategorija;
    this.Cena = Cena;
    this.Kolicina = Kolicina;
  }
}

class Skladiste {
  constructor(ID, Naziv, Adresa, Kapacitet, Popunjeno) {
    this.ID = ID;
    this.Naziv = Naziv;
    this.Adresa = Adresa;
    this.Kapacitet = Kapacitet;
    this.Popunjeno = Popunjeno;
  }
}

export class Komponente {
  constructor() {
    this.listaProizvoda = [];
    this.listaSkladisteProizvod = [];
    this.listaSkladista = [];
  }

  // ******************* RAD SA TABELOM PROIZVOD **********************************
  // Funkcija za dodavanje proizvoda u listu (JAVASCRIPT)
  dodajProizvod1(ID, Naziv, Kategorija, Cena) {
    const proizvod = new Proizvod(ID, Naziv, Kategorija, Cena);
    this.listaProizvoda.push(proizvod);
  }

  // Funkcija za dodavanje proizvoda u listu sa servera
  async dohvatiProizvod() {
    try {
      const response = await fetch(`http://localhost:5250/api/Proizvod`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const podaci = await response.json();
      podaci.forEach((podatak) => {
        const proizvod = new Proizvod(
          podatak.id,
          podatak.naziv,
          podatak.kategorija,
          podatak.cena
        );
        this.listaProizvoda.push(proizvod);
      });
    } catch (error) {
      alert("Greska: " + error.message);
      console.error("Greska: ", error);
    }
  }

  // Funkcija za dodavanje novog proizvoda na server
  dodajProizvod() {
    const proizvod = {
      Naziv: document.getElementById("naziv-novi-proizvod").value,
      Kategorija: document.getElementById("kategorija-novi-proizvod").value,
      Cena: document.getElementById("cena-novi-proizvod").value,
    };

    fetch(`http://localhost:5250/api/Proizvod`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proizvod),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status == 400)
          throw new Error(`Neispravan unos podataka!`);
          else{
            throw new Error(`Network response was not ok ${response.status}`);
            }
        }
        return response;
      })
      .then(() => {
        alert("Uspešno kreiran proizvod");
        // this.dohvatiProizvod();
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  }

  // Funkcija za azuriranje proizvoda
  updateProizvod(proizvodId, nazivId, kategorijaId, cenaId) {
    const proizvod = {
      ID: proizvodId,
      Naziv: document.getElementById(`${nazivId}`).value,
      Kategorija: document.getElementById(`${kategorijaId}`).value,
      Cena: document.getElementById(`${cenaId}`).value,
    };

    fetch(`http://localhost:5250/api/Proizvod`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proizvod),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status == 400)
          throw new Error(`Neispravno uneti poadci!`);
          else{
            throw new Error(`Network response was not ok ${response.status}`);
            }        }
        return response;
      })
      .then((data) => {
        alert("Uspešno ažuriran proizvod", data);
        // this.dohvatiProizvod();
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  }

  // Funkcija za brisanje proizvoda
  deleteProizvod(proizvodId) {
    const proizvod = {
      ID: proizvodId,
    };

    fetch(`http://localhost:5250/api/Proizvod`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proizvod),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok`);
        }
        return response;
      })
      .then((data) => {
        alert("Uspešno obrisan proizvod", data);
        // this.dohvatiProizvod();
        window.location.reload();
      })
      .catch((error) => {
        alert("Greška prilikom brisanja proizvoda", error);
      });
  }

  // Funkcija za crtanje tabele s listom proizvoda
  nacrtajTabeluProizvodi(gde, proizvodi = this.listaProizvoda) {
    const tabelaTelo = document.getElementById(gde);
    tabelaTelo.innerHTML = ""; // Očisti telo tabele

    proizvodi.forEach((product) => {
      const red = document.createElement("tr");

      const idCelija = document.createElement("td");
      idCelija.textContent = product.ID;
      red.appendChild(idCelija);

      const nazivCelija1 = document.createElement("td");
      const nazivCelija = document.createElement("input");
      nazivCelija.type = "text";
      nazivCelija.value = product.Naziv;
      nazivCelija.className = "form-control";
      nazivCelija.id = "naziv-" + product.ID;
      nazivCelija1.appendChild(nazivCelija);
      red.appendChild(nazivCelija1);

      const kategorijaCelija1 = document.createElement("td");
      const kategorijaCelija = document.createElement("input");
      kategorijaCelija.type = "text";
      kategorijaCelija.value = product.Kategorija;
      kategorijaCelija.className = "form-control";
      kategorijaCelija.id = "kategorija-" + product.ID;
      kategorijaCelija1.appendChild(kategorijaCelija);
      red.appendChild(kategorijaCelija1);

      const cenaCelija1 = document.createElement("td");
      const cenaCelija = document.createElement("input");
      cenaCelija.className = "form-control";
      cenaCelija.type = "number";
      cenaCelija.value = product.Cena;
      cenaCelija.id = "cena-" + product.ID;
      cenaCelija1.appendChild(cenaCelija);
      red.appendChild(cenaCelija1);

      const actionsCelija = document.createElement("td");
      const updateButton = document.createElement("button");
      updateButton.className = "btn btn-warning";
      updateButton.textContent = "Ažuriraj";
      updateButton.onclick = () =>
        this.updateProizvod(
          product.ID,
          nazivCelija.id,
          kategorijaCelija.id,
          cenaCelija.id
        );
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger";
      deleteButton.textContent = "Obriši";
      deleteButton.onclick = () => this.deleteProizvod(product.ID);
      actionsCelija.appendChild(updateButton);
      actionsCelija.appendChild(deleteButton);
      red.appendChild(actionsCelija);

      tabelaTelo.appendChild(red);
    });
  }

  // **************** RAD SA TABELOM SKLADISTEPROIZVOD ****************

  // Funkcija za dodavanje proizvoda u listu SkladisteProizvod (JAVASCRIPT)
  dodajSkladisteProizvod1(ID, Naziv, Kategorija, Cena, Kolicina) {
    const proizvod = new SkladisteProizvod(
      ID,
      Naziv,
      Kategorija,
      Cena,
      Kolicina
    );
    this.listaSkladisteProizvod.push(proizvod);
  }

  // Funkcija za dodavanje proizvoda u listu SkladiseProizvod sa servera
  async dohvatiSkladisteProizvod(skladisteId) {
    try {
      console.log(skladisteId);
      const response = await fetch(
        `http://localhost:5250/api/SkladisteProizvod/${skladisteId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const podaci = await response.json();
      console.log(podaci);
      podaci.forEach((podatak) => {
        const proizvod = new SkladisteProizvod(
          podatak.proizvod.id,
          podatak.proizvod.naziv,
          podatak.proizvod.kategorija,
          podatak.proizvod.cena,
          podatak.kolicina
        );
        this.listaSkladisteProizvod.push(proizvod);
      });
    } catch (error) {
      alert("Greška: " + error.message);
      console.error("Greska: ", error);
    }
  }

  // Funkcija za dodavanje proizvoda na lageru
  poruciSkladisteProizvod(skladisteId) {
    const proizvod = {
      ProizvodID: document.getElementById("izaberi-proizvod").value,
      Kolicina: document.getElementById("kolicina-proizvod").value,
    };

    console.log(skladisteId);

    fetch(`http://localhost:5250/api/SkladisteProizvod/${skladisteId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proizvod),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status == 400)
          throw new Error(`Neispravan unos kolicine!`);
          else{
            throw new Error(`Network response was not ok ${response.status}`);
            }
        }
        return response;
      })
      .then(() => {
        alert("Uspešno poručen proizvod");
        // this.dohvatiSkladisteProizvod();
        window.location.reload();
      })
      .catch((error) => { 
        alert(error);
        console.error(error);
      });
  }

  // Funkcija za isporucivanje proizvoda (skidanje sa lagera)
  isporuciSkladisteProizvod(skladisteId) {
    const proizvod = {
      ProizvodID: document.getElementById("odaberi-proizvod").value,
      Kolicina: document.getElementById("kolicina-proizvod-isporuka").value,
    };

    fetch(`http://localhost:5250/api/SkladisteProizvod/${skladisteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proizvod),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status == 400){
          throw new Error(`Neispravan unos kolicine!`);
          }
          else {
          throw new Error(`Network response was not ok: ${response.status}`);
          }
        }
        return response;
      })
      .then(() => {
        alert("Uspešno isporucen proizvod");
        // this.dohvatiSkladisteProizvod();
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  }

  // Funkcija za brisanje proizvoda sa lagera
  deleteSkladisteProizvod(proizvodId) {
    const proizvod = {
      ID: proizvodId,
    };
    const urlParams = new URLSearchParams(window.location.search);
    const skladisteId = urlParams.get("skladisteID");
    console.log(skladisteId, proizvodId)
    fetch(`http://localhost:5250/api/SkladisteProizvod/${skladisteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proizvod),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }
        return response;
      })
      .then((data) => {
        alert("Uspešno isporučeni svi proizvodi");
        // this.dohvatiSkladisteProizvod();
        window.location.reload();
      })
      .catch((error) => {
        alert("Greška prilikom brisanja proizvoda:" + error);
        console.log(error)
      });
  }

  // Funkcija za crtanje tabele s listom proizvoda u skladistu
  nacrtajTabeluSkladisteProizvodi(
    gde,
    proizvodi = this.listaSkladisteProizvod
  ) {
    const tabelaTelo = document.getElementById(gde);
    tabelaTelo.innerHTML = ""; // Očisti telo tabele

    proizvodi.forEach((product) => {
      const red = document.createElement("tr");

      const idCelija = document.createElement("td");
      idCelija.textContent = product.ID;
      red.appendChild(idCelija);

      const nazivCelija = document.createElement("td");
      nazivCelija.textContent = product.Naziv;
      red.appendChild(nazivCelija);

      const kategorijaCelija = document.createElement("td");
      kategorijaCelija.textContent = product.Kategorija;
      red.appendChild(kategorijaCelija);

      const cenaCelija = document.createElement("td");
      cenaCelija.textContent = product.Cena;
      red.appendChild(cenaCelija);

      const kolicinaCelija = document.createElement("td");
      kolicinaCelija.textContent = product.Kolicina;
      red.appendChild(kolicinaCelija);

      const actionsCelija = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Isporuči sve";
      deleteButton.className = "btn btn-danger";
      deleteButton.onclick = () => this.deleteSkladisteProizvod(product.ID);
      actionsCelija.appendChild(deleteButton);
      red.appendChild(actionsCelija);

      tabelaTelo.appendChild(red);
    });
  }

  vratiPopunjenostSkladista(proizvodi = this.listaSkladisteProizvod) {
    var popunjenost = 0;
    proizvodi.forEach((proizvod) => {
      popunjenost = popunjenost + proizvod.Kolicina;
      console.log(proizvod.Kolicina);
    });
    return popunjenost;
  }

  // ******************* RAD SA TABELOM SKLADISTE **********************************
  // Funkcija za dodavanje skladista u listu
  dodajSkladiste1(ID, Naziv, Adresa, Kapacitet, Popunjeno) {
    const skladiste = new Skladiste(ID, Naziv, Adresa, Kapacitet, Popunjeno);
    this.listaSkladista.push(skladiste);
  }

  // Funkcija za dodavanje skladista u listu sa servera
  async dohvatiSkladiste() {
    try {
      const response = await fetch(`http://localhost:5250/api/Skladiste`);
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const podaci = await response.json();
      console.log(podaci);
      podaci.forEach((podatak) => {
        this.listaSkladista.push(
          new Skladiste(
            podatak.id,
            podatak.naziv,
            podatak.adresa,
            podatak.kapacitet,
            podatak.popunjeno
          )
        );
      });
    } catch (error) {
      throw new Error(`Greška: ${error.message}`);
    }
  }

  // Funkcija za dodavanje novog skladista na server
  dodajSkladiste() {
    const skladiste = {
      Naziv: document.getElementById("naziv-novo-skladiste").value,
      Adresa: document.getElementById("adresa-novo-skladiste").value,
      Kapacitet: document.getElementById("kapacitet-novo-skladiste").value,
      Popunjeno: 0,
    };

    fetch(`http://localhost:5250/api/Skladiste`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skladiste),
    })
      .then((response) => {
        if (!response.ok){
          if (response.status == 400) {
          throw new Error(`Uneti podaci su neispravni!`);
          }
          else{
            throw new Error(`Network response was not ok ${response.status}`);
            }
          }
        return response;
      })
      .then(() => {
        alert("Uspešno kreirano skladište");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  }

  // Funkcija za azuriranje skladista
  updateSkladiste(
    skladisteId,
    nazivCelijaId,
    adresaCelijaId,
    kapacitetCelijaId
  ) {
    const skladiste = {
      ID: skladisteId,
      Naziv: document.getElementById(`${nazivCelijaId}`).value,
      Adresa: document.getElementById(`${adresaCelijaId}`).value,
      Kapacitet: document.getElementById(`${kapacitetCelijaId}`).value,
    };

    fetch(`http://localhost:5250/api/Skladiste`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skladiste),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status == 400)
          throw new Error(`Neispravno uneti podaci!`);
          else{
            throw new Error(`Network response was not ok ${response.status}`);
            }
        }
        return response;
      })
      .then((data) => {
        alert("Uspešno ažurirano skladište:", data);
        // this.dohvatiSkladiste();
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  }

  // Funkcija za brisanje skladista
  deleteSkladiste(skladisteId) {
    const skladiste = {
      ID: skladisteId,
    };

    fetch(`http://localhost:5250/api/Skladiste`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skladiste),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok:`);
        }
        return response;
      })
      .then((data) => {
        alert("Uspešno obrisano skladište");
        // this.dohvatiSkladiste();
        window.location.reload();
      })
      .catch((error) => {
        alert("Greška prilikom brisanja skladišta: ", error);
      });
  }

  // Funkcija za crtanje tabele s listom skladista
  nacrtajTabeluSkladista(gde, skladista = this.listaSkladista) {
    const tabelaTelo = document.getElementById(gde);
    tabelaTelo.innerHTML = ""; // Očisti telo tabele

    skladista.forEach((skladiste) => {
      const red = document.createElement("tr");

      const idCelija = document.createElement("td");
      idCelija.textContent = skladiste.ID;
      red.appendChild(idCelija);

      const nazivCelija1 = document.createElement("td");
      const nazivCelija = document.createElement("input");
      nazivCelija.type = "text";
      nazivCelija.className = "form-control";
      nazivCelija.value = skladiste.Naziv;
      nazivCelija.id = "naziv-" + skladiste.ID;
      nazivCelija1.appendChild(nazivCelija);
      red.appendChild(nazivCelija1);

      const adresaCelija1 = document.createElement("td");
      const adresaCelija = document.createElement("input");
      adresaCelija.type = "text";
      adresaCelija.className = "form-control";
      adresaCelija.value = skladiste.Adresa;
      adresaCelija.id = "adresa-" + skladiste.ID;
      adresaCelija1.appendChild(adresaCelija);
      red.appendChild(adresaCelija1);

      const kapacitetCelija1 = document.createElement("td");
      const kapacitetCelija = document.createElement("input");
      kapacitetCelija.type = "number";
      kapacitetCelija.value = skladiste.Kapacitet;
      kapacitetCelija.className = "form-control";
      kapacitetCelija.id = "kapacitet-" + skladiste.ID;
      kapacitetCelija1.appendChild(kapacitetCelija);
      red.appendChild(kapacitetCelija1);

      const otvoriCelija = document.createElement("td");
      const otvoriButton = document.createElement("a");
      otvoriButton.innerHTML = "Prikaži";
      otvoriButton.className = "btn btn-primary";
      otvoriButton.href = "skladiste.html?skladisteID=" + skladiste.ID;
      otvoriCelija.appendChild(otvoriButton);
      red.appendChild(otvoriCelija);

      const actionsCelija = document.createElement("td");
      const updateButton = document.createElement("button");
      updateButton.textContent = "Ažuriraj";
      updateButton.className = "btn btn-warning"; // Dodaj Bootstrap klase
      updateButton.onclick = () =>
        this.updateSkladiste(
          skladiste.ID,
          nazivCelija.id,
          adresaCelija.id,
          kapacitetCelija.id
        );
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Obriši";
      deleteButton.className = "btn btn-danger"; // Dodaj Bootstrap klase
      deleteButton.onclick = () => this.deleteSkladiste(skladiste.ID);
      actionsCelija.appendChild(updateButton);
      actionsCelija.appendChild(deleteButton);
      red.appendChild(actionsCelija);

      tabelaTelo.appendChild(red);
    });
  }

  popuniGrafickiPrikazSkladista(skladisteID, skladista = this.listaSkladista) {
    let indeks;
    skladista.forEach((skladiste, el) => {
      if (skladiste.ID == skladisteID) {
        indeks = el;
      }
    });

    const naziv = document.getElementById("naziv-skladista");
    naziv.innerHTML = skladista[indeks].Naziv;

    const kapacitetEl = document.getElementById("kapacitet");
    const kapacitet = skladista[indeks].Kapacitet;
    kapacitetEl.innerHTML = "Kapacitet: " + kapacitet;

    const popunjenoEl = document.getElementById("popunjeno");
    const popunjeno = skladista[indeks].Popunjeno;
    popunjenoEl.innerHTML = "Popunjeno: " + popunjeno;

    const dostupnoEl = document.getElementById("dostupno");
    const dostupno = "Dostupno: " + (kapacitet - popunjeno);
    dostupnoEl.innerHTML = dostupno;

    const progressEl = document.querySelector(".progress-bar");
    progressEl.style.width = (popunjeno / kapacitet) * 100 + "%";
    if((popunjeno/kapacitet*100) < 74){
      progressEl.classList.add('bg-success');
    }
    else if((popunjeno/kapacitet*100) > 74 && (popunjeno/kapacitet*100) < 90){
      progressEl.classList.add('bg-warning');

    }
    else{
      progressEl.classList.add('bg-danger');
      

    }

    const procenatEl = document.getElementById("procenat-popunjenosti");
    procenatEl.innerHTML = ((popunjeno / kapacitet) * 100).toFixed(0) + " %";
  }

  // *********************** ZAJDENICKE FUNKCIJE SORTIRANJA ****************

  // Crtanje elemenata za sortiranje
  nacrtajElementeZaSortiranje(gde, komponenta) {
    const kontejner = document.getElementById(gde);
    const elementi = document.createElement("div");
    elementi.className = "elementi-sortiranje container"; // Dodaj Bootstrap klasu "container"
    kontejner.appendChild(elementi);

    const divPretraga = document.createElement("div");
    divPretraga.className = "pretraga-kontejner "; // Dodaj Bootstrap klasu "mb-3" za margin-bottom
    elementi.appendChild(divPretraga);

    const labelaPretraga = document.createElement("label");
    labelaPretraga.className = "form-label"; // Dodaj Bootstrap klasu "form-label"
    labelaPretraga.innerHTML = "Pretraga";
    divPretraga.appendChild(labelaPretraga);

    const pretraga = document.createElement("input");
    pretraga.id = "pretraga";
    pretraga.type = "text";
    pretraga.className = "form-control"; // Dodaj Bootstrap klasu "form-control"
    pretraga.oninput = () => this.traziProizvode(komponenta);
    divPretraga.appendChild(pretraga);

    const divSortiranje = document.createElement("div");
    divSortiranje.className = "sortiranje-kontejner"; // Dodaj Bootstrap klasu
    elementi.appendChild(divSortiranje);

    const dugmeOpadajuce = document.createElement("button");
    dugmeOpadajuce.className = "btn btn-secondary dugme-sortiraj"; // Dodaj Bootstrap klase
    dugmeOpadajuce.innerHTML = "Sortiraj Opadajuće";
    divSortiranje.appendChild(dugmeOpadajuce);
    dugmeOpadajuce.onclick = () => this.sortirajRastuce(komponenta);

    const dugmeRastuce = document.createElement("button");
    dugmeRastuce.className = "btn btn-secondary dugme-sortiraj"; // Dodaj Bootstrap klase
    dugmeRastuce.innerHTML = "Sortiraj Rastuće";
    divSortiranje.appendChild(dugmeRastuce);
    dugmeRastuce.onclick = () => this.sortirajOpadajuce(komponenta);
  }

  // Funkcije za sortiranje kolone opadajuce
  sortirajRastuce(komponenta) {
    komponenta.sort((a, b) => b.Naziv.localeCompare(a.Naziv));
    if (komponenta == this.listaProizvoda)
      this.nacrtajTabeluProizvodi("proizvodi-telo");
    else if (komponenta == this.listaSkladisteProizvod) {
      this.nacrtajTabeluSkladisteProizvodi("skladisteproizvod-telo");
    } else if (komponenta == this.listaSkladista) {
      this.nacrtajTabeluSkladista("skladiste-telo");
    }
  }

  // Funkcija sortiranje kolone rastuce
  sortirajOpadajuce(komponenta) {
    komponenta.sort((a, b) => a.Naziv.localeCompare(b.Naziv));
    if (komponenta == this.listaProizvoda)
      this.nacrtajTabeluProizvodi("proizvodi-telo");
    else if (komponenta == this.listaSkladisteProizvod) {
      this.nacrtajTabeluSkladisteProizvodi("skladisteproizvod-telo");
    } else if (komponenta == this.listaSkladista) {
      this.nacrtajTabeluSkladista("skladiste-telo");
    }
  }

  // Funkcija za pretragu proizvoda
  traziProizvode(komponenta) {
    const unos = document.getElementById("pretraga").value.toLowerCase();
    const filtriraniProizvodi = komponenta.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(unos)
      )
    );
    if (komponenta == this.listaProizvoda)
      this.nacrtajTabeluProizvodi("proizvodi-telo", filtriraniProizvodi);
    else if (komponenta == this.listaSkladisteProizvod) {
      this.nacrtajTabeluSkladisteProizvodi(
        "skladisteproizvod-telo",
        filtriraniProizvodi
      );
    } else if (komponenta == this.listaSkladista) {
      this.nacrtajTabeluSkladista("skladiste-telo", filtriraniProizvodi);
    }
  }
}

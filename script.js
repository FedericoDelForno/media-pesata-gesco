var valutazioni = document.querySelectorAll(".valutazione");
var arrv = [];

var mappa_materie = new Map();
mappa_materie.set('122', 'italiano');
mappa_materie.set('123', 'inglese');
mappa_materie.set('94', 'storia');
mappa_materie.set('86', 'matematica');
mappa_materie.set('124', 'motoria');
mappa_materie.set('130', 'sistemi');
mappa_materie.set('131', 'zucco');
mappa_materie.set('132', 'gestione');
mappa_materie.set('82', 'informatica');
mappa_materie.set('226', 'civica');

for(let i=0; i < valutazioni.length; i++) {
    let voto = valutazioni[i].dataset.valutazione;
    let peso = valutazioni[i].dataset.peso;
    let materia = valutazioni[i].dataset.materia;
    arrv.push([voto, peso, materia]);
}

var keys = mappa_materie.keys();
var mappa_medie = new Map();
var materia_attuale;
while(true) {
    materia_attuale = keys.next().value;
    if(materia_attuale === undefined) {
        break;
    }
    let pesoTot = 0;
    let votoTot = 0;
    for(let i=0; i < valutazioni.length; i++) {
        let votoAttuale = arrv[i];
        let regex = /(\d+.\d+)|\d+/;
        if(votoAttuale[2] == materia_attuale && regex.test(votoAttuale[0])) {
            //console.log("V: " + votoAttuale[0] + " P: " + votoAttuale[1] + " M: " + votoAttuale[2]);
            //calcola media
            votoTot += votoAttuale[0]*votoAttuale[1]/100;
            pesoTot = +pesoTot + +votoAttuale[1];
        }
    }
    //console.log("Vtot: " + votoTot + " Ptot: " + pesoTot);
    let media = votoTot/pesoTot*100;
    mappa_medie.set(materia_attuale, [media, pesoTot]);
    console.log( "media di "+ mappa_materie.get(materia_attuale) + ": " + media);
}


// CREA CASELLE MEDIA
var tabella = document.querySelector("#tabella-valutazioni");
var rows = tabella.rows;
for(let i = 1; i < rows.length; i++) {
    let idmat = rows[i].dataset.materia;
    let media = mappa_medie.get(idmat)[0];
    media = media.toFixed(2);
    let pesoTot = mappa_medie.get(idmat)[1];

    let classe_colore = "label-primary";
    if(media < 4) {
        classe_colore = "label-danger";
    } else if(media < 6) {
        classe_colore = "label-warning";
    } else if(media >= 6) {
        classe_colore = "label-success";
    }

    let nuova_casella_media = ' \
        <td class="valutazione text-center selected no-media" title="MEDIA" data-valutazione="' + media + '" data-peso="' + pesoTot + '" data-materia="' + idmat + '"> \
        <div> \
            <small>MEDIA</small> \
            <br> \
            <div class="label ' + classe_colore + '">' + media + '</div> \
            <br> \
            <small>(' + pesoTot + '%)</small> \
        </div> \
    </td> \
    ';

    const caselle = rows[i].querySelectorAll("td");
    console.log(caselle);
    console.log(caselle[1].outerHTML);

    caselle[1].outerHTML = nuova_casella_media + caselle[1].outerHTML;
}
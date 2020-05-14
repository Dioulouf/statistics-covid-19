// ************************************     VARIABLES    ************************************


const URL_GLOBAL = "https://covid19.mathdro.id/api"
const URL_COUNTRIES = "https://covid19.mathdro.id/api/countries"
const selectCountrieHtml = document.querySelector("#countrie")
const ulDataHtml = document.querySelector('.data-results')

// ************************************     FUNCTIONS   ************************************

function addElement(element, content, parentNode) {
    let ParentNode = document.querySelector(parentNode)
    let Element = document.createElement(element)
    Element.innerHTML = content
    ParentNode.appendChild(Element)
}

function getLastDataUpdateDate(lastUpdate) {
    return `${makeToDigits(lastUpdate.getDate())}/${makeToDigits(
      lastUpdate.getMonth() + 1
    )}/${makeToDigits(lastUpdate.getFullYear())} à ${makeToDigits(
      lastUpdate.getHours()
    )}h${makeToDigits(lastUpdate.getMinutes())}min`;
}

function makeToDigits(value) {
    return value > 9 ? value : "0" + value.toString();
}

// ************************************     AJAX    ************************************


// ************************************     Global
// req to have global data 
fetch(URL_GLOBAL).then(function (response) {
        if (response.ok) {
            response.json().then((data) => {
                console.log(`l'objet JSON du covid :`);
                console.log(data);

                let confirmed = data.confirmed.value
                let recovered = data.recovered.value
                let deaths = data.deaths.value
                const lastUpdate = new Date(data.lastUpdate);
                const niceDate = getLastDataUpdateDate(lastUpdate);

                addElement('p', `${confirmed}`, '.global-data__confirmed')
                addElement('p', `${deaths}`, '.global-data__deaths')
                addElement('p', `${recovered}`, '.global-data__discovered')
                addElement('p', `Mise à jour des données : ${niceDate}`, '.update')
            })
        } else {
            console.log("Mauvaise réponse du réseau sur l'opération fetch global.");
        }
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch global : ' + error.message);
    })




// ************************************     Countrie




// req to have data by countrie and inject this in html 
fetch(URL_COUNTRIES).then(function (response) {
        if (response.ok) {
            response.json().then((data) => {
                var countriesTableau = Object.keys(data.countries).map(function (cle) {
                    return [data.countries[cle]]
                })
                for (let countrie of countriesTableau) {
                    addElement("option", countrie[0].name, "#countrie")
                }
                // event listener on select and make fetch on this value
                selectCountrieHtml.addEventListener('change', () => {
                    // delete li if exist
                    if (ulDataHtml.hasChildNodes()) {
                        for (let index = 0; index < 5; index++) {
                            ulDataHtml.removeChild(ulDataHtml.lastChild)
                        }
                    }
                    for (let countrie of countriesTableau) {
                        if (selectCountrieHtml.value === countrie[0].name) {
                            var iso = countrie[0].iso3
                        }
                    }
                    const URL_COUNTRIES_DETAILS = `https://covid19.mathdro.id/api/countries/${iso}`

                    fetch(URL_COUNTRIES_DETAILS).then(function (response) {
                            if (response.ok) {
                                response.json().then((data) => {
                                    console.log(`l'objet JSON du covid countries details pays:`);
                                    console.log(data);

                                    let mortalityRate = ((data.deaths.value * 100) / data.confirmed.value).toFixed(2)
                                    const lastUpdate = new Date(data.lastUpdate);
                                    const niceDate = getLastDataUpdateDate(lastUpdate);

                                    addElement('li', `Contaminés : ${data.confirmed.value}`, ".data-results")
                                    addElement('li', `Morts : ${data.deaths.value}`, ".data-results")
                                    addElement('li', `Guéris : ${data.recovered.value}`, ".data-results")
                                    addElement('li', `Taux de mortalité : ${mortalityRate}%`, ".data-results")
                                    addElement('li', `Mise à jour des données : ${niceDate}`, ".data-results")
                                })
                            } else {
                                console.log('Mauvaise réponse du réseau');
                            }
                        })
                        .catch(function (error) {
                            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                        });
                }) // eventlisten END
            }) // response data END
        } else {
            console.log('Mauvaise réponse du réseau');
        }
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });




// ************************************     graphic

var dateGlobal = `3-28-2020`

console.log(dateGlobal);

fetch(`https://covid19.mathdro.id/api/daily/${dateGlobal}`).then(function (response) {
        if (response.ok) {
            response.json().then((data) => {

                var Deaths = []
                var Confirmed = []
                var Recovored = []

                for (let objet of data) {
                    Deaths.push(parseInt(objet.deaths))
                    Confirmed.push(parseInt(objet.confirmed))
                    Recovored.push(parseInt(objet.recovered))
                }
                console.log(`Graph date : ${dateGlobal}`);

                console.log(Deaths.reduce((a, b) => a + b, 0))
                // console.log(Confirmed.reduce((a, b) => a + b, 0))
                // console.log("Total recovored :", Recovored.reduce((a, b) => a + b, 0))

            })
        } else {
            console.log("Mauvaise réponse du réseau sur l'opération fetch global.");
        }
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch global : ' + error.message);
    })






// ************************************     Graphique    ************************************



var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {

        labels: ["1 Fév", "2", "3", "4", "5", "6", "7", "8", "9", "10 Fév", "11", "12", "13", "14", "15", "16", "17 ", "18", "19", "20 Fév", "21", "22", "23", "24", "25", "26", "27", "28", "29", "1 Mars", "2", "3", "4", "5", "6", "7", "8", "9", "10 Mars", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20 Mars", "21", "22", "23", "24", "25", "26", "27", "28"],
        datasets: [{
            label: 'morts',
            borderColor: '#E6776B',
            pointHoverBackgroundColor: '#E6776B',
            data: [259, 362, 426, 492, 564, 634, 719, 806, 906, 1013, 1113, 1118, 1371, 1523, 1666, 1770, 1868, 2007, 2122, 2247, 2251, 2458, 2469, 2629, 2708, 2770, 2814, 2872, 2941, 2996, 3085, 3160, 3254, 3348, 3460, 3558, 3803, 3996, 4262, 4615, 4720, 5404, 5819, 6440, 7126, 7905, 8733, 9867, 11299, 12973, 14623, 16497, 18615, 21181, 23970, 27198, 30652]
        }]
    },

    options: {

        scales: {
            xAxes: [{
                ticks: {
                    fontColor: "white"
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: "white"
                }
            }]
        },

        legend: {
            display: false
        },

        title: {
            display: true,
            position: "top",
            fontColor: "white",
            fontSize: 28,
            fontFamily: "'Lora', serif",
            text: "Evolution de la mortalité"
        },
    }
});
// ************************************     VARIABLES    ************************************


const URL_GLOBAL = "https://covid19.mathdro.id/api"
const URL_COUNTRIES = "https://covid19.mathdro.id/api/countries"
const selectCountrieHtml = document.querySelector("#countrie")
const ulDataHtml = document.querySelector('.data-results')
const ulGlobalHtml = document.querySelector('.global-data')

const europeCode = ["DE", "AT", "BE", "BG", "CY", "HR", "DK", "ES", "EE", "FI", "FR", "GR", "HU", "IE", "IT", "LV", "LT", "MT", "LU", "NL", "PL", "PT", "CZ", "RO", "GB", "SK", "SI", "SE"]
var asiaCode = ["AF", "AM", "AZ", "BH", "BD", "BT", "BN", "KH", "CN", "CY", "TL", "GE", "HK", "IN", "ID", "IR", "IQ", "IL", "JP", "JO", "KZ", "KW", "KG", "LA", "LB", "MO", "MY", "MV", "MN", "MM", "NP", "OM", "PK", "PH", "QA", "SA", "SG", "LK", "SY", "TJ", "TH", "TR", "TM", "AE", "UZ", "VN", "YE"]
var africaCode = ["DZ", "AO", "BJ", "BW", "IO", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "DJ", "EG", "GQ", "ER", "ET", "GA", "GH", "GW", "GN", "CI", "KE", "LS", "LR", "MG", "MW", "ML", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "SH", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"]
var northAmericaCode = ["AI", "AG", "AW", "BS", "BB", "BZ", "BM", "CA", "KY", "CR", "CU", "DM", "DO", "SV", "GL", "GD", "GP", "GT", "HT", "HN", "JM", "MQ", "MX", "MS", "NI", "PA", "PR", "KN", "LC", "PM", "VC", "TT", "TC"]
var southAmericaCode = ["AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PY", "PE", "SR", "UY", "VE"]
var oceaniaCode = ["AS", "AU", "CX", "CK", "PF", "GU", "KI", "MH", "NR", "NC", "NZ", "NU", "NF", "MP", "PW", "PG", "PN", "WS", "SB", "TK", "TO", "TV", "UM", "VU", "WF"]


// ************************************     FUNCTIONS   ************************************


function addOptionElement(content) {
    let option = document.createElement("option")
    option.innerHTML = content
    selectCountrieHtml.appendChild(option)
}

function addGlobalLiElement(content) {
    let li = document.createElement("li")
    li.innerHTML = content
    ulGlobalHtml.appendChild(li)
}

function addLiElement(content) {
    let li = document.createElement("li")
    li.innerHTML = content
    ulDataHtml.appendChild(li)
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

                addGlobalLiElement(`contaminés : ${confirmed}`)
                addGlobalLiElement(`morts : ${deaths}`)
                addGlobalLiElement(`guérris : ${recovered}`)
                addGlobalLiElement(`Mise à jour des données : ${niceDate}`)
            })
        } else {
            console.log("Mauvaise réponse du réseau sur l'opération fetch global.");
        }
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch global : ' + error.message);
    })

fetch(URL_COUNTRIES).then(function (response) {
        if (response.ok) {
            response.json().then((data) => {
                console.log(`l'objet JSON du covid countries:`);
                console.log(data);

                let countriesTableau = Object.keys(data.countries).map(function (cle) {
                    return [String(cle), data.countries[cle]]
                })

                let iso3Tableau = Object.keys(data.iso3).map(function (cle) {
                    return [String(cle), data.iso3[cle]];
                })

                for (let countrie of countriesTableau) {
                    for (let iso of iso3Tableau) {
                        if (countrie[1] === iso[0]) {
                            countrie.push(iso[1])
                        }
                    }
                    addOptionElement(countrie[0])
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
                        if (selectCountrieHtml.value === countrie[0]) {
                            var iso = countrie[2]
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

                                    addLiElement(`Contaminés : ${data.confirmed.value}`)
                                    addLiElement(`Morts : ${data.deaths.value}`)
                                    addLiElement(`Guéris : ${data.recovered.value}`)
                                    addLiElement(`Taux de mortalité : ${mortalityRate}%`)
                                    addLiElement(`Mise à jour des données : ${niceDate}`)

                                })
                            } else {
                                console.log('Mauvaise réponse du réseau');
                                addLiElement("Mauvaise réponse du réseau")
                            }
                        })
                        .catch(function (error) {
                            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                            addLiElement("Il y a une erreur")
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
// ************************************     VARIABLES    ************************************


const URL_GLOBAL = "https://covid19.mathdro.id/api"
const URL_COUNTRIES = "https://covid19.mathdro.id/api/countries"
const selectCountrieHtml = document.querySelector("#countrie")
const ulDataHtml = document.querySelector('.data-results')


const europeCode = ["DE", "AT", "BE", "BG", "CY", "HR", "DK", "ES", "EE", "FI", "FR", "GR", "HU", "IE", "IT", "LV", "LT", "MT", "LU", "NL", "PL", "PT", "CZ", "RO", "GB", "SK", "SI", "SE"]
const asiaCode = ["AF", "AM", "AZ", "BH", "BD", "BT", "BN", "KH", "CN", "CY", "TL", "GE", "HK", "IN", "ID", "IR", "IQ", "IL", "JP", "JO", "KZ", "KW", "KG", "LA", "LB", "MO", "MY", "MV", "MN", "MM", "NP", "OM", "PK", "PH", "QA", "SA", "SG", "LK", "SY", "TJ", "TH", "TR", "TM", "AE", "UZ", "VN", "YE"]
const africaCode = ["DZ", "AO", "BJ", "BW", "IO", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "DJ", "EG", "GQ", "ER", "ET", "GA", "GH", "GW", "GN", "CI", "KE", "LS", "LR", "MG", "MW", "ML", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "SH", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"]
const northAmericaCode = ["AI", "AG", "AW", "BS", "BB", "BZ", "BM", "CA", "KY", "CR", "CU", "DM", "DO", "SV", "GL", "GD", "GP", "GT", "HT", "HN", "JM", "MQ", "MX", "MS", "NI", "PA", "PR", "KN", "LC", "PM", "VC", "TT", "TC"]
const southAmericaCode = ["AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PY", "PE", "SR", "UY", "VE"]
const oceaniaCode = ["AS", "AU", "CX", "CK", "PF", "GU", "KI", "MH", "NR", "NC", "NZ", "NU", "NF", "MP", "PW", "PG", "PN", "WS", "SB", "TK", "TO", "TV", "UM", "VU", "WF"]


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


                addElement('li', `contaminés : ${confirmed}`, '.global-data')
                addElement('li', `morts : ${deaths}`, '.global-data')
                addElement('li', `guérris : ${recovered}`, '.global-data')
                addElement('li', `Mise à jour des données : ${niceDate}`, '.global-data')




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
                console.log(`data fetch test :`);
                console.log(data);



                let countriesTableau = Object.keys(data.countries).map(function (cle) {
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






fetch("https://covid19.mathdro.id/api/daily/3-23-2020").then(function (response) {
        if (response.ok) {
            response.json().then((data) => {
                console.log("fetch daily :");

                console.log(data);

            })
        } else {
            console.log("Mauvaise réponse du réseau sur l'opération fetch global.");
        }
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch global : ' + error.message);
    })
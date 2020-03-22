const URL_GLOBAL = "https://covid19.mathdro.id/api"
const URL_COUNTRIES = "https://covid19.mathdro.id/api/countries"



const selectCountrieHtml = document.querySelector("#countrie")



function addOptionElement(content) {
    let option = document.createElement("option")
    option.innerHTML = content
    selectCountrieHtml.appendChild(option)
}




fetch(URL_GLOBAL).then(function (response) {
        if (response.ok) {
            response.json().then((data) => {
                console.log(`l'objet JSON du covid :`);
                console.log(data);

                let confirmed = data.confirmed.value
                console.log(`total confirmé : ${confirmed}`);

                let recovered = data.recovered.value
                console.log(`total guérri : ${recovered}`);

                let deaths = data.deaths.value

                console.log(`total de mort : ${deaths}`);


            })
        } else {
            console.log("Mauvaise réponse du réseau sur l'opération fetch global.");
        }
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch global : ' + error.message);
    });








fetch(URL_COUNTRIES).then(function (response) {
        if (response.ok) {
            response.json().then((data) => {
                console.log(`l'objet JSON du covid countries:`);
                console.log(data);

                let countriesTableau = Object.keys(data.countries).map(function (cle) {
                    return [String(cle), data.countries[cle]];
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

                    for (let countrie of countriesTableau) {
                        if (selectCountrieHtml.value === countrie[0]) {
                            let iso = countrie[2]
                            const URL_COUNTRIES_DETAILS = `https://covid19.mathdro.id/api/countries/${iso}`

                            fetch(URL_COUNTRIES_DETAILS).then(function (response) {
                                    if (response.ok) {
                                        response.json().then((data) => {
                                            console.log(`l'objet JSON du covid countries details pays:`);
                                            console.log(data);

                                            let countrieConfirmed = data.confirmed.value
                                            console.log(countrieConfirmed);

                                            let countrieRecovered = data.recovered.value
                                            console.log(countrieRecovered);


                                            let countrieDeaths = data.deaths.value
                                            console.log(countrieDeaths);












                                        })
                                    } else {
                                        console.log('Mauvaise réponse du réseau');
                                    }
                                })
                                .catch(function (error) {
                                    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                                });






                        }
                    }
                })











            })
        } else {
            console.log('Mauvaise réponse du réseau');
        }
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });
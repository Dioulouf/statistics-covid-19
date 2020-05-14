// ************************************     VARIABLES    ************************************

const europeSVG = document.querySelector("#Europe")
const asieSVG = document.querySelector("#Asie")
const oceanieSVG = document.querySelector("#Oceanie")
const afriqueSVG = document.querySelector("#Afrique")
const amSudSVG = document.querySelector("#Am-sud")
const amNordSVG = document.querySelector("#Am-nord")
const continents = [europeSVG, asieSVG, oceanieSVG, afriqueSVG, amSudSVG, amNordSVG]
const containerDataContinents = document.querySelector(".container-data-continents")
const deathsDataContinent = document.querySelector(".global-data-map__deaths ")
const confirmerDataContinent = document.querySelector(".global-data-map__confirmed")
const discoveredDataContinent = document.querySelector(".global-data-map__discovered")
const continentsHoverEffect = document.querySelectorAll(".hover-effect")
const titleContinent = document.querySelector(".title-continent")
let clickBool = false
let northAmerica = "https://covid19-update-api.herokuapp.com/api/v1/world/continent/North%20America"
let southAmerica = "https://covid19-update-api.herokuapp.com/api/v1/world/continent/south%20America"
let asia = "https://covid19-update-api.herokuapp.com/api/v1/world/continent/asia"
let europe = "https://covid19-update-api.herokuapp.com/api/v1/world/continent/europe"
let africa = "https://covid19-update-api.herokuapp.com/api/v1/world/continent/africa"
let oceanie = "https://covid19-update-api.herokuapp.com/api/v1/world/continent/Australia"
let europeDeaths, europeCases, asiaDeaths, asiaCases, northAmericaDeaths, northAmericaCases, southAmericaDeaths, southAmericaCases, africaDeaths, africaCases, oceanieDeaths, oceanieCases
// Problem in the API call: The Russian country is in Europe and not in Asia. 
var russiaCases = 0
var russiaDeath = 0

// ************************************     FUNCTIONS   ************************************


function displayDataContinent(continent, time) {
    containerDataContinents.style.transform = "translateX(0)"
    setTimeout(() => {
        continent.style.transform = "translateX(0)"
    }, time);
}

function shadowDataContinent(continent, time) {
    setTimeout(() => {
        continent.style.transform = "translateX(-200%)"
    }, time);
    setTimeout(() => {
        containerDataContinents.style.transform = "translateX(-100%)"
    }, 500);
}

function shadowContinent(continent) {
    continent.style.visibility = "hidden"
}

function displayContinent(continent) {

    setTimeout(() => {
        continent.style.visibility = "visible"
    }, 500);
}

function displayTitleContinent(continent) {
    titleContinent.innerHTML = ""
    titleContinent.innerHTML = continent
    titleContinent.style.transform = "scale(1)"
}

function shadowTitleContinent() {
    titleContinent.style.transform = "scale(0)"
}


fetch("https://covid19-update-api.herokuapp.com/api/v1/world/country/Russia").then(function (response) {
        if (response.ok) {
            response.json().then((data) => {
                russiaDeath = data.countries[0].deaths
                russiaCases = data.countries[0].cases
            })
        } else {
            console.log("Mauvaise réponse du réseau sur l'opération fetch global.");
        }
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch global : ' + error.message);
    })


function getDataByContinent(continent) {
    fetch(continent).then(function (response) {
            if (response.ok) {
                response.json().then((data) => {
                    let NumberOfDeaths = 0
                    let NumberOfCases = 0
                    for (let countrie of data.countries) {
                        NumberOfDeaths = NumberOfDeaths + countrie.deaths
                        NumberOfCases = NumberOfCases + countrie.cases
                    }

                    switch (continent) {
                        case europe:
                            europeDeaths = NumberOfDeaths - russiaDeath
                            europeCases = NumberOfCases - russiaCases
                            break;

                        case asia:
                            asiaDeaths = NumberOfDeaths + russiaDeath
                            asiaCases = NumberOfCases + russiaCases
                            break;
                        case africa:
                            africaDeaths = NumberOfDeaths
                            africaCases = NumberOfCases
                            break;
                        case northAmerica:
                            northAmericaDeaths = NumberOfDeaths
                            northAmericaCases = NumberOfCases
                            break;
                        case southAmerica:
                            southAmericaDeaths = NumberOfDeaths
                            southAmericaCases = NumberOfCases
                            break;
                        case oceanie:
                            oceanieDeaths = NumberOfDeaths
                            oceanieCases = NumberOfCases
                            break;
                    }
                })
            } else {
                console.log("Mauvaise réponse du réseau sur l'opération fetch global.");
            }
        })
        .catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch global : ' + error.message);
        })
}

getDataByContinent(europe)
getDataByContinent(asia)
getDataByContinent(africa)
getDataByContinent(northAmerica)
getDataByContinent(southAmerica)
getDataByContinent(oceanie)

function removeChild() {
    let parent = document.querySelector(".global-data-map__confirmed")
    let parent2 = document.querySelector(".global-data-map__deaths")
    let child2 = document.querySelector(".global-data-map__deaths p")
    let child = document.querySelector(".global-data-map__confirmed p")
    setTimeout(() => {
        parent.removeChild(child)
        parent2.removeChild(child2)
    }, 1000);

}




// **********************************************       IHM      ***********************************



for (let continent of continents) {
    continent.addEventListener("click", () => {
        clickBool = !clickBool

        if (clickBool == true) {
            displayDataContinent(confirmerDataContinent, 100)
            displayDataContinent(deathsDataContinent, 300)

            switch (continent) {
                case europeSVG:
                    addElement("p", europeDeaths, ".global-data-map__deaths")
                    addElement("p", europeCases, ".global-data-map__confirmed")
                    displayTitleContinent("Europe")
                    europeSVG.style.transform = "scale(1.6)"
                    shadowContinent(asieSVG)
                    shadowContinent(oceanieSVG)
                    shadowContinent(afriqueSVG)
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break
                case asieSVG:
                    addElement("p", asiaDeaths, ".global-data-map__deaths")
                    addElement("p", asiaCases, ".global-data-map__confirmed")
                    displayTitleContinent("Asie")
                    shadowContinent(europeSVG)
                    asieSVG.style.transform = "scale(1.07) translateY(10%)"
                    shadowContinent(oceanieSVG)
                    shadowContinent(afriqueSVG)
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break
                case afriqueSVG:
                    addElement("p", africaDeaths, ".global-data-map__deaths")
                    addElement("p", africaCases, ".global-data-map__confirmed")
                    displayTitleContinent("Afrique")
                    shadowContinent(europeSVG)
                    shadowContinent(asieSVG)
                    shadowContinent(oceanieSVG)
                    afriqueSVG.style.transform = "scale(1.3) translatex(13%) translateY(-25%)"
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break
                case oceanieSVG:
                    addElement("p", oceanieDeaths, ".global-data-map__deaths")
                    addElement("p", oceanieCases, ".global-data-map__confirmed")
                    displayTitleContinent("Oceanie")
                    shadowContinent(europeSVG)
                    shadowContinent(asieSVG)
                    oceanieSVG.style.transform = "translateY(-30%)"
                    shadowContinent(afriqueSVG)
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break

                case amSudSVG:
                    addElement("p", southAmericaDeaths, ".global-data-map__deaths")
                    addElement("p", southAmericaCases, ".global-data-map__confirmed")
                    displayTitleContinent("Amérique du sud")
                    shadowContinent(europeSVG)
                    shadowContinent(asieSVG)
                    shadowContinent(oceanieSVG)
                    shadowContinent(afriqueSVG)
                    amSudSVG.style.transform = "scale(1.4) translateY(-42%) translateX(35%)"
                    shadowContinent(amNordSVG)
                    break
                case amNordSVG:
                    addElement("p", northAmericaDeaths, ".global-data-map__deaths")
                    addElement("p", northAmericaCases, ".global-data-map__confirmed")
                    displayTitleContinent("Amérique du Nord")
                    shadowContinent(europeSVG)
                    shadowContinent(asieSVG)
                    shadowContinent(oceanieSVG)
                    shadowContinent(afriqueSVG)
                    shadowContinent(amSudSVG)
                    amNordSVG.style.transform = "scale(1.1) translateY(13%) translateX(47%)"
                    break
            }
        } else {
            removeChild()
            shadowDataContinent(confirmerDataContinent, 10)
            shadowDataContinent(deathsDataContinent, 100)
            shadowTitleContinent()

            switch (continent) {
                case europeSVG:
                    europeSVG.style.transform = "scale(1)"
                    displayContinent(asieSVG)
                    displayContinent(oceanieSVG)
                    displayContinent(afriqueSVG)
                    displayContinent(amSudSVG)
                    displayContinent(amNordSVG)
                    break;
                case asieSVG:
                    displayContinent(europeSVG)
                    asieSVG.style.transform = "scale(1)"
                    displayContinent(oceanieSVG)
                    displayContinent(afriqueSVG)
                    displayContinent(amSudSVG)
                    displayContinent(amNordSVG)
                    break
                case afriqueSVG:
                    displayContinent(europeSVG)
                    displayContinent(asieSVG)
                    displayContinent(oceanieSVG)
                    afriqueSVG.style.transform = "scale(1)"
                    displayContinent(amSudSVG)
                    displayContinent(amNordSVG)
                    break
                case oceanieSVG:
                    displayContinent(europeSVG)
                    displayContinent(asieSVG)
                    oceanieSVG.style.transform = "scale(1)"
                    displayContinent(afriqueSVG)
                    displayContinent(amSudSVG)
                    displayContinent(amNordSVG)
                    break
                case amSudSVG:
                    displayContinent(europeSVG)
                    displayContinent(asieSVG)
                    displayContinent(oceanieSVG)
                    displayContinent(afriqueSVG)
                    amSudSVG.style.transform = "scale(1)"
                    displayContinent(amNordSVG)
                    break
                case amNordSVG:
                    displayContinent(europeSVG)
                    displayContinent(asieSVG)
                    displayContinent(oceanieSVG)
                    displayContinent(afriqueSVG)
                    displayContinent(amSudSVG)
                    amNordSVG.style.transform = "scale(1)"
                    break
            }
        }
    })
}
// ************************************     VARIABLES    ************************************

const europeSVG = document.querySelector("#Europe")
const asieSVG = document.querySelector("#Asie")
const oceanieSVG = document.querySelector("#Oceanie")
const afriqueSVG = document.querySelector("#Afrique")
const amSudSVG = document.querySelector("#Am-sud")
const amNordSVG = document.querySelector("#Am-nord")
const continents = [europeSVG, asieSVG, oceanieSVG, afriqueSVG, amSudSVG, amNordSVG]
const deathsDataContinent = document.querySelector(".global-data-map__deaths ")
const confirmerDataContinent = document.querySelector(".global-data-map__confirmed")
const discoveredDataContinent = document.querySelector(".global-data-map__discovered")
let clickBool = false

// europeSVG 
// asieSVG
// oceanieSVG
// afriqueSVG
// amSudSVG
// amNordSVG


// ************************************     FUNCTIONS   ************************************


function displayDataContinent(continent, time) {
    setTimeout(() => {
        continent.style.transform = "translateX(0)"
    }, time);
}

function shadowDataContinent(continent, time) {
    setTimeout(() => {
        continent.style.transform = "translateX(-200%)"
    }, time);
}

function shadowContinent(continent) {
    continent.style.opacity = "0"
    continent.style.visibility = "hidden"
}

function displayContinent(continent) {
    continent.style.opacity = "1"
    continent.style.visibility = "visible"
}


// **********************************************       IHM



for (let continent of continents) {
    continent.addEventListener("click", () => {
        clickBool = !clickBool

        if (clickBool == true) {

            displayDataContinent(confirmerDataContinent, 100)
            displayDataContinent(deathsDataContinent, 300)
            displayDataContinent(discoveredDataContinent, 500)

            switch (continent) {
                case europeSVG:
                    europeSVG.style.transform = "scale(1.6)"
                    shadowContinent(asieSVG)
                    shadowContinent(oceanieSVG)
                    shadowContinent(afriqueSVG)
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break
                case asieSVG:
                    shadowContinent(europeSVG)
                    asieSVG.style.transform = "scale(1.07) translateY(10%)"
                    shadowContinent(oceanieSVG)
                    shadowContinent(afriqueSVG)
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break
                case afriqueSVG:
                    shadowContinent(europeSVG)
                    shadowContinent(asieSVG)
                    shadowContinent(oceanieSVG)
                    afriqueSVG.style.transform = "scale(1.3) translatex(13%) translateY(-25%)"
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break
                case oceanieSVG:
                    shadowContinent(europeSVG)
                    shadowContinent(asieSVG)
                    oceanieSVG.style.transform = "translateY(-30%)"
                    shadowContinent(afriqueSVG)
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break

                case amSudSVG:
                    shadowContinent(europeSVG)
                    shadowContinent(asieSVG)
                    shadowContinent(oceanieSVG)
                    shadowContinent(afriqueSVG)
                    amSudSVG.style.transform = "scale(1.4) translateY(-42%) translateX(35%)"
                    shadowContinent(amNordSVG)
                    break
                case amNordSVG:
                    shadowContinent(europeSVG)
                    shadowContinent(asieSVG)
                    shadowContinent(oceanieSVG)
                    shadowContinent(afriqueSVG)
                    shadowContinent(amSudSVG)
                    amNordSVG.style.transform = "scale(1.1) translateY(13%) translateX(47%)"
                    break
            }
        } else {

            shadowDataContinent(confirmerDataContinent, 0)
            shadowDataContinent(deathsDataContinent, 100)
            shadowDataContinent(discoveredDataContinent, 300)


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
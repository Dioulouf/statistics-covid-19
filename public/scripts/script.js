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




// **********************************************       IHM      ***********************************



for (let continent of continents) {
    continent.addEventListener("click", () => {
        clickBool = !clickBool

        if (clickBool == true) {

            displayDataContinent(confirmerDataContinent, 100)
            displayDataContinent(deathsDataContinent, 300)
            displayDataContinent(discoveredDataContinent, 500)

            switch (continent) {
                case europeSVG:
                    displayTitleContinent("Europe")
                    europeSVG.style.transform = "scale(1.6)"
                    shadowContinent(asieSVG)
                    shadowContinent(oceanieSVG)
                    shadowContinent(afriqueSVG)
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break
                case asieSVG:
                    displayTitleContinent("Asie")
                    shadowContinent(europeSVG)
                    asieSVG.style.transform = "scale(1.07) translateY(10%)"
                    shadowContinent(oceanieSVG)
                    shadowContinent(afriqueSVG)
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break
                case afriqueSVG:
                    displayTitleContinent("Afrique")
                    shadowContinent(europeSVG)
                    shadowContinent(asieSVG)
                    shadowContinent(oceanieSVG)
                    afriqueSVG.style.transform = "scale(1.3) translatex(13%) translateY(-25%)"
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break
                case oceanieSVG:
                    displayTitleContinent("Oceanie")
                    shadowContinent(europeSVG)
                    shadowContinent(asieSVG)
                    oceanieSVG.style.transform = "translateY(-30%)"
                    shadowContinent(afriqueSVG)
                    shadowContinent(amSudSVG)
                    shadowContinent(amNordSVG)
                    break

                case amSudSVG:
                    displayTitleContinent("Amérique du sud")
                    shadowContinent(europeSVG)
                    shadowContinent(asieSVG)
                    shadowContinent(oceanieSVG)
                    shadowContinent(afriqueSVG)
                    amSudSVG.style.transform = "scale(1.4) translateY(-42%) translateX(35%)"
                    shadowContinent(amNordSVG)
                    break
                case amNordSVG:
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

            shadowDataContinent(confirmerDataContinent, 10)
            shadowDataContinent(deathsDataContinent, 100)
            shadowDataContinent(discoveredDataContinent, 200)
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
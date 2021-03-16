let selectElement = document.querySelector('#selectService');
let selectPlaceholder = document.querySelector('#selectPlaceholder');
let burgerMenuElement = document.querySelector('#burgerMenu');
let burgerMenuElementActive = false;
let navBarElement = document.querySelector('#navBar');
let formAlert = document.querySelector('#formAlert');

let colorTextMuted = "rgba(19, 39, 67, 0.3)";

window.addEventListener('DOMContentLoaded', (event) => {
    formAlert.style.display = "none";
    if(selectElement.value != selectPlaceholder.value){
        selectElement.style.color = "black";
    }
    else {
        selectElement.style.color = colorTextMuted;
    }

    burgerMenuElement.addEventListener('click', () => {

        if(!burgerMenuElementActive) {
            navBarElement.style.display = "flex";
            burgerMenuElement.style.color = "White"
            burgerMenuElementActive = true;
            navBarElement.style.height = "250px";
        }
        else {
            navBarElement.style.display = "none";
            burgerMenuElementActive = false;
            burgerMenuElement.style.color = "Black"
        }
        
    })
});

const selectStyling = () => {
    ('#selectPlaceholder');

    if(selectElement.value != selectPlaceholder.value){
        selectElement.style.color = "black";
    }
}
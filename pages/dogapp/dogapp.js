const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all'
const select = document.querySelector('.breeds');
const loading = document.querySelector('.brand')
const img = document.querySelector('.dogs');

fetch(BREEDS_URL)
    .then(response => response.json())
    .then(data => Object.keys(data.message))
    .then(breedsArray => {

        breedsArray.forEach(element => {
            const option = document.createElement('option');
            option.value = element;
            option.innerText = element;
            select.appendChild(option);
        });
    })

function addDoggo(breed) {
    //hide pic show loading
    loading.classList.add('active');
    img.classList.remove('active');

    //fetch pic
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            img.src = data.message;
            img.alt = 'cute doggo';
            //hide loading show pic
        });


}

select.addEventListener("change", event => addDoggo(event.target.value))

img.addEventListener("load", e => {
    loading.classList.remove("active");
    img.classList.add("active");
})
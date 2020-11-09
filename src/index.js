const URL = `http://localhost:3000/pups`
// const id = 1
// const pupURL = `http://localhost:3000/pups/${id}`
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
let goodDog = ""

function init() {
fetch(URL)
.then(response => response.json())
.then(dogdata => renderDogMenu(dogdata))
}

function renderDogMenu(dogdata) {
    dogdata.forEach(dog => {
        const span = document.createElement("span")
        span.id = dog.id
        span.innerText = dog.name
        span.src = dog.image
        dogBar.append(span)
        span.addEventListener("click", event => {
            fetch(URL + `/${dog.id}`)
            .then(response => response.json())
            .then(dogObj => renderShowDog(dogObj))
            })
        })
    }

function renderShowDog(dogObj) {
    dogInfo.innerHTML = `
    <img src=${dogObj.image}>
    <h2>${dogObj.name}</h2>
    `
    const button = document.createElement("button")
    if (dogObj.isGoodDog) {
        button.innerText = "Good Dog!"
    } else {
        button.innerText = "Bad Dog!"
    }

    button.addEventListener("click", event => {
        fetch(URL + `/${dogObj.id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isGoodDog: !dogObj.isGoodDog })
        })
        .then(response => response.json())
        .then(data => renderShowDog(data))
        })
    dogInfo.append(button)
}

init()

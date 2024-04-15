let searchButton = document.getElementById("button-submit");
const searchInput = document.getElementById("url-input");


// runs when button is clicked
searchButton.addEventListener("click", ()=> {
    console.log("search button pressed")
    sendApiRequest()
})

// ... (your existing code)

async function sendToModel() {
    console.log("it runs here    ")
    const user_query = searchInput.value.trim()
    // Make a POST request to your Flask endpoint
    let response = await fetch('/submit_form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'url_input': user_query,
        }),
    });
    let data = await response.json();

    // Assuming your Flask endpoint returns an object with a key 'ingredients'
    let ingredients = data.ingredients;

    // Now you can use the 'ingredients' data in your app
    console.log("Ingredients:", ingredients);
    return ingredients
}


async function sendApiRequest(){

    let APP_ID = "b75d8fb3"
    let API_KEY = "9cdfb6e09ee9b7a888d54d5880d295f7"
    const user_query = await sendToModel()
    console.log("user query is " + user_query )

    console.log(user_query)
    let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${user_query}`)
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)

}

var calories

function useApiData(data) {
    //bootstrap card
    document.querySelector('#generated-recipes').innerHTML = `
    <div>
        <div class='filter'>
            <label for="quantity" class="servings">Servings:</label>
            <input type="number" class="servings" id="quantity" name="servings" min="1" max="25">
        </div>
        <div class='filter'>
            <label for="quantity" class="servings">Calories:</label>
            <input type="number" class="servings" id="quantity" name="servings" min="1" max="10000">
        </div>
    </div>
    <div class="scroll">
        <table class="cards-in-table">
            <tr>
                <td>
                    <div class="card" style="width: 18rem;">
                        <img src="${data.hits[0].recipe.image}" class="card-img-top">
                        <div class="card-body">
                            <h4 class="card-title">${data.hits[0].recipe.label}</h4>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Calories:  ${Math.floor((data.hits[0].recipe.calories)/data.hits[0].recipe.yield)}</li>
                            <li class="list-group-item">Servings:  ${data.hits[0].recipe.yield}</li>
                            <li class="list-group-item"><a href="${data.hits[0].recipe.url}">See Recipe</a></li>
                        </ul>
                        <div class="card-body">
                            <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Add To Plan
                            </button>
                            <ul class="dropdown-menu">
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="0breakfast">Breakfast</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="0lunch">Lunch</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="0dinner">Dinner</button></li>
                            </ul>
                        </div>                        </div>
                    </div>
                </td>

                <td>
                    <div class="card" style="width: 18rem;">
                        <img src="${data.hits[1].recipe.image}" class="card-img-top">
                        <div class="card-body">
                            <h4 class="card-title">${data.hits[1].recipe.label}</h4>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Calories:  ${Math.floor((data.hits[1].recipe.calories)/data.hits[1].recipe.yield)}</li>
                            <li class="list-group-item">Servings:  ${data.hits[1].recipe.yield}</li>
                            <li class="list-group-item"><a href="${data.hits[1].recipe.url}">See Recipe</a></li>
                        </ul>
                        <div class="card-body">
                            <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Add To Plan
                            </button>
                            <ul class="dropdown-menu">
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="1breakfast">Breakfast</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="1lunch">Lunch</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="1dinner">Dinner</button></li>
                            </ul>
                        </div>                        </div>
                    </div>
                </td>

                <td>
                    <div class="card" style="width: 18rem;">
                        <img src="${data.hits[2].recipe.image}" class="card-img-top">
                        <div class="card-body">
                            <h4 class="card-title">${data.hits[2].recipe.label}</h4>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Calories:  ${Math.floor((data.hits[2].recipe.calories)/data.hits[2].recipe.yield)}</li>
                            <li class="list-group-item">Servings:  ${data.hits[2].recipe.yield}</li>
                            <li class="list-group-item"><a href="${data.hits[2].recipe.url}">See Recipe</a></li>
                        </ul>
                        <div class="card-body">
                            <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Add To Plan
                            </button>
                            <ul class="dropdown-menu">
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="2breakfast">Breakfast</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="2lunch">Lunch</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="2dinner">Dinner</button></li>
                            </ul>
                        </div>                        </div>
                    </div>
                </td>

                <td>
                    <div class="card" style="width: 18rem;">
                        <img src="${data.hits[3].recipe.image}" class="card-img-top">
                        <div class="card-body">
                            <h4 class="card-title">${data.hits[3].recipe.label}</h4>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Calories:  ${Math.floor((data.hits[3].recipe.calories)/data.hits[3].recipe.yield)}</li>
                            <li class="list-group-item">Servings:  ${data.hits[3].recipe.yield}</li>
                            <li class="list-group-item"><a href="${data.hits[3].recipe.url}">See Recipe</a></li>
                        </ul>
                        <div class="card-body">
                            <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Add To Plan
                            </button>
                            <ul class="dropdown-menu">
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="3breakfast">Breakfast</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="3lunch">Lunch</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="3dinner">Dinner</button></li>
                            </ul>
                        </div>                        </div>
                    </div>
                </td>

                <td>
                    <div class="card" style="width: 18rem;">
                        <img src="${data.hits[4].recipe.image}" class="card-img-top">
                        <div class="card-body">
                            <h4 class="card-title">${data.hits[4].recipe.label}</h4>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Calories:  ${Math.floor((data.hits[4].recipe.calories)/data.hits[4].recipe.yield)}</li>
                            <li class="list-group-item">Servings:  ${data.hits[4].recipe.yield}</li>
                            <li class="list-group-item"><a href="${data.hits[4].recipe.url}">See Recipe</a></li>
                        </ul>
                        <div class="card-body">
                            <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Add To Plan
                            </button>
                            <ul class="dropdown-menu">
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="4breakfast">Breakfast</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="4lunch">Lunch</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="4dinner">Dinner</button></li>
                            </ul>
                        </div>                        </div>
                    </div>
                </td>

                <td>
                    <div class="card" style="width: 18rem;">
                        <img src="${data.hits[5].recipe.image}" class="card-img-top">
                        <div class="card-body">
                            <h4 class="card-title">${data.hits[5].recipe.label}</h4>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Calories:  ${Math.floor((data.hits[5].recipe.calories)/data.hits[5].recipe.yield)}</li>
                            <li class="list-group-item">Servings:  ${data.hits[5].recipe.yield}</li>
                            <li class="list-group-item"><a href="${data.hits[5].recipe.url}">See Recipe</a></li>
                        </ul>
                        <div class="card-body">
                            <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Add To Plan
                            </button>
                            <ul class="dropdown-menu">
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="5breakfast">Breakfast</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="5lunch">Lunch</button></li>
                                <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="5dinner">Dinner</button></li>
                            </ul>
                        </div>                        </div>
                    </div>
                </td>

                <td>
                    <div class="card" style="width: 18rem;">
                        <img src="${data.hits[6].recipe.image}" class="card-img-top">
                        <div class="card-body">
                            <h4 class="card-title">${data.hits[6].recipe.label}</h4>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Calories:  ${Math.floor((data.hits[6].recipe.calories)/data.hits[6].recipe.yield)}</li>
                            <li class="list-group-item">Servings:  ${data.hits[6].recipe.yield}</li>
                            <li class="list-group-item"><a href="${data.hits[6].recipe.url}">See Recipe</a></li>
                        </ul>
                        <div class="card-body">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Add To Plan
                                </button>
                                <ul class="dropdown-menu">
                                    <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="6breakfast">Breakfast</button></li>
                                    <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="6lunch">Lunch</button></li>
                                    <li><button class="dropdown-item" type="button" onclick = "AddMealToPlan(this.id)" id="6dinner">Dinner</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </td>

            </tr>
        </table>
    </div>
    `
}

let breakfastName = document.getElementById("#breakfastRecipe")

async function AddMealToPlan(button_id) {
    //$(breakfastName).text(data.hits[0].recipe.label)
    console.log("SAVED")
    console.log(button_id)

    let APP_ID = "b75d8fb3"
    let API_KEY = "9cdfb6e09ee9b7a888d54d5880d295f7"
    var user_query = document.getElementById("url-input").value
    let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${user_query}`)
    console.log(response)
    let data = await response.json()
    console.log(data)

    let mealno = button_id.slice(0,1)
    let daymeal = button_id.slice(1);
    console.log(mealno)
    console.log(daymeal)
    document.getElementById(daymeal+'-recipe').innerHTML = data.hits[mealno].recipe.label
    document.getElementById(daymeal+'-serves').innerHTML = 'serves: ' + data.hits[mealno].recipe.yield
    document.getElementById(daymeal+'-calories').innerHTML = Math.floor((data.hits[mealno].recipe.calories)/data.hits[mealno].recipe.yield) + ' calories'
    document.getElementById(daymeal+'-img').src = data.hits[mealno].recipe.image
}

var heroImage1 = document.getElementById('heroImage1')
var heroImage2 = document.getElementById('heroImage2')
var heroImage3 = document.getElementById('heroImage3')

var url = "https://www.themealdb.com/api/json/v1/1/random.php"

// ==============Random Recipe Card 1==============
const rec1 = fetch(url)
  .then((data) => data.json())
  .then((data1) => {
    const myMeal1 = data1.meals[0]
    const title1 = myMeal1.strMeal
    const image1 = myMeal1.strMealThumb
    const receipe1 = myMeal1.strInstructions
    heroImage1.innerHTML =
      `  <div class=" card mb-3  border border-1 border-dark" >
      <img class="  " height="250px" 
      src="${image1}" onclick="fullRec(this)">
      <div class="card-body">
        <h5 class="card-title myCardTitle">${title1}</h5>
        <p class="card-text">${receipe1.slice(0, 150)}....</p>
      </div>
    </div>`
  })

// ==============Random Recipe Card 2==============  
const res2 = fetch(url)
  .then((data) => data.json())
  .then((data1) => {
    const myMeal2 = data1.meals[0]
    const title2 = myMeal2.strMeal
    const image2 = myMeal2.strMealThumb
    const receipe2 = myMeal2.strInstructions
    heroImage2.innerHTML =
      `  <div class=" card mb-3  border border-1 border-dark" >
      <img class="  " height="250px" 
      src="${image2}" onclick="fullRec(this)">
      <div class="card-body">
        <h5 class="card-title myCardTitle">${title2}</h5>
        <p class="card-text">${receipe2.slice(0, 150)}....</p>
      </div>
    </div>`
  })

// ==============Random Recipe Card 3==============    
const res3 = fetch(url)
  .then((data) => data.json())
  .then((data1) => {
    const myMeal3 = data1.meals[0]
    const title3 = myMeal3.strMeal
    const image3 = myMeal3.strMealThumb
    const receipe3 = myMeal3.strInstructions
    heroImage3.innerHTML =
      `  <div class=" card mb-3  border border-1 border-dark" >
      <img class="  " height="250px" 
      src="${image3}" onclick="fullRec(this)">
      <div class="card-body">
      <h5 class="card-title myCardTitle">${title3}</h5>
      <p class="card-text">${receipe3.slice(0, 150)}....</p>
      </div>
      </div>`
  })


// ==========Drop down menu for category ===========

var category = document.getElementById('Category')
category.innerHTML += `<option value="select" >Select Category</option>`

const urlCategory = "https://www.themealdb.com/api/json/v1/1/categories.php"
fetch(urlCategory)
  .then((data) => data.json())
  .then((data1) => {
    // console.log(data1.categories.length);
    for (let i = 0; i < data1.categories.length; i++) {
      // console.log(data1.categories[i].strCategory);
      category.innerHTML += `<option selected>
        ${data1.categories[i].strCategory}</option>
        `
    }
    category.value = 'select';
  }
  )


// ============== Rendering the container of recipes of selected category ==========>   
var mainContainer = document.getElementById('mainContainer')
var recipesSelect = document.getElementById('recipesSelect') // recepies of selected category in drop down menu
recipesSelect.innerHTML = `<option value="select" >Select Meal</option>`
var recipesCards = document.getElementById("recepiesCards") // cards of recipes of selected category in main page 

function onCategoryChange() {
  // console.log(category.value);
  const urlMeal = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.value}`
  fetch(urlMeal)
    .then((data) => (data.json()))
    .then((data1) => {
      console.log(data1);
      // console.log(myMeals)

      recipesSelect.innerHTML = `<option value="select" >Select Meal</option>`
      mainContainer.innerHTML = " "
      recipesCards.innerHTML = " "
      singleRecipe.innerHTML = " "
      for (let i = 0; i < data1.meals.length; i++) {
        // console.log(data1.meals[i].strMealThumb);
        recipesSelect.innerHTML += `<option selected>${data1.meals[i].strMeal}</option>`
        recipesCards.innerHTML += `
                <div class=" col-sm-6 col-md-6 col-lg-4 mb-3 " >
                <div class="card border border-2 border-black myCard">
                <img src="${data1.meals[i].strMealThumb}" class="card-img-top " height="200px" alt="..." onclick="fullRec(this)">
                <div class="card-body">
                  <p class="card-text myCardTitle text-center fs-5 fw-bold ">${data1.meals[i].strMeal}</p>
                </div>
              </div>
                </div>
                `
      }
      recipesSelect.value = 'select';
    })
}

// ============== Rendering the container of single complete recipes of selected dish ==========>   
var singleRecipe = document.getElementById('singleRecipe')
function fullRec(clickedImage) {
  console.log("hello");
  var recipeName = clickedImage.nextElementSibling.querySelector('.myCardTitle').textContent;
  console.log(recipeName);  
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
    .then((data) => (data.json()))
    .then((data1) => {
      console.log(data1.meals);
      mainContainer.innerHTML = " "
      recipesCards.innerHTML = " "
      singleRecipe.innerHTML = `
        <div class="col-12 col-md-6 w-100 mt-2   >
          <div class="card mb-3 w-100 border border-2 border-black" >
            <h5 class="card-title fs-1 text-center fw-bold text-warning">${data1.meals[0].strMeal}</h5>
            <div class="d-md-flex mt-5">
              <img src="${data1.meals[0].strMealThumb}" class=" singleImage  rounded-start" alt="..." width="200px">
              <div class="card-body">
                  <p class="card-text  ms-3"><span class="fs-3 fw-bold text-warning ">Read Complete Recipe</span> <br>
                  ${data1.meals[0].strInstructions}</p>
                  <a class="ms-3 fw-bold" href="${data1.meals[0].strYoutube}" target="blank">Watch full video </a>
              </div>
            </div>
          </div>
        </div>
        
      `
    })
}


//  var recipesSelect = document.getElementById('meals')
function onSelectMeal() {
  console.log(recipesSelect.value);
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipesSelect.value}`)
    .then((data) => (data.json()))
    .then((data1) => {
      console.log(data1.meals);
  //   mainContainer.innerHTML = " "
      recipesCards.innerHTML = " "
      singleRecipe.innerHTML = `
        <div class="col-12 col-md-6 w-100 mt-2   >
          <div class="card mb-3 w-100 border border-2 border-black" >
            <h5 class="card-title fs-1 text-center fw-bold text-warning">${data1.meals[0].strMeal}</h5>
            <div class="d-md-flex mt-5">
              <img src="${data1.meals[0].strMealThumb}" class=" singleImage  rounded-start" alt="..." width="200px">
              <div class="card-body">
                  <p class="card-text  ms-3"><span class="fs-3 fw-bold text-warning ">Read Complete Recipe</span> <br>
                  ${data1.meals[0].strInstructions}</p>
                  <a class="ms-3 fw-bold" href="${data1.meals[0].strYoutube}" target="blank">Watch full video </a>
              </div>
            </div>
          </div>
        </div>
        
      `
    })
}
const handleSearch = ()=>{
    const searchValue =  document.getElementById("search-input").value;
    if(!searchValue) return;
    console.log(searchValue);
    document.getElementById("search-input").value = "";
    // Clear meal-list-container's inner HTML
    document.getElementById("meal-list-container").innerHTML = "";
    document.getElementById("meal-detail-container").innerHTML = "";

    // fetch all matched data 
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then(res => res.json())
    .then(meals =>{
        const mealListContainer = document.getElementById("meal-list-container");
        const mealList = meals.meals;
        // if not matched with any meal
        if(!mealList){
            const h1 = document.createElement("h1");
            h1.innerText = "Not found any matching meals here!";
            mealListContainer.appendChild(h1);
        }
        else{
            mealList.forEach(meal =>{
                // create a div 
                const div = document.createElement("div");
                div.classList.add("meal-card");
                div.innerHTML = `
                <img class="meal-img" src="${meal.strMealThumb}"/>
                <p><b>${meal.strMeal.slice(0,40)}</b></p>
                `
                // Attach event listener to call handleMealDetail function
                div.addEventListener('click', () => handleMealDetail(meal));
                mealListContainer.appendChild(div);
            })
        }
    })
}
const handleMealDetail = (meal) =>{
    const mealDetail = document.getElementById("meal-detail-container");
    // clear the div 
    document.getElementById("meal-detail-container").innerHTML = "";
    console.log(meal);
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
        ingredients.push(`${measure.trim()} ${ingredient}`);
        } else if (ingredient) {
        ingredients.push(ingredient);
        }
    }
    // create a div 
    const div = document.createElement("div");
    div.classList = "meal-detail-card";
    div.innerHTML = `
    <img class="meal-detail-img" src="${meal.strMealThumb}"/>
    <h3>${meal.strMeal}</h3>
    <h5>Ingredients</h5>
    <ul>
        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
    </ul>
    `
    mealDetail.appendChild(div);
    // Scroll to the meal detail container
    mealDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
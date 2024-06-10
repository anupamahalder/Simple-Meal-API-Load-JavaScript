const handleSearch = ()=>{
    const searchValue =  document.getElementById("search-input").value;
    if(!searchValue) return;
    console.log(searchValue);
    document.getElementById("search-input").value = "";
    // Clear meal-list-container's inner HTML
    document.getElementById("meal-list-container").innerHTML = "";

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
                <p><b>${meal.strMeal}</b></p>
                `
                mealListContainer.appendChild(div);
            })
        }
    })
}

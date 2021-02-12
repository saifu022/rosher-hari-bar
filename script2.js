const searchRecipe = async () => {
    document.getElementById('detailRecipe').style.display = 'none';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('foodCart').style.display = 'flex';
    const keyWord = document.getElementById('searchInput').value;
    const foodCart = document.getElementById('foodCart');
    foodCart.innerHTML = '';
    const link = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyWord}`
    try {
        const res = await fetch(link);
        const data = await res.json();
        const recipes = data.drinks;
        recipes.forEach(recipe => {
            const mealName = recipe.strDrink;
            const mealImgLink = recipe.strDrinkThumb;
            const newCard = document.createElement('div');
            newCard.className = 'recipeCard';
            newCard.id = recipe.idDrink;
            newCard.innerHTML = `<div class="card rounded m-3 shadow rounded" style="width: 10rem;">
        <img src=${mealImgLink} class="card-img-top" alt="Food  image">
        <h5 class="card-body card-title text-center"> ${mealName} </h5>
        </div>`;
            foodCart.appendChild(newCard);
        });
        document.getElementById('foodCart').addEventListener('click', event => {
            showDetails(event.target);
        })
    }
    catch(error) {
        document.getElementById('errorMsg').style.display = 'flex';
    }
}

const showDetails = async (clickedEvent) => {
    const mealId = clickedEvent.parentElement.parentElement.id;
    const link = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(link);
    const data = await res.json();
    const recipe = data.drinks[0];
    document.getElementById('origin').innerText = `This drink is ${recipe.strAlcoholic}!`;
    document.getElementById('recipeImg').src = recipe.strDrinkThumb
    document.getElementById('recipeName').src = recipe.strDrink;
    document.getElementById('ingredientsList').innerHTML = '';
    for (let i = 1; i <= 15; i++) {
        const keyName = `strIngredient${i}`;
        const keyMeasure = `strMeasure${i}`;
        const ingredient = recipe[keyName];
        let measurement = recipe[keyMeasure];
        if (measurement==null){
            measurement== '';
        }
        if (ingredient != "" && ingredient != null) {
            const newIngredient = document.createElement('li');
            newIngredient.innerText = `${ingredient} - ${measurement}`;
            document.getElementById('ingredientsList').appendChild(newIngredient);
        }
    }
    document.getElementById('instructions').innerText= recipe.strInstructions;

    //hide search result and display details
    document.getElementById('detailRecipe').style.display = 'flex';
    document.getElementById('foodCart').style.display = 'none';
}

const back = () => {
    //hide everything but search results
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('detailRecipe').style.display = 'none';
    document.getElementById('foodCart').style.display = 'flex';
}
searchRecipe();
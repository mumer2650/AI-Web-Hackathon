document.getElementById("toggleSidebar").addEventListener("click", function() {
    document.getElementById("sidebar").classList.toggle("hidden-sidebar");
});

// Mock data for dashboard
document.getElementById("total-items").textContent = 15;
document.getElementById("expiring-items").textContent = 3;
document.getElementById("recipes-available").textContent = 7;

// Function to show sections dynamically
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Function to add an item to inventory
function addItem() {
    let itemName = document.getElementById("itemName").value;
    let itemQuantity = document.getElementById("itemQuantity").value;
    let inventoryTable = document.getElementById("inventoryTable");

    if (itemName === "" || itemQuantity === "") {
        alert("Please enter both item name and quantity.");
        return;
    }

    // Create table row with alternating row colors
    let row = document.createElement("tr");
    row.classList.add("bg-gray-100", "hover:bg-gray-200"); // Light background color for better visibility
    row.innerHTML = `
        <td class="border border-gray-500 px-4 py-2 font-bold text-gray-900">${itemName}</td>
        <td class="border border-gray-500 px-4 py-2 text-gray-800">${itemQuantity}</td>
        <td class="border border-gray-500 px-4 py-2">
            <button onclick="deleteItem(this)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
        </td>
    `;

    // Append row to table
    inventoryTable.appendChild(row);

    // Clear input fields
    document.getElementById("itemName").value = "";
    document.getElementById("itemQuantity").value = "";
}

// Function to delete an item
function deleteItem(button) {
    button.parentElement.parentElement.remove();
}

// Function to add a recipe
// Predefined recipes for AI suggestions
// Predefined AI recipe suggestions
const recipeDatabase = [
    { name: "Pasta Alfredo", ingredients: "Pasta, Cream, Garlic, Cheese, Butter" },
    { name: "Veggie Stir Fry", ingredients: "Broccoli, Carrot, Bell Pepper, Soy Sauce" },
    { name: "Omelette", ingredients: "Eggs, Cheese, Onion, Tomato" },
    { name: "Grilled Cheese Sandwich", ingredients: "Bread, Cheese, Butter" },
    { name: "Fruit Salad", ingredients: "Apple, Banana, Orange, Grapes" },
    { name: "Chicken Curry", ingredients: "Chicken, Onion, Tomato, Spices" }
];

// Function to display all AI suggested recipes in a table
function showSuggestedRecipes() {
    let suggestedRecipesTable = document.getElementById("suggestedRecipesTable");
    suggestedRecipesTable.innerHTML = ""; // Clear previous entries

    recipeDatabase.forEach(recipe => {
        let row = document.createElement("tr");
        row.classList.add("bg-gray-100", "hover:bg-gray-200"); // Light background for visibility
        row.innerHTML = `
            <td class="border border-gray-500 px-4 py-2 font-bold text-gray-900">${recipe.name}</td>
            <td class="border border-gray-500 px-4 py-2 text-gray-800">${recipe.ingredients}</td>
        `;
        suggestedRecipesTable.appendChild(row);
    });
}

// Function to add a new recipe manually
function addRecipe() {
    let recipeName = document.getElementById("recipeName").value;
    let recipeIngredients = document.getElementById("recipeIngredientsInput").value;
    let recipeTable = document.getElementById("recipeTable");

    if (recipeName === "" || recipeIngredients === "") {
        alert("Please enter both recipe name and ingredients.");
        return;
    }

    // Create table row
    let row = document.createElement("tr");
    row.classList.add("bg-gray-100", "hover:bg-gray-200"); // Light background color
    row.innerHTML = `
        <td class="border border-gray-500 px-4 py-2 font-bold text-gray-900">${recipeName}</td>
        <td class="border border-gray-500 px-4 py-2 text-gray-800">${recipeIngredients}</td>
        <td class="border border-gray-500 px-4 py-2">
            <button onclick="deleteRecipe(this)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
        </td>
    `;

    // Append row to table
    recipeTable.appendChild(row);

    // Clear input fields
    document.getElementById("recipeName").value = "";
    document.getElementById("recipeIngredientsInput").value = "";
}

// Function to delete a recipe
function deleteRecipe(button) {
    button.parentElement.parentElement.remove();
}

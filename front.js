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

// Function to add a recipe
function addRecipe() {
    let recipeName = document.getElementById("recipeName").value;
    let recipeIngredients = document.getElementById("recipeIngredients").value;
    let recipeTable = document.getElementById("recipeTable");

    if (recipeName === "" || recipeIngredients === "") {
        alert("Please enter both recipe name and ingredients.");
        return;
    }

    // Create table row with alternating row colors
    let row = document.createElement("tr");
    row.classList.add("bg-gray-100", "hover:bg-gray-200"); // Light background color for better visibility
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
    document.getElementById("recipeIngredients").value = "";
}

// Function to delete a recipe
function deleteRecipe(button) {
    button.parentElement.parentElement.remove();
}
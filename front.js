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

// Function to start voice recognition
function startVoiceRecognition() {
    let voiceStatus = document.getElementById("voiceStatus");

    // Check if browser supports Speech Recognition
    if (!("webkitSpeechRecognition" in window)) {
        alert("Your browser does not support voice recognition. Try Google Chrome.");
        return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    voiceStatus.textContent = "Listening... Speak now!";

    recognition.onresult = function(event) {
        let command = event.results[0][0].transcript.toLowerCase();
        voiceStatus.textContent = `You said: "${command}"`;

        processVoiceCommand(command);
    };

    recognition.onerror = function(event) {
        voiceStatus.textContent = "Error in voice recognition. Try again.";
    };

    recognition.start();
}

// Function to process voice commands
function processVoiceCommand(command) {
    let inventoryTable = document.getElementById("inventoryTable");
    let words = command.split(" ");
    
    // Check if it's an "add" command
    if (words.includes("add")) {
        let quantity = parseInt(words[words.indexOf("add") + 1]);
        let item = words.slice(words.indexOf("add") + 2).join(" ");

        if (!isNaN(quantity) && item) {
            addItemByVoice(item, quantity);
        } else {
            alert("Invalid command. Try saying 'Add 2 Apples'.");
        }
    } 
    // Check if it's a "remove" command
    else if (words.includes("remove")) {
        let quantity = parseInt(words[words.indexOf("remove") + 1]);
        let item = words.slice(words.indexOf("remove") + 2).join(" ");

        if (!isNaN(quantity) && item) {
            removeItemByVoice(item, quantity);
        } else {
            alert("Invalid command. Try saying 'Remove 1 Banana'.");
        }
    } 
    else {
        alert("Command not recognized. Try 'Add 3 Tomatoes' or 'Remove 1 Apple'.");
    }
}

// Function to add an item through voice command
function addItemByVoice(itemName, quantity) {
    let inventoryTable = document.getElementById("inventoryTable");

    // Check if item already exists in table
    let existingRow = Array.from(inventoryTable.children).find(row =>
        row.cells[0].textContent.toLowerCase() === itemName.toLowerCase()
    );

    if (existingRow) {
        let currentQuantity = parseInt(existingRow.cells[1].textContent);
        existingRow.cells[1].textContent = currentQuantity + quantity;
    } else {
        // Create new row
        let row = document.createElement("tr");
        row.classList.add("bg-gray-100", "hover:bg-gray-200");
        row.innerHTML = `
            <td class="border border-gray-500 px-4 py-2 font-bold text-gray-900">${itemName}</td>
            <td class="border border-gray-500 px-4 py-2 text-gray-800">${quantity}</td>
            <td class="border border-gray-500 px-4 py-2">
                <button onclick="deleteItem(this)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
            </td>
        `;
        inventoryTable.appendChild(row);
    }

    alert(`${quantity} ${itemName}(s) added!`);
}

// Function to remove an item through voice command
function removeItemByVoice(itemName, quantity) {
    let inventoryTable = document.getElementById("inventoryTable");

    // Find the row for the item
    let existingRow = Array.from(inventoryTable.children).find(row =>
        row.cells[0].textContent.toLowerCase() === itemName.toLowerCase()
    );

    if (existingRow) {
        let currentQuantity = parseInt(existingRow.cells[1].textContent);

        if (currentQuantity > quantity) {
            existingRow.cells[1].textContent = currentQuantity - quantity;
            alert(`${quantity} ${itemName}(s) removed!`);
        } else {
            existingRow.remove();
            alert(`${itemName} removed from inventory!`);
        }
    } else {
        alert(`${itemName} not found in inventory.`);
    }
}

// Function to add an item manually
function addItem() {
    let itemName = document.getElementById("itemName").value;
    let itemQuantity = document.getElementById("itemQuantity").value;
    let inventoryTable = document.getElementById("inventoryTable");

    if (itemName === "" || itemQuantity === "") {
        alert("Please enter both item name and quantity.");
        return;
    }

    // Create table row
    let row = document.createElement("tr");
    row.classList.add("bg-gray-100", "hover:bg-gray-200");
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

// Function to delete an item manually
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



// Function to add an expiry date to an item
function addExpiryDate() {
    let itemName = document.getElementById("expiryItemName").value.trim();
    let expiryDate = document.getElementById("expiryDate").value;
    let notificationsTable = document.getElementById("notificationsTable");

    if (itemName === "" || expiryDate === "") {
        alert("Please enter both item name and expiry date.");
        return;
    }

    // Convert date to readable format
    let expiryDateObj = new Date(expiryDate);
    let today = new Date();
    let daysLeft = Math.ceil((expiryDateObj - today) / (1000 * 60 * 60 * 24));

    // Determine status
    let status = "";
    let statusClass = "";
    if (daysLeft < 0) {
        status = "Expired";
        statusClass = "text-red-600 font-bold";
    } else if (daysLeft <= 3) {
        status = `Expiring Soon (in ${daysLeft} days)`;
        statusClass = "text-yellow-500 font-bold";
    } else {
        status = `Good (Expires in ${daysLeft} days)`;
        statusClass = "text-green-600 font-bold";
    }

    // Create table row
    let row = document.createElement("tr");
    row.classList.add("bg-gray-100", "hover:bg-gray-200");
    row.innerHTML = `
        <td class="border border-gray-500 px-4 py-2 font-bold text-gray-900">${itemName}</td>
        <td class="border border-gray-500 px-4 py-2 text-gray-800">${expiryDate}</td>
        <td class="border border-gray-500 px-4 py-2 ${statusClass}">${status}</td>
    `;

    // Append row to table
    notificationsTable.appendChild(row);

    // Clear input fields
    document.getElementById("expiryItemName").value = "";
    document.getElementById("expiryDate").value = "";
}

// Function to check expiry status for all items
function checkExpiryNotifications() {
    let notificationsTable = document.getElementById("notificationsTable");
    let rows = notificationsTable.getElementsByTagName("tr");
    
    let today = new Date();
    
    for (let row of rows) {
        let expiryDateCell = row.cells[1]; // Expiry Date column
        let statusCell = row.cells[2]; // Status column
        
        if (expiryDateCell && statusCell) {
            let expiryDateObj = new Date(expiryDateCell.textContent);
            let daysLeft = Math.ceil((expiryDateObj - today) / (1000 * 60 * 60 * 24));

            // Update status based on expiry
            if (daysLeft < 0) {
                statusCell.textContent = "Expired";
                statusCell.className = "border border-gray-500 px-4 py-2 text-red-600 font-bold";
            } else if (daysLeft <= 3) {
                statusCell.textContent = `Expiring Soon (in ${daysLeft} days)`;
                statusCell.className = "border border-gray-500 px-4 py-2 text-yellow-500 font-bold";
            } else {
                statusCell.textContent = `Good (Expires in ${daysLeft} days)`;
                statusCell.className = "border border-gray-500 px-4 py-2 text-green-600 font-bold";
            }
        }
    }
}

// Run expiry check every 10 seconds (for live updates)
setInterval(checkExpiryNotifications, 10000);


// Function to update the dashboard statistics
// Function to update dashboard statistics accurately
function updateDashboard() {
    let totalItems = document.getElementById("total-items");
    let expiringItems = document.getElementById("expiring-items");
    let expiredItems = document.getElementById("expired-items");
    let recipesAvailable = document.getElementById("recipes-available");
    let recentActivities = document.getElementById("recent-activities");

    // Ensure the tables exist before accessing them
    let inventoryTable = document.getElementById("inventoryTable");
    let notificationsTable = document.getElementById("notificationsTable");
    let recipeTable = document.getElementById("recipeTable");

    // ✅ Update total inventory items count
    totalItems.textContent = inventoryTable.children.length;

    // ✅ Count expiring and expired items
    let expiringSoonCount = 0;
    let expiredCount = 0;

    Array.from(notificationsTable.children).forEach(row => {
        let statusText = row.cells[2].textContent.toLowerCase();
        if (statusText.includes("expiring soon")) {
            expiringSoonCount++;
        } else if (statusText.includes("expired")) {
            expiredCount++;
        }
    });

    expiringItems.textContent = expiringSoonCount;
    expiredItems.textContent = expiredCount;

    // ✅ Update total recipes count
    recipesAvailable.textContent = recipeTable.children.length;

    // ✅ Update recent activities dynamically
    let activitiesHTML = `
        <li class="bg-white p-4 rounded-lg shadow-md">
            <p class="text-gray-700">Updated inventory: <strong>${totalItems.textContent} items</strong></p>
            <span class="text-gray-500 text-sm">Just now</span>
        </li>
        <li class="bg-white p-4 rounded-lg shadow-md">
            <p class="text-gray-700">Expiring soon: <strong>${expiringItems.textContent} items</strong></p>
            <span class="text-gray-500 text-sm">Just now</span>
        </li>
        <li class="bg-white p-4 rounded-lg shadow-md">
            <p class="text-gray-700">New recipes added: <strong>${recipesAvailable.textContent} recipes</strong></p>
            <span class="text-gray-500 text-sm">Just now</span>
        </li>
    `;

    recentActivities.innerHTML = activitiesHTML;
}

// ✅ Ensure dashboard updates immediately after actions
function triggerDashboardUpdate() {
    setTimeout(updateDashboard, 100); // Delay for a smooth update
}

// ✅ Call dashboard update after adding/removing items
document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();
    setInterval(updateDashboard, 5000);
});

// Call update function every 5 seconds to keep dashboard updated
setInterval(updateDashboard, 5000);

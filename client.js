const axios = require("axios");
const fs = require("fs");
const readline = require("readline");

const apiUrl = "http://localhost:4000/items"; // Pastikan ini sesuai dengan port server Express Anda
const dataFile = "./data.json";

// function to read data from file
function readData() {
  try {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// function to write data to file
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// function to create a new item
async function createItem(name) {
  try {
    const response = await axios.post(apiUrl, { name });
    console.log("Item created:", response.data);
    const data = readData();
    data.push(response.data);
    writeData(data);
  } catch (error) {
    console.error(
      "Error creating item:",
      error.response ? error.response.data : error.message
    );
  }
}

// function to read all items
async function readAllItems() {
  try {
    const response = await axios.get(apiUrl);
    console.log("All items:", response.data);
    writeData(response.data);
  } catch (error) {
    console.error(
      "Error fetching items:",
      error.response ? error.response.data : error.message
    );
  }
}

// function to read one item
async function readOneItem(id) {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    console.log("One item:", response.data);
  } catch (error) {
    console.error(
      "Error fetching item:",
      error.response ? error.response.data : error.message
    );
  }
}

// function to update an item
async function updateItem(id, name) {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, { name });
    console.log("Item updated:", response.data);
    const data = readData();
    const index = data.findIndex((item) => item.id === parseInt(id));
    if (index !== -1) {
      data[index] = response.data;
      writeData(data);
    }
  } catch (error) {
    console.error(
      "Error updating item:",
      error.response ? error.response.data : error.message
    );
  }
}

// Function to delete an item
async function deleteItem(id) {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    console.log("Item deleted");
    const data = readData();
    const filteredData = data.filter((item) => item.id !== parseInt(id));
    writeData(filteredData);
  } catch (error) {
    console.error(
      "Error deleting item:",
      error.response ? error.response.data : error.message
    );
  }
}

// Function to get user input
function getUserInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Main function
async function main() {
  while (true) {
    console.log("\nChoose an operation:");
    console.log("1. Create item (POST)");
    console.log("2. Read all items (GET)");
    console.log("3. Read one item (GET)");
    console.log("4. Update item (PUT)");
    console.log("5. Delete item (DELETE)");
    console.log("6. Exit");

    const choice = await getUserInput("Enter your choice (1-6): ");

    switch (choice) {
      case "1":
        const name = await getUserInput("Enter item name: ");
        await createItem(name);
        break;
      case "2":
        await readAllItems();
        break;
      case "3":
        const readId = await getUserInput("Enter item ID: ");
        await readOneItem(readId);
        break;
      case "4":
        const updateId = await getUserInput("Enter item ID to update: ");
        const newName = await getUserInput("Enter new item name: ");
        await updateItem(updateId, newName);
        break;
      case "5":
        const deleteId = await getUserInput("Enter item ID to delete: ");
        await deleteItem(deleteId);
        break;
      case "6":
        console.log("Exiting...");
        return;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

main();

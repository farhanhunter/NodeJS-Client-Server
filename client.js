const axios = require("axios");
const fs = require("fs");
const readline = require("readline");

const apiUrl = "http://localhost:4000/mangas"; // Ubah ke endpoint manga
const dataFile = "./manga_data.json";

function readData() {
  try {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

async function createManga() {
  const manga = {
    title: await getUserInput("Enter manga title: "),
    original_title: await getUserInput("Enter original title (optional): "),
    author: await getUserInput("Enter author: "),
    artist: await getUserInput("Enter artist (if different from author): "),
    description: await getUserInput("Enter description: "),
    status: await getUserInput(
      "Enter status (Ongoing/Completed/Hiatus/Cancelled): "
    ),
    publication_year: parseInt(await getUserInput("Enter publication year: ")),
    demographic: await getUserInput("Enter demographic: "),
    genres: (await getUserInput("Enter genres (comma-separated): "))
      .split(",")
      .map((g) => g.trim()),
    themes: (await getUserInput("Enter themes (comma-separated): "))
      .split(",")
      .map((t) => t.trim()),
    cover_image_url: await getUserInput("Enter cover image URL: "),
    publisher: await getUserInput("Enter publisher: "),
    total_chapters: parseInt(await getUserInput("Enter total chapters: ")),
    average_rating: parseFloat(await getUserInput("Enter average rating: ")),
  };

  try {
    const response = await axios.post(apiUrl, manga);
    console.log("Manga created:", response.data);
    const data = readData();
    data.push(response.data);
    writeData(data);
  } catch (error) {
    console.error(
      "Error creating manga:",
      error.response ? error.response.data : error.message
    );
  }
}

async function readAllMangas() {
  try {
    const response = await axios.get(apiUrl);
    console.log("All mangas:", response.data);
    writeData(response.data);
  } catch (error) {
    console.error(
      "Error fetching mangas:",
      error.response ? error.response.data : error.message
    );
  }
}

async function readOneManga(id) {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    console.log("Manga:", response.data);
  } catch (error) {
    console.error(
      "Error fetching manga:",
      error.response ? error.response.data : error.message
    );
  }
}

async function updateManga(id) {
  const updateFields = [
    "title",
    "original_title",
    "author",
    "artist",
    "description",
    "status",
    "publication_year",
    "demographic",
    "genres",
    "themes",
    "cover_image_url",
    "publisher",
    "total_chapters",
    "average_rating",
  ];

  const updates = {};
  for (const field of updateFields) {
    const value = await getUserInput(
      `Enter new ${field} (leave blank to skip): `
    );
    if (value) {
      if (field === "genres" || field === "themes") {
        updates[field] = value.split(",").map((item) => item.trim());
      } else if (field === "publication_year" || field === "total_chapters") {
        updates[field] = parseInt(value);
      } else if (field === "average_rating") {
        updates[field] = parseFloat(value);
      } else {
        updates[field] = value;
      }
    }
  }

  try {
    const response = await axios.put(`${apiUrl}/${id}`, updates);
    console.log("Manga updated:", response.data);
    const data = readData();
    const index = data.findIndex((manga) => manga.id === parseInt(id));
    if (index !== -1) {
      data[index] = response.data;
      writeData(data);
    }
  } catch (error) {
    console.error(
      "Error updating manga:",
      error.response ? error.response.data : error.message
    );
  }
}

async function deleteManga(id) {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    console.log("Manga deleted");
    const data = readData();
    const filteredData = data.filter((manga) => manga.id !== parseInt(id));
    writeData(filteredData);
  } catch (error) {
    console.error(
      "Error deleting manga:",
      error.response ? error.response.data : error.message
    );
  }
}

async function searchMangas() {
  const title = await getUserInput(
    "Enter title to search (leave blank to skip): "
  );
  const author = await getUserInput(
    "Enter author to search (leave blank to skip): "
  );
  const genre = await getUserInput(
    "Enter genre to search (leave blank to skip): "
  );

  let queryParams = new URLSearchParams();
  if (title) queryParams.append("title", title);
  if (author) queryParams.append("author", author);
  if (genre) queryParams.append("genre", genre);

  try {
    const response = await axios.get(`${apiUrl}/search?${queryParams}`);
    console.log("Search results:", response.data);
  } catch (error) {
    console.error(
      "Error searching mangas:",
      error.response ? error.response.data : error.message
    );
  }
}

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

async function main() {
  while (true) {
    console.log("\nChoose an operation:");
    console.log("1. Create manga (POST)");
    console.log("2. Read all mangas (GET)");
    console.log("3. Read one manga (GET)");
    console.log("4. Update manga (PUT)");
    console.log("5. Delete manga (DELETE)");
    console.log("6. Search mangas");
    console.log("7. Exit");

    const choice = await getUserInput("Enter your choice (1-7): ");

    switch (choice) {
      case "1":
        await createManga();
        break;
      case "2":
        await readAllMangas();
        break;
      case "3":
        const readId = await getUserInput("Enter manga ID: ");
        await readOneManga(readId);
        break;
      case "4":
        const updateId = await getUserInput("Enter manga ID to update: ");
        await updateManga(updateId);
        break;
      case "5":
        const deleteId = await getUserInput("Enter manga ID to delete: ");
        await deleteManga(deleteId);
        break;
      case "6":
        await searchMangas();
        break;
      case "7":
        console.log("Exiting...");
        return;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

main();

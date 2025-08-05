import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    price: 15.99,
    quantity: 5,
    availability: true
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "The story of young Scout Finch and her father Atticus in a racially divided Alabama town.",
    price: 12.99,
    quantity: 3,
    availability: true
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about totalitarianism and surveillance society.",
    price: 14.99,
    quantity: 4,
    availability: true
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel of manners that follows the emotional development of Elizabeth Bennet.",
    price: 11.99,
    quantity: 6,
    availability: true
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy novel about Bilbo Baggins, a hobbit who embarks on a quest with thirteen dwarves.",
    price: 16.99,
    quantity: 2,
    availability: true
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A novel about teenage alienation and loss of innocence in post-World War II America.",
    price: 13.99,
    quantity: 4,
    availability: true
  },
  {
    title: "Lord of the Flies",
    author: "William Golding",
    description: "A novel about a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.",
    price: 12.99,
    quantity: 3,
    availability: true
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    description: "An allegorical novella about a group of farm animals who rebel against their human farmer.",
    price: 10.99,
    quantity: 5,
    availability: true
  }
];

const addSampleBooks = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM"
    });
    console.log("Connected to MongoDB");

    // Clear existing books
    await Book.deleteMany({});
    console.log("Cleared existing books");

    // Add sample books
    const books = await Book.insertMany(sampleBooks);
    console.log(`Added ${books.length} sample books successfully!`);

    console.log("\nSample books added:");
    books.forEach(book => {
      console.log(`- ${book.title} by ${book.author} ($${book.price})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error adding sample books:", error);
    process.exit(1);
  }
};

addSampleBooks(); 
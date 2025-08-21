import express from "express";
// import { addQuote, addQuotes, getRandomQuotes, testQuotes } from "../controller/quote.controller.js";  // Import necessary controller functions
import { addQuote, addQuotes, getRandomQuotes } from "../controller/quote.controller.js";  
const router = express.Router();

// Route for adding a single quote
router.post("/add", addQuote);

// Route for adding multiple quotes
router.post("/add-multiple", addQuotes);

// Route for fetching 5 random quotes (no auth required for reading quotes)
router.get("/random", getRandomQuotes);

// Test route to verify backend is working
// router.get("/test", testQuotes);

export default router;
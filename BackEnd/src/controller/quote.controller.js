import Quote from "../models/quote.model.js";

// Controller to handle adding a single quote
export const addQuote = async (req, res) => {
  try {
    const { text, author } = req.body; // Get quote text and author from the request body

    // Validate if text is provided
    if (!text) {
      return res.status(400).json({ message: "Quote text is required" });
    }

    // Create a new quote object
    const newQuote = new Quote({
      text,
      author: author || "Senior Developer",
    });

    // Save the new quote to the database
    await newQuote.save();

    // Return a success message along with the saved quote
    res.status(201).json({
      message: "Quote added successfully",
      quote: newQuote,  // Send the newly added quote in the response
    });
  } catch (error) {
    
    console.error("Error adding quote:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to handle adding multiple quotes
export const addQuotes = async (req, res) => {
  try {
    const quotes = req.body;  // Array of quotes from the request body

    // Validate if quotes array is provided
    if (!Array.isArray(quotes) || quotes.length === 0) {
      return res.status(400).json({ message: "Please provide an array of quotes" });
    }

    // Map through each quote and set default author if not provided
    const quotesToInsert = quotes.map((quote) => ({
      text: quote.text,
      author: quote.author || "Senior Developer",  // Default to "Senior Developer"
    }));

    // Insert multiple quotes at once using insertMany
    await Quote.insertMany(quotesToInsert);

    res.status(201).json({
      message: "Quotes added successfully",
      quotes: quotesToInsert,  // Send the inserted quotes back in the response
    });
  } catch (error) {
    console.error("Error adding quotes:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch random quotes
export const getRandomQuotes = async (req, res) => {
  try {
  
    const totalQuotes = await Quote.countDocuments();
    
    if (totalQuotes === 0) {
      console.log("No quotes found in database, creating default quotes");
      
      // Create some default quotes if none exist
      const defaultQuotes = [
        { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
        { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
        { text: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" },
        { text: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann" },
        { text: "Knowledge is power.", author: "Francis Bacon" },
        { text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.", author: "Dan Salomon" },
        { text: "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.", author: "Antoine de Saint-Exupery" },
        { text: "Code never lies, comments sometimes do.", author: "Ron Jeffries" },
        { text: "Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.", author: "Muhammad Waseem" }
      ];
      
      await Quote.insertMany(defaultQuotes);
      console.log("Default quotes inserted successfully");
    }

///////////////////////////////////////////////////////////////////////////////////////////////
    // Fetch random quotes from the quotes collection 

    const quotes = await Quote.aggregate([{ $sample: { size: Math.min(5, totalQuotes) } }]);


    console.log("Fetched quotes:", quotes); 

    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ message: "No quotes found in the database." });
    }

    // Send the quotes back in the response
    res.status(200).json({ quotes });
  } catch (error) {
    console.error("Error fetching random quotes:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

///////////////////////
// Add this new function to your quote.controller.js file

// Simple test endpoint to verify the backend is working
// export const testQuotes = async (req, res) => {
//   try {
//     console.log("Test endpoint called"); // Debug log
    
//     // Count total quotes
//     const totalQuotes = await Quote.countDocuments();
//     console.log("Total quotes in database:", totalQuotes); // Debug log
    
//     // Get all quotes (limit to 10 for testing)
//     const allQuotes = await Quote.find().limit(10);
//     console.log("Sample quotes:", allQuotes); // Debug log
    
//     res.status(200).json({
//       message: "Test endpoint working",
//       totalQuotes: totalQuotes,
//       sampleQuotes: allQuotes,
//       timestamp: new Date().toISOString()
//     });
    
//   } catch (error) {
//     console.error("Test endpoint error:", error); // Debug log
//     res.status(500).json({ 
//       message: "Test endpoint failed", 
//       error: error.message 
//     });
//   }
// };
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react'; // Using Lucide-react icons
import quizService from '../store/useQuizService.js'; // API service for fetching categories

// Fixed categories
const CATEGORIES = [
  { value: "sqli", label: "SQLi 🗄️" },
  { value: "xss", label: "XSS 🧪" },
  { value: "dom clobbering", label: "DOM Clobbering 🌐" },
  { value: "cdn tampering", label: "CDN Tampering 🚧" },
  { value: "css injection", label: "CSS Injection 🎨" },
  { value: "nosql", label: "NoSQL 📊" },
  { value: "clickjacking", label: "Clickjacking 🖱️" },
  { value: "sql injection", label: "SQL Injection 💉" },
  { value: "csp bypass", label: "CSP Bypass 🔓" },
  { value: "idor", label: "IDOR 🔑" },
  { value: "broken authentication", label: "Broken Authentication 🔐" },
];

const QuizHomePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(CATEGORIES);  // Categories are static for now
  const [categoryFilter, setCategoryFilter] = useState(CATEGORIES[0].value); // Default to first category

  // Fetch categories (though for now they are static)
  useEffect(() => {
    // Can add dynamic fetching if required
    // const fetchCategories = async () => {
    //   try {
    //     const response = await quizService.getCategories();
    //     setCategories(response.data.categories);  // Use dynamic fetching if necessary
    //   } catch (error) {
    //     console.error('Error fetching categories:', error);
    //   }
    // };

    // fetchCategories();  // Uncomment if dynamic categories are available
  }, []);

  const handleCategoryClick = (category) => {
    // Redirect to the QuizPage with the selected category and fixed difficulty/level
    navigate(`/quiz/${category}/Easy/1`); // Fixed difficulty and level for now
  };

  return (
    <div className="home-page">
      <div className="navbar bg-primary text-primary-content shadow-lg">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Quiz Dashboard</h1>
        </div>
        <div className="flex-none">
          <button className="btn btn-ghost text-primary-content">Logout</button>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-6xl">
        {/* Category Buttons */}
        <div className="category-buttons">
          {categories.map((category) => (
            <button 
              key={category.value} 
              onClick={() => handleCategoryClick(category.value)} 
              className="category-btn"
            >
              <span>
                <CheckCircle className="category-icon completed" />
              </span>
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizHomePage;

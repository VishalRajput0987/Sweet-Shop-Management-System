// import { useState } from "react";

// // export default function SearchBar({ onSearch }) {
// //   const [name, setName] = useState("");
// //   const [category, setCategory] = useState("");

// //   function handleSubmit(e) {
// //     e.preventDefault();
// //     onSearch({ name, category });
// //   }

// // ACCEPT NEW PROPS: categories and names
// export default function SearchBar({ onSearch, categories = [], names = [] }) { 
//   const [selectedName, setSelectedName] = useState(""); // State for selected Name
//   const [selectedCategory, setSelectedCategory] = useState(""); // State for selected Category

//   function handleSubmit(e) {
//     e.preventDefault();
//     // Send the selected values for filtering
//     onSearch({ name: selectedName, category: selectedCategory }); 
//   }


//   return (
//     <form className="search-bar" onSubmit={handleSubmit}>
      
//       {/* SWEET NAME DROPDOWN */}
//       <select
//         value={selectedName}
//         onChange={e => setSelectedName(e.target.value)}
//       >
//         <option value="">Search by Name (All)</option>
//         {names.map(name => (
//           <option key={name} value={name}>{name}</option>
//         ))}
//       </select>
      
//       {/* CATEGORY DROPDOWN */}
//       <select
//         value={selectedCategory}
//         onChange={e => setSelectedCategory(e.target.value)}
//       >
//         <option value="">Category (All)</option>
//         {categories.map(cat => (
//           <option key={cat} value={cat}>{cat}</option>
//         ))}
//       </select>

//       <button type="submit">Search</button>
//     </form>
//   );
// }

import { useState } from "react";

// ACCEPT NEW PROPS: categories and names
export default function SearchBar({ onSearch, categories = [], names = [] }) { 
  const [selectedName, setSelectedName] = useState(""); // State for selected Name
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected Category

  function handleSubmit(e) {
    e.preventDefault();
    
    // Send the selected values for filtering. 
    // Empty string means "search all" or no filter applied.
    onSearch({ name: selectedName, category: selectedCategory }); 
  }
  
  // Optional: Function to reset both filters
  function handleReset() {
    setSelectedName("");
    setSelectedCategory("");
    onSearch({ name: "", category: "" });
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      
      {/* 1. SWEET NAME DROPDOWN */}
      <select
        value={selectedName}
        onChange={e => setSelectedName(e.target.value)}
      >
        <option value="">Search by Name (All)</option>
        {/* Map over the unique names received from DashboardPage */}
        {names.map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      
      {/* 2. CATEGORY DROPDOWN */}
      <select
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
      >
        <option value="">Category (All)</option>
        {/* Map over the unique categories received from DashboardPage */}
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <button type="submit">Filter Sweets</button>
      <button type="button" onClick={handleReset}>Clear Filters</button>
    </form>
  );
}
// import { useEffect, useState } from "react";
// import { fetchSweets, searchSweets, purchaseSweet } from "../api/sweetsApi";
// import SweetCard from "../components/Sweets/SweetCard";
// import SearchBar from "../components/Sweets/SearchBar";
// import { useAuth } from "../context/AuthContext";

// export default function DashboardPage() {
//   const [sweets, setSweets] = useState([]);
//   const [error, setError] = useState("");
//   const [categories, setCategories] = useState([]); // <-- NEW STATE
//   const [names, setNames] = useState([]); // <-- NEW STATE
//   const { user } = useAuth();

//   async function loadSweets() {
//     try {
//       const data = await fetchSweets();
//       setSweets(data);
      
//       // --- NEW LOGIC TO EXTRACT UNIQUE LISTS ---
//       const uniqueCategories = [...new Set(data.map(s => s.category).filter(Boolean))].sort();
//       const uniqueNames = [...new Set(data.map(s => s.name).filter(Boolean))].sort();
//       setCategories(uniqueCategories);
//       setNames(uniqueNames);
//       // ------------------------------------------

//     } catch (err) {
//       setError("Failed to load sweets");
//     }
//   }

//   useEffect(() => {
//     loadSweets();
//   }, []);

//   async function handleSearch(params) {
//     try {
//       const data = await searchSweets(params);
//       setSweets(data);
//     } catch (err) {
//       setError("Search failed");
//     }
//   }

//   async function handlePurchase(id) {
//     try {
//       await purchaseSweet(id, 1);
//       loadSweets();
//     } catch (err) {
//       alert(err.response?.data?.message || "Purchase failed");
//     }
//   }

//   return (
//     <div className="page">
//       <h1>Sweet Shop</h1>
//       {user && <p>Welcome, {user.name} ({user.role})</p>}
//       {error && <p className="error">{error}</p>}
//       {/* <SearchBar onSearch={handleSearch} /> */}
//       <SearchBar onSearch={handleSearch} categories={categories} names={names} />
//       <div className="sweets-grid">
//         {sweets.map(sweet => (
//           <SweetCard
//             key={sweet._id}
//             sweet={sweet}
//             onPurchase={handlePurchase}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { fetchSweets, searchSweets, purchaseSweet } from "../api/sweetsApi";
import SweetCard from "../components/Sweets/SweetCard";
import SearchBar from "../components/Sweets/SearchBar";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]); // <-- NEW STATE
  const [names, setNames] = useState([]); // <-- NEW STATE
  const { user } = useAuth();

  async function loadSweets() {
    try {
      const data = await fetchSweets();
      setSweets(data);
       
      // --- NEW LOGIC TO EXTRACT UNIQUE LISTS ---
      // Get unique, non-empty categories and sort them
      const uniqueCategories = [...new Set(data.map(s => s.category).filter(Boolean))].sort();
      // Get unique, non-empty sweet names and sort them
      const uniqueNames = [...new Set(data.map(s => s.name).filter(Boolean))].sort();
      
      setCategories(uniqueCategories);
      setNames(uniqueNames);
      // ------------------------------------------

    } catch (err) {
      setError("Failed to load sweets");
    }
  }

  async function handleSearch(filters) {
    // We expect filters.name and filters.category to be set by the new SearchBar dropdowns
    try {
      const data = await searchSweets(filters);
      setSweets(data);
    } catch (err) {
      setError("Search failed");
    }
  }

  async function handlePurchase(id, quantity) {
    try {
      await purchaseSweet(id, quantity);
      loadSweets(); // Reload to update stock
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  }

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div className="page">
      <h1>Sweet Shop</h1>
      {user && <p>Welcome, {user.name} ({user.role})</p>}
      {error && <p className="error">{error}</p>}
      
      {/* PASS NEW PROPS: names and categories */}
      <SearchBar onSearch={handleSearch} categories={categories} names={names} />
      
      <div className="sweets-grid">
        {sweets.map(sweet => (
          <SweetCard
            key={sweet._id}
            sweet={sweet}
            onPurchase={handlePurchase}
          />
        ))}
      </div>
    </div>
  );
}
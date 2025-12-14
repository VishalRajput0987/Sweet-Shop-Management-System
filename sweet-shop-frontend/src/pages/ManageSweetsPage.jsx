// import { useEffect, useState } from "react";
// import {
//   fetchSweets,
//   createSweet,
//   updateSweet,
//   deleteSweet,
//   restockSweet
// } from "../api/sweetsApi";
// import SweetCard from "../components/Sweets/SweetCard";
// import SweetForm from "../components/Sweets/SweetForm";

// export default function ManageSweetsPage() {
//   const [sweets, setSweets] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [error, setError] = useState("");
//   const [categories, setCategories] = useState([]); // <-- NEW STATE
  
//   async function loadSweets() {
//     try {
//       const data = await fetchSweets();
//       setSweets(data);
      
//       // --- NEW LOGIC TO EXTRACT UNIQUE CATEGORIES ---
//       const uniqueCategories = [...new Set(data.map(s => s.category).filter(Boolean))].sort();
//       setCategories(uniqueCategories);
//       // ----------------------------------------------

//     } catch (err) {
//       setError("Failed to load sweets");
//     }
//   }

//   useEffect(() => {
//     loadSweets();
//   }, []);

//   async function handleCreate(values) {
//     try {
//       await createSweet(values);
//       setEditing(null);
//       loadSweets();
//     } catch (err) {
//       alert(err.response?.data?.message || "Create failed");
//     }
//   }

//   async function handleUpdate(values) {
//     try {
//       await updateSweet(editing._id, values);
//       setEditing(null);
//       loadSweets();
//     } catch (err) {
//       alert(err.response?.data?.message || "Update failed");
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm("Delete this sweet?")) return;
//     try {
//       await deleteSweet(id);
//       loadSweets();
//     } catch (err) {
//       alert(err.response?.data?.message || "Delete failed");
//     }
//   }

//   async function handleRestock(id) {
//     const qty = Number(prompt("Add quantity:", "10") || "0");
//     if (!qty) return;
//     try {
//       await restockSweet(id, qty);
//       loadSweets();
//     } catch (err) {
//       alert(err.response?.data?.message || "Restock failed");
//     }
//   }

//   return (
//     <div className="page manage-page">
//       <h1>Manage Sweets</h1>
//       {error && <p className="error">{error}</p>}

//       <div className="manage-layout">
//         <div className="manage-list">
//           <h2>Existing Sweets</h2>
//           <div className="sweets-grid">
//             {sweets.map(sweet => (
//               <SweetCard
//                 key={sweet._id}
//                 sweet={sweet}
//                 onPurchase={() => {}}
//                 isAdmin
//                 onEdit={setEditing}
//                 onDelete={handleDelete}
//                 onRestock={handleRestock}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="manage-form">
//           <SweetForm
//             initial={editing}
//             onSubmit={editing ? handleUpdate : handleCreate}
//             onCancel={() => setEditing(null)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  fetchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  restockSweet
} from "../api/sweetsApi";
import SweetCard from "../components/Sweets/SweetCard";
import SweetForm from "../components/Sweets/SweetForm";

export default function ManageSweetsPage() {
  const [sweets, setSweets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]); // <-- NEW STATE

  async function loadSweets() {
    try {
      const data = await fetchSweets();
      setSweets(data);
      
      // --- NEW LOGIC TO EXTRACT UNIQUE CATEGORIES ---
      const uniqueCategories = [...new Set(data.map(s => s.category).filter(Boolean))].sort();
      setCategories(uniqueCategories);
      // ----------------------------------------------

    } catch (err) {
      setError("Failed to load sweets"); // Completed error handling
    }
  }

  useEffect(() => {
    loadSweets();
  }, []);

  async function handleCreate(values) {
    try {
      await createSweet(values);
      setEditing(null);
      loadSweets();
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  }

  async function handleUpdate(values) {
    try {
      await updateSweet(editing._id, values);
      setEditing(null);
      loadSweets();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this sweet?")) return;
    try {
      await deleteSweet(id);
      loadSweets();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  }

  async function handleRestock(id) {
    const qty = Number(prompt("Add quantity:", "10") || "0");
    if (!qty) return;
    try {
      await restockSweet(id, qty);
      loadSweets();
    } catch (err) {
      alert(err.response?.data?.message || "Restock failed");
    }
  }

  return (
    <div className="page manage-page">
      <h1>Manage Sweets</h1>
      {error && <p className="error">{error}</p>}

      <div className="manage-layout">
        <div className="manage-list">
          <h2>Existing Sweets</h2>
          <div className="sweets-grid">
            {sweets.map(sweet => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onPurchase={() => {}}
                isAdmin
                onEdit={setEditing}
                onDelete={handleDelete}
                onRestock={handleRestock}
              />
            ))}
          </div>
        </div>

        <div className="manage-form">
          <SweetForm
            initial={editing}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => setEditing(null)}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}
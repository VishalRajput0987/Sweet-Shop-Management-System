// import { useEffect, useState } from "react";

// const initialState = {
//   name: "",
//   category: "",
//   price: "",
//   quantity: "",
//   description: ""
// };

// // export default function SweetForm({ onSubmit, initial, onCancel }) {
// //   const [form, setForm] = useState(initialState);

// export default function SweetForm({ onSubmit, initial, onCancel, categories = [] }) { 
//   const [form, setForm] = useState(initialState);
//   const [isNewCategory, setIsNewCategory] = useState(false); // <-- NEW STATE


//   useEffect(() => {
//     if (initial) {
//       setForm({
//         name: initial.name || "",
//         category: initial.category || "",
//         price: initial.price || "",
//         quantity: initial.quantity || "",
//         description: initial.description || ""
//       });
//     } else {
//       setForm(initialState);
//     }
//   }, [initial]);

//   // function handleChange(e) {
//   //   const { name, value } = e.target;
//   //   setForm(prev => ({ ...prev, [name]: value }));
//   // }

//   function handleChange(e) {
//     const { name, value } = e.target;
    
//     if (name === 'category' && value === 'NEW_CATEGORY') { // Handle 'Add New' selection
//         setIsNewCategory(true);
//         setForm(prev => ({ ...prev, category: '' })); // Clear category for new input
//     } else {
//         setForm(prev => ({ ...prev, [name]: value }));
//         if (name === 'category' && value !== 'NEW_CATEGORY' && isNewCategory) {
//              setIsNewCategory(false);
//         }
//     }
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     onSubmit({
//       ...form,
//       price: Number(form.price),
//       quantity: Number(form.quantity)
//     });
//   }

//   return (
//     <form className="sweet-form" onSubmit={handleSubmit}>
//       <h3>{initial ? "Edit Sweet" : "Add Sweet"}</h3>
//       <label>
//         Name
//         <input name="name" value={form.name} onChange={handleChange} required />
//       </label>
//       {/* <label>
//         Category
//         <input name="category" value={form.category} onChange={handleChange} required />
//       </label> */}

//       {/* CATEGORY FIELD LOGIC */}
//       <label>
//         Category
//         {/* Dropdown for Existing Categories */}
//         {!isNewCategory && (
//             <select name="category" value={form.category} onChange={handleChange} required>
//                 <option value="">Select or Add New Category</option>
//                 {categories.map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                 ))}
//                 <option value="NEW_CATEGORY">-- Add New Category --</option>
//             </select>
//         )}
//         {/* Conditional Input for New Category */}
//         {(isNewCategory || initial?.category && !categories.includes(initial.category)) && (
//             <>
//                 <input 
//                     name="category" 
//                     value={form.category} 
//                     onChange={handleChange} 
//                     placeholder="Type New Category Name" 
//                     required 
//                 />
//                 {isNewCategory && (
//                     <button type="button" onClick={() => { setIsNewCategory(false); setForm(prev => ({...prev, category: ''})) }}>
//                         Cancel New Category
//                     </button>
//                 )}
//             </>
//         )}
//       </label>
//       {/* END CATEGORY FIELD LOGIC */}
//       <label>
//         Price
//         <input name="price" value={form.price} onChange={handleChange} type="number" required />
//       </label>
//       <label>
//         Quantity
//         <input name="quantity" value={form.quantity} onChange={handleChange} type="number" required />
//       </label>
//       <label>
//         Description
//         <textarea name="description" value={form.description} onChange={handleChange} />
//       </label>
//       <div className="form-actions">
//         <button type="submit">{initial ? "Update" : "Create"}</button>
//         {onCancel && (
//           <button type="button" onClick={onCancel}>
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }

import { useEffect, useState } from "react";

const initialState = {
  name: "",
  category: "",
  price: 0,
  quantity: 0,
  description: "",
  imageUrl: ""
};

// ACCEPT NEW PROP: categories
export default function SweetForm({ onSubmit, initial, onCancel, categories = [] }) { 
  const [form, setForm] = useState(initialState);
  const [isNewCategory, setIsNewCategory] = useState(false); // <-- NEW STATE: Controls whether to show text input

  useEffect(() => {
    if (initial) {
      // When editing, check if the sweet's category is *not* in the current list.
      // If not, we need to show the text input (acting as a custom category).
      const initialCategory = initial.category || '';
      if (initialCategory && !categories.includes(initialCategory)) {
        setIsNewCategory(true);
      } else {
        setIsNewCategory(false);
      }
      setForm(initial);
    } else {
      setForm(initialState);
      setIsNewCategory(false); // Reset for new form
    }
  }, [initial, categories]); // Re-run if initial sweet changes or category list updates

  function handleChange(e) {
    const { name, value } = e.target;
    
    // Logic for handling the Category field
    if (name === 'category') {
        if (value === 'NEW_CATEGORY') { 
            // 1. User selected the 'Add New Category' option
            setIsNewCategory(true);
            setForm(prev => ({ ...prev, category: '' })); // Clear category for the new input field
            return;
        } else if (isNewCategory && value !== 'NEW_CATEGORY' && categories.includes(value)) {
             // 2. User was typing a new category but then selected an existing one from the dropdown (unlikely, but safe)
             setIsNewCategory(false);
        }
    }
    
    setForm(prev => ({ 
      ...prev, 
      [name]: name === "price" || name === "quantity" ? Number(value) : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.category) {
        alert("Please select or enter a category.");
        return;
    }
    onSubmit(form);
  }

  return (
    <form className="sweet-form" onSubmit={handleSubmit}>
      <h3>{initial ? "Edit Sweet" : "Add Sweet"}</h3>

      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>

      {/* CATEGORY FIELD LOGIC */}
      <label>
        Category
        {/* Conditional Input Field: Appears if 'Add New' was selected OR if editing a non-standard category */}
        {isNewCategory ? (
            <>
                <input 
                    name="category" 
                    value={form.category} 
                    onChange={handleChange} 
                    placeholder="Type New Category Name" 
                    required 
                />
                <button 
                    type="button" 
                    onClick={() => { 
                        setIsNewCategory(false); 
                        setForm(prev => ({...prev, category: ''})) // Reset category selection
                    }}
                    className="small-button" // Assume you have a small button style
                >
                    Select Existing
                </button>
            </>
        ) : (
            /* Dropdown for Existing Categories + Add New Option */
            <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
                <option value="NEW_CATEGORY">-- Add New Category --</option>
            </select>
        )}
      </label>
      {/* END CATEGORY FIELD LOGIC */}

      <label>
        Price
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          min="0"
          required
        />
      </label>

      <label>
        Quantity
        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          min="0"
          required
        />
      </label>

      <label>
        Description
        <textarea name="description" value={form.description} onChange={handleChange} />
      </label>

      <label>
        Image URL
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
      </label>

      <div className="form-actions">
        <button type="submit">{initial ? "Update Sweet" : "Add Sweet"}</button>
        {initial && (
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
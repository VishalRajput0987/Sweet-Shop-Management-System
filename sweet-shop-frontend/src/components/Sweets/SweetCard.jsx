

// import { useAuth } from "../../context/AuthContext"; // <--- ADD THIS IMPORT

// export default function SweetCard({ sweet, onPurchase, isAdmin, onEdit, onDelete, onRestock }) {
//   const outOfStock = sweet.quantity === 0;
//   const { user } = useAuth(); // <--- GET USER CONTEXT

//   // Function to handle purchase: prompts for quantity, then calls the passed-in onPurchase
//   const handlePurchaseClick = () => {
//     const qty = Number(prompt("Enter quantity:", "1") || "0");
//     if (qty > 0) {
//       onPurchase(sweet._id, qty);
//     }
//   };
    
//   return (
//     <div className="sweet-card">
//       <h3>{sweet.name}</h3>
//       <p>{sweet.category}</p>
//       <p>₹ {sweet.price}</p>
//       <p>In stock: {sweet.quantity}</p>
//       {sweet.description && <p className="description">{sweet.description}</p>}
//       
//       {/*         PURCHASE OPTION LOGIC: 
//         1. Only visible if NOT isAdmin (i.e., on the Dashboard).
//         2. Button is disabled if outOfStock is true.
//         3. Uses the handlePurchaseClick function to prompt for quantity.
//       */}
//       {!isAdmin && (
//         <button
//           onClick={handlePurchaseClick}
//           disabled={outOfStock}
//         >
//           {outOfStock ? "Out of stock" : "Purchase"}
//         </button>
//       )}

//       {isAdmin && (
//         <div className="admin-actions">
//           <button onClick={() => onEdit(sweet)}>Edit</button>
//           <button onClick={() => onDelete(sweet._id)}>Delete</button>
//           <button onClick={() => onRestock(sweet._id)}>Restock</button>
//         </div>
//       )}
//     </div>
//   );
// }



import { useAuth } from "../../context/AuthContext"; // Ensure this import is present

export default function SweetCard({ sweet, onPurchase, isAdmin, onEdit, onDelete, onRestock }) {
  const outOfStock = sweet.quantity === 0;
  const { user } = useAuth(); // Get the logged-in user object

  // Function to prompt for quantity before calling the passed-in onPurchase
  const handlePurchaseClick = () => {
    const qty = Number(prompt("Enter quantity:", "1") || "0");
    if (qty > 0) {
      onPurchase(sweet._id, qty);
    }
  };

  // Determine if the Purchase button should be visible.
  // It should ONLY be visible if the user is logged in AND their role is 'user'.
  const showPurchaseButton = user && user.role === 'user';
    
  return (
    <div className="sweet-card">
      <h3>{sweet.name}</h3>
      <p>{sweet.category}</p>
      <p>₹ {sweet.price}</p>
      <p>In stock: {sweet.quantity}</p>
      {sweet.description && <p className="description">{sweet.description}</p>}
      
      {/* PURCHASE BUTTON LOGIC: 
          Now conditional on the user's role, not just the isAdmin prop.
      */}
      {showPurchaseButton && (
        <button
          onClick={handlePurchaseClick}
          disabled={outOfStock}
        >
          {outOfStock ? "Out of stock" : "Purchase"}
        </button>
      )}

      {/* ADMIN ACTIONS LOGIC: 
          Uses the isAdmin prop to determine if it's on the Manage Sweets page.
      */}
      {isAdmin && (
        <div className="admin-actions">
          <button onClick={() => onEdit(sweet)}>Edit</button>
          <button onClick={() => onDelete(sweet._id)}>Delete</button>
          <button onClick={() => onRestock(sweet._id)}>Restock</button>
        </div>
      )}
    </div>
  );
}
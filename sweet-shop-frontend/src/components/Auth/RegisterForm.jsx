import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await registerUser({ name, email, password, role });
      const { token, ...user } = data;
      login(user, token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <label>
        Name
        <input value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Email
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      </label>
      <label>
        Password
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      </label>
      <label>
        Role
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
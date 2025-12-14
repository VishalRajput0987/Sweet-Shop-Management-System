import client from "./client";

export async function registerUser(data) {
  const res = await client.post("/api/auth/register", data);
  return res.data;
}

export async function loginUser(data) {
  const res = await client.post("/api/auth/login", data);
  return res.data;
}
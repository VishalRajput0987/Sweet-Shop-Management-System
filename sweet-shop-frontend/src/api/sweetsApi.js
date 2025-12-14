import client from "./client";

export async function fetchSweets() {
  const res = await client.get("/api/sweets");
  return res.data;
}

export async function searchSweets(params) {
  const res = await client.get("/api/sweets/search", { params });
  return res.data;
}

export async function createSweet(data) {
  const res = await client.post("/api/sweets", data);
  return res.data;
}

export async function updateSweet(id, data) {
  const res = await client.put(`/api/sweets/${id}`, data);
  return res.data;
}

export async function deleteSweet(id) {
  const res = await client.delete(`/api/sweets/${id}`);
  return res.data;
}

export async function purchaseSweet(id, quantity = 1) {
  const res = await client.post(`/api/sweets/${id}/purchase`, { quantity });
  return res.data;
}

export async function restockSweet(id, quantity = 1) {
  const res = await client.post(`/api/sweets/${id}/restock`, { quantity });
  return res.data;
}
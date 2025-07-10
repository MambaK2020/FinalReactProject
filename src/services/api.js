import axios from "axios";

export const petInstance = axios.create({
  baseURL: "http://localhost:3333",
});

export const fetchAllCategories = async () => {
  const { data } = await petInstance.get("/categories/all");
  return data;
};

export const fetchCategoryById = async (categoryId) => {
  const { data } = await petInstance.get(`/categories/${categoryId}`);
  return data;
};

export const fetchAllProducts = async () => {
  const { data } = await petInstance.get("/products/all");
  return data;
};

export const fetchProductById = async (productId) => {
  const { data } = await petInstance.get(`/products/${productId}`);
  return data;
};

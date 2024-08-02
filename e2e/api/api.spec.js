import { test, expect } from "@playwright/test";

const API_BASE_URL = "https://fakestoreapi.com";

test.describe("E-commerce API", () => {
  test("GET /products returns all products", async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/products`);
    expect(response.ok()).toBeTruthy();
    const products = await response.json();
    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);
  });

  test("GET /products/{id} returns a single product", async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/products/1`);
    expect(response.ok()).toBeTruthy();
    const product = await response.json();
    expect(product).toHaveProperty("id", 1);
    expect(product).toHaveProperty("title");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("description");
    expect(product).toHaveProperty("category");
  });

  test("GET /products/categories returns all categories", async ({
    request,
  }) => {
    const response = await request.get(`${API_BASE_URL}/products/categories`);
    expect(response.ok()).toBeTruthy();
    const categories = await response.json();
    expect(Array.isArray(categories)).toBeTruthy();
    expect(categories.length).toBeGreaterThan(0);
  });

  test("GET /products/category/{categoryName} returns products in a specific category", async ({
    request,
  }) => {
    const response = await request.get(
      `${API_BASE_URL}/products/category/electronics`,
    );
    expect(response.ok()).toBeTruthy();
    const products = await response.json();
    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);
    expect(
      products.every((product) => product.category === "electronics"),
    ).toBeTruthy();
  });
});

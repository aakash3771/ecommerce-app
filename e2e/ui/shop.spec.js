import { test, expect } from "@playwright/test";

test.describe("E-commerce Application", () => {
  test("Homepage loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/MyEcommerce/);
    await expect(page.locator('h1:has-text("MyEcommerce")')).toBeVisible();
    await expect(page.locator(".card")).toHaveCount(20);
  });

  test("Can filter products by category", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Electronics");
    await expect(page.locator(".card")).toHaveCount(6);
    await expect(
      page.locator('.card-text:has-text("electronics")'),
    ).toHaveCount(6);
  });

  test("Can search for a specific product", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[placeholder="Search products..."]', "laptop");
    await page.click('button:has-text("Search")');
    await expect(page.locator('.card-title:has-text("laptop")')).toBeVisible();
  });

  test("Can view product details", async ({ page }) => {
    await page.goto("/");
    await page.click(".card:first-child a");
    await expect(page.locator("h2")).toBeVisible();
    await expect(page.locator("img")).toBeVisible();
    await expect(page.locator('button:has-text("Add to Cart")')).toBeVisible();
  });

  test("Can add product to cart", async ({ page }) => {
    await page.goto("/");
    await page.click('.card:first-child button:has-text("Add to Cart")');
    await expect(page.locator(".Toastify__toast--success")).toBeVisible();
    await expect(page.locator('a:has-text("Cart")')).toContainText("(1)");
  });

  test("Can adjust quantity in cart", async ({ page }) => {
    await page.goto("/");
    await page.click('.card:first-child button:has-text("Add to Cart")');
    await page.click('a:has-text("Cart")');
    await page.fill('input[type="number"]', "2");
    await expect(page.locator('td:has-text("2")')).toBeVisible();
  });

  test("Can remove product from cart", async ({ page }) => {
    await page.goto("/");
    await page.click('.card:first-child button:has-text("Add to Cart")');
    await page.click('a:has-text("Cart")');
    await page.click('button:has-text("Remove")');
    await expect(
      page.locator('p:has-text("Your cart is empty")'),
    ).toBeVisible();
  });

  test("Can complete checkout process", async ({ page }) => {
    await page.goto("/");
    await page.click('.card:first-child button:has-text("Add to Cart")');
    await page.click('a:has-text("Cart")');
    await page.click('a:has-text("Proceed to Checkout")');
    await page.fill('input[name="firstName"]', "John");
    await page.fill('input[name="lastName"]', "Doe");
    await page.fill('input[name="email"]', "john.doe@example.com");
    await page.fill('input[name="phone"]', "1234567890");
    await page.fill('input[name="addressLine1"]', "123 Main St");
    await page.selectOption('select[name="country"]', "United States");
    await page.selectOption('select[name="city"]', "New York");
    await page.fill('input[name="zipCode"]', "10001");
    await page.click('button:has-text("Place Order")');
    await expect(page.locator(".Toastify__toast--success")).toContainText(
      "Order placed successfully",
    );
  });

  test("Can view order history", async ({ page }) => {
    // This test assumes the user has placed an order and is logged in
    await page.goto("/account");
    await page.click('button:has-text("My Orders")');
    await expect(page.locator("table")).toBeVisible();
    await expect(page.locator('td:has-text("Pending")')).toBeVisible();
  });
});

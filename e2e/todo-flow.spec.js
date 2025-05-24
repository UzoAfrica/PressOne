import { test, expect } from '@playwright/test';


test.describe('Todo Application Flow', () => {
  test('complete todo workflow', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[placeholder="Username"]', 'testuser');
    await page.click('button:has-text("Login")');
    
    // Verify redirect to todo page
    await expect(page).toHaveURL('/');
    
    // Create 3 todos
    const todos = ['Buy groceries', 'Walk the dog', 'Read a book'];
    for (const todo of todos) {
      await page.fill('input[placeholder="Add a todo"]', todo);
      await page.press('input[placeholder="Add a todo"]', 'Enter');
      // Wait for todo to appear in the list
      await expect(page.locator(`text=${todo}`)).toBeVisible();
    }
    
    // Verify all todos are present
    await expect(page.locator('li')).toHaveCount(3);
    
    // Delete the second todo
    const todoToDelete = 'Walk the dog';
    await page.locator(`li:has-text("${todoToDelete}") button`).click();
    
    // Verify todo was deleted
    await expect(page.locator(`text=${todoToDelete}`)).not.toBeVisible();
    await expect(page.locator('li')).toHaveCount(2);
    
    // Test filters
    await page.selectOption('select', 'short');
    await expect(page.locator('li')).toHaveCount(0);
    
    await page.selectOption('select', 'all');
    await expect(page.locator('li')).toHaveCount(2);
    
    // Logout (simulated by clearing localStorage and navigating to login)
    await page.evaluate(() => localStorage.clear());
    await page.goto('/login');
    await expect(page).toHaveURL('/login');
  });
});
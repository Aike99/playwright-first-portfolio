import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Update Pet Type', async ({page}) => {
    // Step 1 select PET Types menu item
   await page.getByRole('link',{name:'PET TYPES'}).click()

   // Step 2 Assert "Pet Types" text is displayed above the table
   await expect (page.getByRole('heading',{name:'Pet Types'})).toBeVisible()

   // Step 3 Click on "Edit" button for the cat row
   await page.getByRole('button',{name:'Edit'}).first().click()

   // Step 4 Assert "Edit Pet Type" text is displayed
   await expect (page.getByRole('heading',{name:'Edit Pet Type'})).toBeVisible()

   // Step 5 Change "cat" to "rabbit" and click "Update" button 
   await page.waitForLoadState('networkidle')
   await page.locator('#name').fill('rabbit')
   const updateButton = page.getByRole('button',{name:'update'})
   await updateButton.click()

   // Step 6 Assert that the first pet type has value "rabbit"
   await expect (page.locator('[id="0"]')).toHaveValue('rabbit')

   // Step 7 Click on "Edit" on the "rabbit row"
   await page.getByRole('button',{name:'Edit'}).first().click()

   // Step 8 Change "rabbit" to "cat" and click "Update" button 
   const changePetName = page.locator('#name')
   await changePetName.waitFor({state: 'visible'})
   await changePetName.click()
   await changePetName.clear()
   await changePetName.pressSequentially('cat',{delay: 50})
  
   await changePetName.blur()
   await updateButton.click()

   await page.waitForLoadState('networkidle')
   await expect (page.locator('[id="0"]')).toHaveValue('cat')
});

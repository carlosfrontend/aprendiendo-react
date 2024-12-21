// @ts-check
import { test, expect } from '@playwright/test'

const LOCAL_URL = 'http://localhost:5173'
const CAT_FACT_BASE_URL = 'https://cataas.com/cat/says/'

test('should display a cat fact and a cat image', async ({ page }) => {
  await page.goto(LOCAL_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  /*   console.log({
    textContent,
    imageSrc
  }) */
  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_FACT_BASE_URL)).toBeTruthy()
})

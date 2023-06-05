import axios from 'axios';
import fs from 'fs';
import path from 'path';
import products from './products';

// Function to download an image given a URL
async function downloadImage(url, folderPath, fileName) {
  const writer = fs.createWriteStream(path.join(folderPath, fileName));

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

// Function to create a folder for each product's images
function createProductFolder(productId) {
  const folderPath = path.join('assets', `product_${productId}`);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  return folderPath;
}

// Function to scrape and download thumbnail and images for each product
async function scrapeImages() {
  for (const product of products) {
    if (product.id > 63) {
      const { id, thumbnail, images } = product;

      // Create a folder for each product's images
      const folderPath = createProductFolder(id);

      // Download the thumbnail image
      const thumbnailFileName = 'thumbnail.jpg';
      await downloadImage(thumbnail, folderPath, thumbnailFileName);
      console.log(`Thumbnail image for product ${id} downloaded.`);

      // Download each image and save it in the product's folder
      for (let i = 0; i < images.length; i++) {
        const imageUrl = images[i];
        const imageFileName = `image_${i + 1}.jpg`;

        await downloadImage(imageUrl, folderPath, imageFileName);
        console.log(`Image ${i + 1} for product ${id} downloaded.`);
      }
    }
  }
}

// Call the function to start scraping and downloading images
scrapeImages()
  .then(() => console.log('All images downloaded successfully.'))
  .catch((error) => console.error('Error downloading images:', error));

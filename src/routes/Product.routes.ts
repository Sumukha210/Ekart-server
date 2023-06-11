import express from 'express';
import { getBrands, getCategories, getProducts, getProductsBySearchedText } from '../controller/Product.controller';

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/brands', getBrands);
router.get('/:search', getProductsBySearchedText);

export default router;

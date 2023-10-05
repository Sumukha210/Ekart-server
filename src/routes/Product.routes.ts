import express from 'express';
import { getBrands, getCategories, getIndividualProductById, getProducts, getProductsBySearchedText } from '../controller/Product.controller';

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/brands', getBrands);
router.get('/search/:search', getProductsBySearchedText);
router.get('/:id', getIndividualProductById);

export default router;

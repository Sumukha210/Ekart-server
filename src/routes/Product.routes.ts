import express from 'express';
import { getCategories, getProducts } from '../controller/Product.controller';

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategories);

export default router;

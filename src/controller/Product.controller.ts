import { Request, Response } from 'express';
import ProductModel from '../model/Product.model';
import { errorResponse, successResponse } from '../utils/response';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const featured = req.query?.featured;
    const topRated = req.query?.topRated;
    const limit =
      ('limit' in req.query && parseInt(req.query.limit as string)) || 10;
    const skip =
      ('skip' in req.query && parseInt(req.query.skip as string)) || 0;

    let query = ProductModel.find();

    if (featured) {
      query = query.find({ featured: true });
    }

    if (topRated) {
      query = query.find().sort({ rating: -1 });
    }

    const products = await query.skip(skip).limit(limit);

    successResponse(res, products, { skip, limit });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getCategories = async (_: Request, res: Response) => {
  try {
    const categories = await ProductModel.distinct('category');
    successResponse(res, categories);
  } catch (error) {
    errorResponse(res, error);
  }
};

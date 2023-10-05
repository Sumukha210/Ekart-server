import { Request, Response } from 'express';
import ProductModel from '../model/Product.model';
import { errorResponse, successResponse } from '../utils/response';
import mongoose from 'mongoose';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { sortBy, ratings, priceBetween, brands, categories, limit, skip, featured } = req.query as { [key: string]: string };

    const filter: any = {};

    let sortCriteria = {};
    if (sortBy === 'popularity') {
      sortCriteria = { rating: -1 };
    } else if (sortBy === 'newest') {
      sortCriteria = { createdAt: -1 };
    } else if (sortBy === 'priceLowToHigh') {
      sortCriteria = { price: 1 };
    } else if (sortBy === 'priceHighToLow') {
      sortCriteria = { price: -1 };
    }

    if (ratings) {
      const minRating = parseInt(ratings);
      filter.rating = { $gte: minRating };
    }

    if (featured) {
      filter.featured = { $eq: true };
    }

    if (priceBetween) {
      let [min, max]: (number | string)[] = priceBetween.split(',');
      min = parseInt(min);
      max = parseInt(max);
      filter.price = { $lte: max || 5000, $gte: min || 1 };
    }

    if (brands) {
      const brandList = brands.split(',');
      filter.brand = { $in: brandList };
    }

    if (categories) {
      const categoryList = categories.split(',');
      filter.category = { $in: categoryList };
    }

    const newLimit = parseInt(limit) || 30;
    const newSkip = parseInt(skip) || 0;

    const total = await ProductModel.countDocuments(filter);
    const products = await ProductModel.find(filter).sort(sortCriteria).limit(newLimit).skip(newSkip);

    successResponse(res, products, { limit: newLimit, skip: newSkip, total });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getIndividualProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    console.log('id', id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, 'Invalid product ID', 404);
    }

    const product = await ProductModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'products',
          let: { category: '$category', brand: '$brand' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [{ $eq: ['$category', '$$category'] }, { $eq: ['$brand', '$$brand'] }],
                },
              },
            },
            { $limit: 4 },
          ],
          as: 'similarProducts',
        },
      },
    ]);

    if (product.length === 0) {
      return errorResponse(res, 'Product Not found', 404);
    }

    successResponse(res, product[0]);
  } catch (error) {
    console.error(error);
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

export const getBrands = async (_: Request, res: Response) => {
  try {
    const categories = await ProductModel.distinct('brand');
    successResponse(res, categories);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getProductsBySearchedText = async (req: Request, res: Response) => {
  try {
    const text = req.params.search;
    let products = await ProductModel.find(
      { $text: { $search: text } },
      {
        _id: 1,
        id: 1,
        title: 1,
        category: 1,
        brand: 1,
        score: { $meta: 'textScore' },
      }
    ).lean();

    const modifiedProducts = products.map((product) => ({
      ...product,
      title: product.title.replace(new RegExp(`(${text})`, 'gi'), (match) => `<b>${match}</b>`),
    }));

    successResponse(res, modifiedProducts);
  } catch (error) {
    errorResponse(res, error);
  }
};

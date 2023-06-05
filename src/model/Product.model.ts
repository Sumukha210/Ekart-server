import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  featured: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    featured: { type: Boolean, default: false },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductModel = model<IProduct>('Product', productSchema);

export default ProductModel;

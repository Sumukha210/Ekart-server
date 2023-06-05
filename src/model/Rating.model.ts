import { Schema, model, Document, SchemaDefinitionProperty } from 'mongoose';

interface IRating extends Document {
  userId: SchemaDefinitionProperty<string> | undefined;
  productId: SchemaDefinitionProperty<string> | undefined;
  description: string;
  rating: number;
}

const ratingSchema = new Schema<IRating>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
});

const RatingModel = model<IRating>('Rating', ratingSchema);

export default RatingModel;

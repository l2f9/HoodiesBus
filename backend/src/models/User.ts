import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'manufacturer' | 'admin';
  profileImage?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  manufacturerDetails?: {
    businessName: string;
    description: string;
    rating: number;
    completedOrders: number;
    subscriptionTier: 'free' | 'pro' | 'premium';
    subscriptionExpiry?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'manufacturer', 'admin'],
      default: 'customer',
    },
    profileImage: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    manufacturerDetails: {
      businessName: String,
      description: String,
      rating: {
        type: Number,
        default: 0,
      },
      completedOrders: {
        type: Number,
        default: 0,
      },
      subscriptionTier: {
        type: String,
        enum: ['free', 'pro', 'premium'],
        default: 'free',
      },
      subscriptionExpiry: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);

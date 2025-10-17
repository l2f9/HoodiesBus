import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  orderId: string;
  customerId: mongoose.Types.ObjectId;
  manufacturerId?: mongoose.Types.ObjectId;
  designId: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'in_production' | 'completed' | 'cancelled';
  quantity: number;
  pricing: {
    basePrice: number;
    customizationCost: number;
    fabricCost: number;
    platformFee: number;
    totalPrice: number;
  };
  payment: {
    method: 'paypal' | 'razorpay';
    transactionId?: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    paidAt?: Date;
  };
  shipping: {
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    trackingNumber?: string;
    estimatedDelivery?: Date;
  };
  manufacturingSheet?: string; // URL to PDF
  notes?: string;
  timeline: {
    placedAt: Date;
    acceptedAt?: Date;
    productionStartedAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    manufacturerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    designId: {
      type: Schema.Types.ObjectId,
      ref: 'Design',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'in_production', 'completed', 'cancelled'],
      default: 'pending',
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    pricing: {
      basePrice: {
        type: Number,
        required: true,
      },
      customizationCost: {
        type: Number,
        default: 0,
      },
      fabricCost: {
        type: Number,
        default: 0,
      },
      platformFee: {
        type: Number,
        default: 0,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
    payment: {
      method: {
        type: String,
        enum: ['paypal', 'razorpay'],
        required: true,
      },
      transactionId: String,
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
      },
      paidAt: Date,
    },
    shipping: {
      address: {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        zipCode: {
          type: String,
          required: true,
        },
      },
      trackingNumber: String,
      estimatedDelivery: Date,
    },
    manufacturingSheet: String,
    notes: String,
    timeline: {
      placedAt: {
        type: Date,
        default: Date.now,
      },
      acceptedAt: Date,
      productionStartedAt: Date,
      completedAt: Date,
      cancelledAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('Order', OrderSchema);

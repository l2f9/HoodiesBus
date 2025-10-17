import mongoose, { Document, Schema } from 'mongoose';

export interface IDesign extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  hoodieType: 'oversized' | 'zip-up' | 'cropped' | 'pullover' | 'athletic';
  baseColor: string;
  fabric: string;
  customization: {
    frontPrint?: {
      type: 'image' | 'text' | 'pattern';
      content: string;
      position: { x: number; y: number; z: number };
      scale: { x: number; y: number };
      rotation: number;
    };
    backPrint?: {
      type: 'image' | 'text' | 'pattern';
      content: string;
      position: { x: number; y: number; z: number };
      scale: { x: number; y: number };
      rotation: number;
    };
    sleevePrint?: {
      type: 'image' | 'text' | 'pattern';
      content: string;
      position: { x: number; y: number; z: number };
      scale: { x: number; y: number };
      rotation: number;
    };
    hood?: {
      depth: number;
      drawstringColor: string;
    };
  };
  measurements: {
    chest: number;
    length: number;
    sleeve: number;
    shoulder: number;
    waist: number;
  };
  thumbnail?: string;
  model3DUrl?: string;
  isPublic: boolean;
  likes: number;
  views: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const DesignSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    hoodieType: {
      type: String,
      enum: ['oversized', 'zip-up', 'cropped', 'pullover', 'athletic'],
      required: true,
    },
    baseColor: {
      type: String,
      required: true,
    },
    fabric: {
      type: String,
      required: true,
    },
    customization: {
      frontPrint: {
        type: {
          type: String,
          enum: ['image', 'text', 'pattern'],
        },
        content: String,
        position: {
          x: Number,
          y: Number,
          z: Number,
        },
        scale: {
          x: Number,
          y: Number,
        },
        rotation: Number,
      },
      backPrint: {
        type: {
          type: String,
          enum: ['image', 'text', 'pattern'],
        },
        content: String,
        position: {
          x: Number,
          y: Number,
          z: Number,
        },
        scale: {
          x: Number,
          y: Number,
        },
        rotation: Number,
      },
      sleevePrint: {
        type: {
          type: String,
          enum: ['image', 'text', 'pattern'],
        },
        content: String,
        position: {
          x: Number,
          y: Number,
          z: Number,
        },
        scale: {
          x: Number,
          y: Number,
        },
        rotation: Number,
      },
      hood: {
        depth: Number,
        drawstringColor: String,
      },
    },
    measurements: {
      chest: {
        type: Number,
        required: true,
      },
      length: {
        type: Number,
        required: true,
      },
      sleeve: {
        type: Number,
        required: true,
      },
      shoulder: {
        type: Number,
        required: true,
      },
      waist: {
        type: Number,
        required: true,
      },
    },
    thumbnail: String,
    model3DUrl: String,
    isPublic: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDesign>('Design', DesignSchema);

import mongoose, { Schema, Document } from 'mongoose';

interface IAlimentoTaco extends Document {
  id: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  energy: {
    label: string;
    value: number;
    unit: string;
  };
  protein: {
    label: string;
    value: number;
    unit: string;
  };
  carbohydrate: {
    label: string;
    value: number;
    unit: string;
  };
  
}

const AlimentoTacoSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  energy: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  protein: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  carbohydrate: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
});

const AlimentoTaco = mongoose.model<IAlimentoTaco>('AlimentoTaco', AlimentoTacoSchema);

export default AlimentoTaco;

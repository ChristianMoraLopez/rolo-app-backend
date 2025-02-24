
// src/models/Location.ts

import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    sensations: [String],
    smells: [String],
    images: [{
      src: String,
      width: Number,
      height: Number
    }],
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{
      content: String,
      createdAt: { type: Date, default: Date.now },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
  });
  
  export const Location = mongoose.model('Location', locationSchema);
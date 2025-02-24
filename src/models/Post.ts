// src/models/Post.ts

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    shared: { type: Number, default: 0 }
  });
  
  export const Post = mongoose.model('Post', postSchema);
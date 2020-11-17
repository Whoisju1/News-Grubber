import mongoose from 'mongoose';

const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export default noteSchema;

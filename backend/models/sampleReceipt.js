import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleReceiptSchema = new Schema({
  samplereceiptid: String,
  studyname: {
    type: String,
    validate: {
      validator: (value) => value.length >= 2 && value.length <= 255,
      message: 'Study name must be between 2 and 255 characters.',
    },
  },
  subject: String,
  visitname: String,
  visitdate: Date,
  ageatvisit: String,
  samplecollectiondate: Date,
  blooddrawtime: String, // Use String for TIME, or consider using Date and parsing it accordingly
  samplereceiptdate: Date,
  samplereceipttime: String, // Use String for TIME, or consider using Date and parsing it accordingly
  hematologysample: String,
  chemistrysample: String,
  humoralsample: String,
  cellularsample: String,
  comments: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }, // Assuming there is a User model
}, {
  timestamps: true,
});

const SampleReceipt = mongoose.model('SampleReceipt', sampleReceiptSchema);

export default SampleReceipt;

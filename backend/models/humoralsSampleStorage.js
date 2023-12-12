import mongoose from 'mongoose';

const { Schema } = mongoose;

const humoralsSampleStorageSchema = new Schema({
  humoralsamplestorageid: String,
  boxid: String,
  aliquotid: String,
  subject: String,
  visitname: String,
  sampletype: String,
  aliquot: String,
  aid: String,
  roomlocation: String,
  freezernumber: Number,
  boxnumber: Number,
  columnnumber: Number,
  rownumber: Number,
  shipped: String,
  shippeddate: Date,
  comments: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }, // Assuming there is a User model
}, {
  timestamps: true,
});

const HumoralsSampleStorage = mongoose.model('HumoralsSampleStorage', humoralsSampleStorageSchema);

export default HumoralsSampleStorage;


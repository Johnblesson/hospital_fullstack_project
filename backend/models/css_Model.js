import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleReceiptSchema = new Schema({
  // studyname: {
  //   type: String,
  //   validate: {
  //     validator: (value) => value.length >= 2 && value.length <= 255,
  //     message: 'Study name must be between 2 and 255 characters.',
  //   },
  //   required: true,
  // },
  studyName: String,
  subject: String,
  visitName: String,
  visitDate: Date,
  ageAtVisit: String,
  dateSampleCollection: Date,
  timeOfSampleCollection: String, // Use String for TIME, or consider using Date and parsing it accordingly
  dateOfSampleReceipt: Date,
  timeOfSampleReceipt: String, // Use String for TIME, or consider using Date and parsing it accordingly
  comments: String,
  dateOfEntry: Date,
  entryDoneBy: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }, // Assuming there is a User model
}, {
  timestamps: true,
});

const CSS = mongoose.model('Cross-sectional Survey-CSS', sampleReceiptSchema);

export default CSS;

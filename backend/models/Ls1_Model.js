import mongoose from 'mongoose';

const { Schema } = mongoose;

const ls1StorageSchema = new Schema({
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

const Ls1Model = mongoose.model('LS1', ls1StorageSchema);

export default Ls1Model;


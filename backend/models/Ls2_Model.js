import mongoose from 'mongoose';

const { Schema } = mongoose;

const ls2Schema = new Schema({
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

const Ls2Model = mongoose.model('LS2', ls2Schema);

export default Ls2Model;

import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidateName: { type: String, required: true },
  candidateEmail: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Reviewed', 'Approved', 'Rejected', 'Interviewing'], // Added 'Interviewing'
    default: 'Pending' 
  },
  atsScore: { type: Number, required: false },
}, {
  timestamps: true,
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
import mongoose from "mongoose";


const { Schema } = mongoose;


// Sub-schema for Education
const EducationSchema = new Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  start_date: { type: String },
  end_date: { type: String }
});

// Sub-schema for Experience
const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  start_date: { type: String },
  end_date: { type: String },
  description: { type: String }
});

// Main Profile Schema
const ProfileSchema = new Schema({
  full_name: { type: String },
  headline: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  location: { type: String },

  college: { type: String },
  department: { type: String },
  year_of_study: { type: String },

  linkedin_url: { type: String },
  github_url: { type: String },
  portfolio_url: { type: String },
  photo_url: { type: String },

  summary: { type: String },

  skills: [{ type: String }],
  education: [EducationSchema],
  experience: [ExperienceSchema],
  
  // Using generic Objects for 'any' types, or you can define schemas for them later
  projects: [Schema.Types.Mixed], 
  certifications: [Schema.Types.Mixed],
  achievements: [Schema.Types.Mixed],
  
  languages: [{ type: String }],

  cv_template: { type: String, default: 'default' },
  is_public: { type: Boolean, default: false },

}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});





const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);


///Program 

const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['Workshop', 'Summit', 'Competition', 'Training', 'Bootcamp'] 
  },
  emoji: { type: String, default: '📅' },
  status: { 
    type: String, 
    required: true, 
    enum: ['upcoming', 'ongoing', 'past'],
    default: 'upcoming'
  },
  seats: { type: Number, required: true, min: 0 },
  enrolled: { type: Number, default: 0, min: 0 },
  date: { type: String, required: true }, // or Date type if you prefer ISO dates
  description: { type: String, required: true },
  location: { type: String },
  tags: [{ type: String }],
  requirements: { type: String }
}, { timestamps: true });

// Check if seats are available
ProgramSchema.virtual('isFull').get(function() {
  return this.enrolled >= this.seats;
});

const Program = mongoose.models.Program ||  mongoose.model('Program', ProgramSchema);


///Post

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String },
  date: { type: String, required: true },
  author: { type: String, required: true },
  readTime: { type: Number, required: true }, // In minutes
  emoji: { type: String, default: '📝' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

// Indexing title for better search performance
PostSchema.index({ title: 'text', category: 'text' });

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

//Enrollment 

const EnrollmentSchema = new Schema({
  // Reference to the Program
  programId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Program', 
    required: true 
  },
  // Reference to the User (matches your User interface id)
  userId: { 
    type: String, // String because your interface says id: string
    required: true 
  },
  userName: { type: String, required: true },
  programTitle: { type: String, required: true },
  enrolledAt: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['confirmed', 'waitlist', 'cancelled'], 
    default: 'confirmed' 
  }
});

// Avoid re-compiling the model in Next.js HMR
const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);


export { Profile, Program, Post,Enrollment };  
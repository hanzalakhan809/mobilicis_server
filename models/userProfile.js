const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    fromYearToYear: String,
    organizationWithRole: String
});

const ConnectionSchema = new mongoose.Schema({
    connectionName: String,
    connectionPosition: String
});

const HigherEducationSchema = new mongoose.Schema({
    higherEducationInstitute: String,
    fromYearToYear: String,
    course: String,
    aboutEducation: String
});

const CertificationSchema = new mongoose.Schema({
    certificationName: String,
    certificationInstitute: String
});

const UserProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    about: String,
    skills: [String],
    professionalDetails: String,
    certification: CertificationSchema,
    experiences: [ExperienceSchema],
    higherEducation: HigherEducationSchema,
    myConnections: [ConnectionSchema],
    suggestionConnectins: [ConnectionSchema]
});

module.exports = UserProfile = mongoose.model('userProfile', UserProfileSchema);

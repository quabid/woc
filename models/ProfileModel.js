// @ts-nocheck
import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId;
        ref: 'User'
    },
    userName: {
        type:String,
        unique: true
    },
    firstName: {
        type:String,
    },
    lastName: {
        type:String,
    },
    imageUrl: {
        type:String,
    },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
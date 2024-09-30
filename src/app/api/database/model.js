import mongoose from 'mongoose';

export const userModel = (schemaDefinition) => {
    const UserDetailsSchema = new mongoose.Schema(schemaDefinition);
    return mongoose.model('UserDetails', UserDetailsSchema);
};
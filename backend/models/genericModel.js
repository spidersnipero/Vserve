const mongoose = require('mongoose');

// Define a generic schema that doesn't enforce a fixed schema
const genericSchema = new mongoose.Schema({}, { strict: false });

function createGenericModel(name){
    // returning if already exists to avoid OverwriteModelError
    if(mongoose.models[name]) return mongoose.model(name);
    return mongoose.model(name, genericSchema);
}

module.exports = createGenericModel;
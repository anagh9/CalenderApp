let mongoose = require("mongoose");


DateSchema = mongoose.Schema({
    date: {type:String,unique : true, required : true, dropDups: true},
})
// DateSchema.pre("save",(next)=>{

// })
module.exports = mongoose.model("Date",DateSchema);
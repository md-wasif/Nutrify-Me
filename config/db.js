const mongoose = require('mongoose');



const connectDB = async () => {
  try
  {

  mongoose.connect('mongodb://localhost/NutrifyMe', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
   // useCreateIndex: true
  });

  mongoose.connection.on('error', function(error) {
            console.error('DATABASE CONNECTION ERROR:', error);
          });
          
        mongoose.connection.once('open', function() {
            console.log('DATABASE CONNECTED');
        });

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
  }


  
module.exports = connectDB;
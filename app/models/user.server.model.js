var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
          type: String,
          index: true,
          match: /.+\@.+\..+/
          },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    validate:[
      function(password){
        return password.length >= 6;
      },
      'Password should be longer'
    ],
  },
  created: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['Admin','Owner','User']
  },
  website: {
    type: String,
    get: function(url){
      if (!url){
        return url;
      }
      if (url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0){
          url = "http://" + url;
      }
      return url;
    },
    set: function(url){
      if (!url){
        return url;
      }
      else if (url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0){
        url = "http://" + url;
      }
      return url;
    }
  }
});

userSchema.statics.findOneByUsername = function(username, callback){
  this.findOne({username: new RegExp(username, 'i')}, callback);
};

userSchema.set("toJSON", {getters: true, virtuals: true});


mongoose.model("User", userSchema);

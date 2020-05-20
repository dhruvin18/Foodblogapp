const mongoose=require('mongoose');
const bcrypt=require('../node_modules/bcrypt/bcrypt');
const jwt=require('jsonwebtoken')

var userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: 'Full Name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [8,'Password must be atleast 8 characters'],
        maxlength: [16,'password must have 8-16 characters']
    },
    saltSecret: String
});
//custom validation Email
userSchema.path('email').validate((val)=>{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
},"Invalid Email");

//preEvent
userSchema.pre('save',function(next){
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltSecret=salt;
            next();
        });
    });
}); 

//Methods
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

userSchema.methods.generateJwt = function() {
    return jwt.sign({_id: this._id},
        'SECRET#123',
    {
        expiresIn: "30m"
    });

};

mongoose.model('User', userSchema)
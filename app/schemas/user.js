var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		unique:true,
		type:String
	},
	password: {
		type: String
	},
	// 0: normal user
	// 1: verified user
	// 2: professional user

	// >10: admin
	// >50: super admin
	role: {
		type: Number,
		default: 0
	},
	meta: {
		createAt: {
			type: Date,
			dafault:Date.now()
		},
		updateAt: {
			type:Date,
			default: Date.now()
		}
	},
});

UserSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}

	next();
});

UserSchema.method = {
	comparePassword:function(_password,cb){
		var isMath = false;
		if(_password === this.password){
			isMath = true;
			return cb(null,isMath);
		}
		else{
			cb('err');
		}
	}
}

UserSchema.statics = {
	fetch: function(cb){
		return this
		  .find({})
		  .sort('meta.updateAt')
		  .exec(cb)
	},
	findById: function(id,cb){
		return this
		  .findOne({_id:id})
		  .exec(cb)
	}
};

module.exports = UserSchema;
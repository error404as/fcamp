module.exports = {
	permalink: {type: String, required: true, index: true, unique: true, dropDups: true},
	headline:  {type: String, trim: true, required: true},
	body:      {type: String, required: true},
	author:    {type: String, required: true, index: true},
	image:    {type: String,},
	created:   {type: Date, default: Date.now, index: true},
	tags:      [{type: String}],
	source:    {type: String},
	comments:  [{ author: String, email: String, body: String, date: {type: Date, default: Date.now} }],
};


# FrontCamp

##Specs
- Express
- Passport.js
- MongoDB (Mongoose)
- Unit tests (Karma + Jasmine)
- React + Redux (for front view)
- Angular (for CMS view)

##Commands

`npm start` - starts express server on http://localhost:3000

`npm test` - execute a few basic tests and creates Test_coverage directory with results

`npm run test-w` - unit testing for development

`npm run build-front` - builds React based JS

`npm run build-cms` - builds Angular based JS

##Notes
- Repo miss 'config.js' in root folder. Its content looks like:
```
module.exports = {
	db_url: 'mongodb://localhost:27017/mydb'
};
```

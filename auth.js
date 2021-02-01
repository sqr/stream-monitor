const Datastore = require('nedb');
const bcrypt = require('bcrypt');


const users = new Datastore({ filename: 'users.db', timestampData: true, autoload: true });


const hashPasswordAsync = async (username, password) => {
	const salt = await bcrypt.genSalt()
	const hash = await bcrypt.hash(password, salt)
	/*
	 * Instead of logging on the console
	 * you can store the password on the DB
	 */
    console.log('the hash is :' + hash);
    users.insert({'username': username, 'password': hash}, function(err) {
      if (err) {
        console.log(err.message);
      } else {
        console.log('User added succesfully');
      }
    });
}

hashPasswordAsync('user', 'password');

/* 
var hashedpw = hashPasswordAsync('123456')

users.find({ _id: 'tpgZwSjvOjqsK1zK' }, function (err, docs) {
    // docs contains Mars
    console.log(docs);
    console.log('password from db is: '+ docs[0].password);

    var pw =  docs[0].password;
    
    var pw2 = '123456'

    var hashedpw2 = '$2b$10$KBqGFrDXYtL4HWoDNrkzPObuTWFSi.F6czScEvIR6fafszUWx40eq'
  })

var hashedpw2 = '$2b$10$ZivZD2XPuj.Hrr2bs2D8NObTVrvXeUl9c4LxCW5Yq6iovM7Jza7By'

var pw2 = '123456'


const isSame = async password => {
    const result = await bcrypt.compare(pw2, hashedpw2);
    console.log(result);
}

isSame();

 */

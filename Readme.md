# REF: https://www.youtube.com/watch?v=0D5EEKH97NA&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q
Init project:
RUN: npm init
RUN: npm install --save express
create file: server.js
Create file app.js
Create api folder (routing)
Handle Errors
=== RUN npm start need /////////
RUN: npm install -save-dev nodemon
- Add to package.json => 
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    "start": "nodemon server.js"
  },

```
- AND RUN: npm start

MORGAN // debug
RUN: npm install --save morgan

parser js

RUN: npm install --save body-parser



Ref: https://www.youtube.com/watch?v=blQ60skPzl0&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=2
Ref: https://blog.duyet.net/2015/08/nodejs-cac-package-ma-moi-lap-trinh.html#.XH5Du6T7TVo

MONGO:
https://cloud.mongodb.com
Short:
mongo "mongodb+srv://cluster0-m5uzt.mongodb.net/test" --username lethehienl
Full:

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://lethehienl:<password>@cluster0-m5uzt.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

# RUN
npm install
npm start

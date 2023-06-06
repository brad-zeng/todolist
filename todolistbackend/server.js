const express = require('express');

const app = express();

app.use(express.json())

let currIndex = 0;
let data = [{'username': '', 'password': '', 'list': {'item': false}}];





app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.post('/login', (req, res) => {
    req = req.body;
    for(let i = 0; i < data.length; i++){
        if(data[i]['username'] == req.username) {
            if(data[i]['password'] == req.password){
                currIndex = i;
                console.log(`Logged in as ${req.username}`);
                res.send(data[currIndex]['list']);
                return;
            }
            else{
                res.send('Username taken', 400);
                return;
            }
        }
    }
    currIndex = data.length;
    data.push({'username': req.username, 'password': req.password, 'list': {}});
    console.log(`Account with username ${req.username} created`);
    res.send(data[currIndex]['list']);
});

app.post('/toggleItem', (req, res) => {
    data[currIndex]['list'][req.body.item] = !data[currIndex]['list'][req.body.item];
    console.log(data[currIndex]['list']);
    res.send(data[currIndex]['list']);
});

app.post('/addItem', (req, res) => {
    if(!data[currIndex]['list'].hasOwnProperty(req.body.item)){
        data[currIndex]['list'][req.body.item] = false;
    }
    console.log(data[currIndex]['list']);
    res.send(data[currIndex]['list']);
});

app.post('/deleteItem', (req, res) => {
    delete(data[currIndex]['list'][req.body.item]);
    console.log(data[currIndex]['list']);
    res.send(data[currIndex]['list']);
});

app.get('/items', (req, res) => {
    res.json(data[currIndex]['list']);
})



app.listen(3000, () => console.log('Example app is listening on port 3000.'));
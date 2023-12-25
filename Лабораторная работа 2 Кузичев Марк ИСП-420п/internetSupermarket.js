var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var jsonParser = bodyParser.json()

let id= [1, 2, 3]
let products = ["Молоко", "Сахар", "Хлеб"];
const allArray =[];
var countDeleteId = 0;

//Просмотр продуктов
app.get('/products', function (req, res) {
    for (let i = 0; i< id.length; i++){
        
        let all = {
            id: id[i],
            product: products[i]
        };
        allArray.push(all);
    }
    res.send(allArray);
    allArray.splice(0,allArray.length);
});

app.get('/products/:id', function (req, res) {
    var z = false;
    i = req.params.id;
    for(idArr in id){
        if (i==id[idArr]){
            z=true;
            break;
        }
    }
    if (z){
        res.send(id[i-1] + " " + products[i-1]);
    }
    else{
        res.send("Продукта с индексом " + i + " не существует");
    }
    
});

//Управление продуктами
app.post('/products', jsonParser, function (req, res) {
    id.push(id.length + 1 + countDeleteId);
    products.push(req.body.product);
    res.send("Добавлен продукт " + req.body.product);
});

app.put('/products/:id',jsonParser, function (req, res) {
    var z = false;
    i = req.params.id;
    for(idArr in id){
        if (i==id[idArr]){
            z=true;
            break;
        }
    }
    if (i<=products.length & z){
        products[i-1] = req.body.newValue;
        res.send("Значение с индексом " + i + " заменено на " + req.body.newValue);
        
    }
    else{
        res.send('Продукта индексом ' + i + " не существует");
    }
    
});

app.delete('/products/:id',jsonParser, function (req, res) {

    var z = false;
    let i = req.params.id;
    for(idArr in id){
        if (i==id[idArr]){
            z=true;
            break;
        }
    }
    if (i<=products.length & z){
        products.splice(i-1,1);
        id.splice(i-1,1);
        countDeleteId++;
        res.send("Значение с индексом " + i + " удалено");
        
    }
    else{
        res.send('Продукта индексом ' + i + " не существует");
    }
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
const products = ["Молоко", "Сахар", "Хлеб", "Рыба", "Мясо", "Икра"];


db.serialize(function () {
    db.run('CREATE TABLE ProductsType (type TEXT)');
    var stmt = db.prepare('INSERT INTO ProductsType VALUES (?)');

    for (i in products) {
        stmt.run(products[i]);
    }

    stmt.finalize();

    db.each(
        'SELECT rowid AS id, type FROM ProductsType',
        function (err, row) {
            console.log(row.id + ': ' + row.type);
        }
    );
});

db.close();
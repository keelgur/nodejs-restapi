var express = require('express');
var app = express();
var bParser = require('body-parser');

var materials = [
{
   id: 1,
   name: 'cotton'
},
{
   id: 2,
   name: 'basalt'
}
];

var crrntId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bParser.json());

app.get('/materials', function(req, res){
    res.send({ materials: materials });
});

app.post('/materials', function(req, res){
    var matName = req.body.name;
    crrntId++;

    materials.push({
        id: crrntId,
        name: matName
    });

    res.send('Successfully created material!');
});

app.put('/materials/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;

    var found = false;

    materials.forEach(function(material, index) {
       if(!found && material.id === Number(id)) {
          material.name = newName;
       }
    });
    res.send('Successfully updated product!');
});

app.delete('/materials/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    materials.forEach(function(material, index) {
        if (!found && material.id === Number(id)){
            materials.splice(index, 1);
        }
    });

    res.send('Successfully deleted material!');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});

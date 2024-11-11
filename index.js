import 'dotenv/config'
import express from 'express'

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let id = 1;
let teas = [];

// add new tea
app.post('/teas', (req, res) => {
    const {name, price} = req.body;
    const newTea = {id: id++, name, price};
    teas.push(newTea);
    res.status(200).send(newTea);
})

// get all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teas);
})

// get specific tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teas.filter(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Tea not found');
    } else {
        return res.status(200).send(tea);
    }
})

// update tea
app.put('/teas/:id', (req, res) => {
    const tea = teas.find(t => t.id === parseInt(req.params.id));
    console.log(tea);
    
    if (!tea) {
        return res.status(404).send('Tea not found');
    } else {
        const {name, price} = req.body;
        tea.name = name;
        tea.price = price;
        res.status(200).send(tea);
    }
})

// delete tea
app.delete('/teas/:id', (req, res) => {
    const index = teas.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Tea not found');
    } else {
        teas.splice(index, 1);
        res.status(204).send('deleted');
    }
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`); 
})
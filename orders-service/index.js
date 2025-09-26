const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/orders', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à la base de données commandes'))
    .catch(err => console.error('Erreur de connexion', err));

// Modèle de Commande
const OrderSchema = new mongoose.Schema({
    userId: String,
    productId: String,
    quantity: Number,
    status: { type: String, default: 'pending' }
});
const Order = mongoose.model('Order', OrderSchema);

// Routes
app.get('/orders', async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

app.post('/orders', async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Service Commande en écoute sur le port ${PORT}`);
});

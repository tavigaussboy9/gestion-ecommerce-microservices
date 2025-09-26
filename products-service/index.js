const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à la base de données produits'))
    .catch(err => console.error('Erreur de connexion', err));

// Modèle de Produit
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String
});
const Product = mongoose.model('Product', ProductSchema);

// Routes
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Service Produit en écoute sur le port ${PORT}`);
});

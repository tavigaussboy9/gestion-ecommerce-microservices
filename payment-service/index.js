const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/payments', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à la base de données paiements'))
    .catch(err => console.error('Erreur de connexion', err));

// Modèle de Paiement
const PaymentSchema = new mongoose.Schema({
    userId: String,
    orderId: String,
    amount: Number,
    paymentMethod: String,
    status: { type: String, default: 'pending' }
});
const Payment = mongoose.model('Payment', PaymentSchema);

// Routes
app.post('/payments', async (req, res) => {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).send(payment);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Service Paiement en écoute sur le port ${PORT}`);
});

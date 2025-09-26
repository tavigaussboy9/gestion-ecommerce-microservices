const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à la base de données utilisateurs'))
    .catch(err => console.error('Erreur de connexion', err));

// Modèle d'Utilisateur
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});
const User = mongoose.model('User', UserSchema);

// Routes
app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.status(201).send('Utilisateur créé');
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.send('Connexion réussie');
    } else {
        res.status(400).send('Identifiants invalides');
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Service Utilisateurs en écoute sur le port ${PORT}`);
});

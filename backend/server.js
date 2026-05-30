const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Données en mémoire (simule une base de données)
let users = [
  { id: 1, nom: 'Fatima', email: 'fatima@example.com' },
  { id: 2, nom: 'Omar', email: 'omar@example.com' }
];

// GET tous les utilisateurs
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET un seul utilisateur
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) res.json(user);
  else res.status(404).json({ message: 'Utilisateur non trouvé' });
});

// POST créer un utilisateur
app.post('/api/users', (req, res) => {
  const newUser = {
    id: Date.now(),
    nom: req.body.nom,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT modifier un utilisateur
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

// DELETE supprimer un utilisateur
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: 'Utilisateur supprimé' });
});

// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Back-end démarré sur http://localhost:${PORT}`);
});
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' // Autorise uniquement votre frontend Vite
}));

// Configuration de Nodemailer avec Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Mot de passe d'application (pas le mot de passe habituel)
  },
});

app.post('/send-email', async (req, res) => {
  const { nom, prenom, email, countryCode, telephone, sujet, message } = req.body;

  const mailOptions = {
    from: `"${prenom} ${nom}" <${process.env.EMAIL_USER}>`, // L'expéditeur technique doit être votre Gmail
    to: process.env.EMAIL_USER, // Vous recevez le mail
    replyTo: email, // Quand vous répondez, ça va au client
    subject: `Contact Farihy Hotel: ${sujet}`,
    html: `
      <h3>Nouveau message du site web</h3>
      <p><strong>De:</strong> ${prenom} ${nom}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${countryCode} ${telephone}</p>
      <hr/>
      <p><strong>Sujet:</strong> ${sujet}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès !');
    res.status(200).json({ success: true, message: 'Email envoyé' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur de mail démarré sur le port ${PORT}`);
});
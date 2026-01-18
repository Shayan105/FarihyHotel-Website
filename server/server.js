const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios'); // N'oubliez pas: npm install axios
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' // Autorise uniquement votre frontend Vite
}));

// Configuration Nodemailer (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fonction utilitaire pour vérifier le Captcha
const verifyRecaptcha = async (token) => {
  if (!token) return false;
  
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await axios.post(verifyUrl);
    return response.data.success;
  } catch (error) {
    console.error("Erreur vérification Captcha:", error);
    return false;
  }
};

// ==========================================
// ROUTE 1 : CONTACT SIMPLE
// ==========================================
app.post('/send-email', async (req, res) => {
  const { nom, prenom, email, countryCode, telephone, sujet, message, captchaToken } = req.body;

  // 1. Vérification du Captcha
  const isHuman = await verifyRecaptcha(captchaToken);
  if (!isHuman) {
    return res.status(400).json({ success: false, message: 'Échec de la validation Captcha' });
  }

  // 2. Préparation de l'email
  const mailOptions = {
    from: `"${prenom} ${nom}" <${process.env.EMAIL_USER}>`, 
    to: process.env.EMAIL_USER, 
    replyTo: email, 
    subject: `Contact Site Web: ${sujet}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 5px; overflow: hidden;">
        <div style="background-color: #4a3728; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-family: 'Playfair Display', serif;">Nouveau Message</h2>
        </div>
        <div style="padding: 20px;">
          <h3 style="background-color: #f2efe9; padding: 10px; color: #4a3728; border-left: 4px solid #4a3728;">
            👤 Informations Expéditeur
          </h3>
          <ul style="list-style: none; padding-left: 10px;">
            <li style="margin-bottom: 8px;"><strong>Nom complet :</strong> ${nom.toUpperCase()} ${prenom}</li>
            <li style="margin-bottom: 8px;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #4a3728;">${email}</a></li>
            <li style="margin-bottom: 8px;"><strong>Téléphone :</strong> ${countryCode} ${telephone}</li>
          </ul>
          <h3 style="background-color: #f2efe9; padding: 10px; color: #4a3728; border-left: 4px solid #4a3728;">
            ✉️ Le Message
          </h3>
          <div style="margin-left: 10px;">
            <p style="font-size: 1.1em; font-weight: bold; color: #4a3728;">Sujet : ${sujet}</p>
            <div style="background-color: #f8f9fa; padding: 15px; border: 1px solid #e9ecef; border-radius: 4px; color: #555; white-space: pre-wrap; line-height: 1.6;">
${message}
            </div>
          </div>
        </div>
        <div style="background-color: #f9f9f9; padding: 10px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e0e0e0;">
          Email envoyé via le formulaire de contact du site Farihy.
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de contact envoyé avec succès !');
    res.status(200).json({ success: true, message: 'Email envoyé' });
  } catch (error) {
    console.error('Erreur contact:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// ==========================================
// ROUTE 2 : RÉSERVATION
// ==========================================
app.post('/send-reservation', async (req, res) => {
  const { 
    dateArrivee, 
    dateDepart, 
    typeBungalow, 
    nbAdultes, 
    nbEnfants, 
    agesEnfants, 
    nom, 
    prenom, 
    countryCode, 
    telephone, 
    email, 
    questions,
    captchaToken // Récupération du token envoyé par le front
  } = req.body;

  // 1. Vérification du Captcha
  const isHuman = await verifyRecaptcha(captchaToken);
  if (!isHuman) {
    return res.status(400).json({ success: false, message: 'Échec de la validation Captcha' });
  }

  const detailsEnfants = nbEnfants > 0 
    ? `Oui (${nbEnfants}) - Âges: ${agesEnfants.join(', ')}` 
    : 'Aucun';

  // 2. Préparation de l'email
  const mailOptions = {
    from: `"${prenom} ${nom}" <${process.env.EMAIL_USER}>`, 
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `RESA Website: ${typeBungalow} - ${prenom} ${nom}`, 
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 5px; overflow: hidden;">
        <div style="background-color: #4a3728; padding: 20px; text-align: center;">
           <h2 style="color: #ffffff; margin: 0; font-family: 'Playfair Display', serif;">Nouvelle Réservation</h2>
        </div>
        <div style="padding: 20px;">
          <h3 style="background-color: #f2efe9; padding: 10px; color: #4a3728; border-left: 4px solid #4a3728;">
            👤 Client
          </h3>
          <ul style="list-style: none; padding-left: 10px;">
            <li style="margin-bottom: 8px;"><strong>Nom :</strong> ${nom ? nom.toUpperCase() : ''}</li>
            <li style="margin-bottom: 8px;"><strong>Prénom :</strong> ${prenom}</li>
            <li style="margin-bottom: 8px;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #4a3728;">${email}</a></li>
            <li style="margin-bottom: 8px;"><strong>Téléphone :</strong> ${countryCode} ${telephone}</li>
          </ul>
          <h3 style="background-color: #f2efe9; padding: 10px; color: #4a3728; border-left: 4px solid #4a3728;">
            📅 Détails du Séjour
          </h3>
          <ul style="list-style: none; padding-left: 10px;">
            <li style="margin-bottom: 8px;"><strong>Arrivée :</strong> ${dateArrivee}</li>
            <li style="margin-bottom: 8px;"><strong>Départ :</strong> ${dateDepart}</li>
            <li style="margin-bottom: 8px;"><strong>Bungalow souhaité :</strong> <span style="background-color: #4a3728; color: #fff; padding: 2px 6px; border-radius: 3px;">${typeBungalow}</span></li>
          </ul>
          <h3 style="background-color: #f2efe9; padding: 10px; color: #4a3728; border-left: 4px solid #4a3728;">
            👨‍👩‍👧‍👦 Occupants
          </h3>
          <ul style="list-style: none; padding-left: 10px;">
            <li style="margin-bottom: 8px;"><strong>Adultes :</strong> ${nbAdultes}</li>
            <li style="margin-bottom: 8px;"><strong>Enfants :</strong> ${detailsEnfants}</li>
          </ul>
          ${questions ? `
          <h3 style="background-color: #f2efe9; padding: 10px; color: #4a3728; border-left: 4px solid #4a3728;">
            💬 Message / Questions
          </h3>
          <div style="background-color: #f8f9fa; padding: 15px; border: 1px solid #e9ecef; border-radius: 4px; margin-left: 10px; color: #555;">
            ${questions}
          </div>
          ` : ''}
        </div>
        <div style="background-color: #f9f9f9; padding: 10px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e0e0e0;">
          Demande envoyée via le formulaire de réservation du site Farihy.
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Réservation reçue de ${prenom} ${nom}`);
    res.status(200).json({ success: true, message: 'Réservation envoyée' });
  } catch (error) {
    console.error('Erreur réservation:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Démarrage du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur de mail démarré sur le port ${PORT}`);
});
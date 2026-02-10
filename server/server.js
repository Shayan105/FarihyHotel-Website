const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' 
}));

// ==========================================
// CONFIGURATION: NODEMAILER
// ==========================================
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const verifyRecaptcha = async (token) => {
  if (!token) return false;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  try {
    const response = await axios.post(verifyUrl);
    return response.data.success;
  } catch (error) {
    return false;
  }
};

// ==========================================
// ROUTE 1: SIMPLE CONTACT
// ==========================================
app.post('/send-email', async (req, res) => {
  const { nom, prenom, email, countryCode, telephone, sujet, message, captchaToken } = req.body;

  const isHuman = await verifyRecaptcha(captchaToken);
  if (!isHuman) return res.status(400).json({ success: false, message: 'Captcha validation failed' });

  // --- EMAIL 1: TO ADMIN (BCC MANAGER) ---
  const mailToStaff = {
    from: `"${prenom} ${nom}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    bcc: process.env.EMAIL_MANAGER, // <--- HIDDEN FROM ADMIN
    replyTo: email, 
    subject: `🔔 Contact Site Web: ${sujet}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #4a3728;">Nouveau Message Reçu</h2>
        <p><strong>De :</strong> ${prenom} ${nom} (${email})</p>
        <p><strong>Téléphone :</strong> ${countryCode} ${telephone}</p>
        <hr>
        <p><strong>Sujet :</strong> ${sujet}</p>
        <p><strong>Message :</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #4a3728;">${message}</blockquote>
      </div>
    `,
  };

  const mailToClient = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
    to: email, 
    subject: `Nous avons bien reçu votre message - Farihy`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4a3728; padding: 20px; text-align: center; color: white;">
          <h1>Merci de nous avoir contactés</h1>
        </div>
        <div style="padding: 20px; color: #555;">
          <p>Bonjour ${prenom}, nous avons bien reçu votre message.</p>
          <p>Cordialement,<br>L'équipe Farihy</p>
        </div>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(mailToStaff),
      transporter.sendMail(mailToClient)
    ]);
    res.status(200).json({ success: true, message: 'Emails envoyés' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// ==========================================
// ROUTE 2: RESERVATION
// ==========================================
app.post('/send-reservation', async (req, res) => {
  const { 
    dateArrivee, dateDepart, typeBungalow, nbAdultes, nbEnfants, agesEnfants, 
    nom, prenom, countryCode, telephone, email, questions, captchaToken 
  } = req.body;

  const isHuman = await verifyRecaptcha(captchaToken);
  if (!isHuman) return res.status(400).json({ success: false, message: 'Captcha validation failed' });

  const detailsEnfants = nbEnfants > 0 ? `Oui (${nbEnfants}) - Âges: ${agesEnfants.join(', ')}` : 'Aucun';

  // --- EMAIL 1: TO ADMIN (BCC MANAGER) ---
  const mailToStaff = {
    from: `"${prenom} ${nom}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    bcc: process.env.EMAIL_MANAGER, // <--- HIDDEN FROM ADMIN
    replyTo: email,
    subject: `📅 Nouvelle Réservation: ${prenom} ${nom}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #4a3728;">Demande de Réservation</h2>
        <p><strong>Client :</strong> ${prenom} ${nom}</p>
        <p><strong>Dates :</strong> Du ${dateArrivee} au ${dateDepart}</p>
        <p><strong>Logement :</strong> ${typeBungalow}</p>
      </div>
    `,
  };

  const mailToClient = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
    to: email, 
    subject: `Confirmation de réception - Farihy`,
    html: `<p>Bonjour ${prenom}, votre demande est en cours de traitement.</p>`,
  };

  try {
    await Promise.all([
      transporter.sendMail(mailToStaff),
      transporter.sendMail(mailToClient)
    ]);
    res.status(200).json({ success: true, message: 'Réservation envoyée' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Mail server started on port ${PORT}`);
});

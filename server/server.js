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
    bcc: process.env.EMAIL_MANAGER, 
    replyTo: email, 
    subject: `🔔 Contact Site Web: ${sujet}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f5f7; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <div style="background-color: #4a3728; padding: 25px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Nouveau Message Reçu</h2>
          </div>
          <div style="padding: 30px; color: #333333; line-height: 1.6; font-size: 16px;">
            <p style="margin: 0 0 10px 0;"><strong>De :</strong> ${prenom} ${nom}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #4a3728;">${email}</a></p>
            <p style="margin: 0 0 20px 0;"><strong>Téléphone :</strong> ${countryCode} ${telephone}</p>
            
            <h3 style="color: #4a3728; border-bottom: 2px solid #eeeeee; padding-bottom: 8px; margin-top: 30px;">Sujet : ${sujet}</h3>
            <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #4a3728; border-radius: 4px; margin-top: 15px; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
      </div>
    `,
  };

  // --- EMAIL 2: TO CLIENT ---
  const mailToClient = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
    to: email, 
    subject: `Nous avons bien reçu votre message - Farihy`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f5f7; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <div style="background-color: #4a3728; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Merci de nous avoir contactés</h1>
          </div>
          <div style="padding: 30px; color: #555555; line-height: 1.6; font-size: 16px;">
            <p>Bonjour <strong>${prenom}</strong>,</p>
            <p>Nous avons bien reçu votre message concernant <em>"${sujet}"</em>. Notre équipe va l'étudier avec attention et nous vous répondrons dans les plus brefs délais.</p>
            <p style="margin-top: 30px;">Cordialement,<br><strong style="color: #4a3728;">L'équipe Farihy</strong></p>
          </div>
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

  // Safe check for agesEnfants in case it's not an array
  const agesArray = Array.isArray(agesEnfants) ? agesEnfants.join(', ') : agesEnfants;
  const detailsEnfants = nbEnfants > 0 ? `Oui (${nbEnfants}) - Âges: ${agesArray}` : 'Aucun';

  // --- EMAIL 1: TO ADMIN (BCC MANAGER) ---
  const mailToStaff = {
    from: `"${prenom} ${nom}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    bcc: process.env.EMAIL_MANAGER, 
    replyTo: email,
    subject: `📅 Nouvelle Réservation: ${prenom} ${nom}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f5f7; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <div style="background-color: #4a3728; padding: 25px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Nouvelle Demande de Réservation</h2>
          </div>
          <div style="padding: 30px; color: #333333; line-height: 1.6; font-size: 16px;">
            
            <h3 style="color: #4a3728; border-bottom: 2px solid #eeeeee; padding-bottom: 8px;">👤 Coordonnées du Client</h3>
            <p style="margin: 0 0 5px 0;"><strong>Nom :</strong> ${prenom} ${nom}</p>
            <p style="margin: 0 0 5px 0;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #4a3728;">${email}</a></p>
            <p style="margin: 0 0 20px 0;"><strong>Téléphone :</strong> ${countryCode} ${telephone}</p>

            <h3 style="color: #4a3728; border-bottom: 2px solid #eeeeee; padding-bottom: 8px; margin-top: 30px;">🛏️ Détails du Séjour</h3>
            <p style="margin: 0 0 5px 0;"><strong>Dates :</strong> Du ${dateArrivee} au ${dateDepart}</p>
            <p style="margin: 0 0 5px 0;"><strong>Logement :</strong> ${typeBungalow}</p>
            <p style="margin: 0 0 5px 0;"><strong>Adultes :</strong> ${nbAdultes}</p>
            <p style="margin: 0 0 20px 0;"><strong>Enfants :</strong> ${detailsEnfants}</p>

            <h3 style="color: #4a3728; border-bottom: 2px solid #eeeeee; padding-bottom: 8px; margin-top: 30px;">💬 Questions / Remarques</h3>
            <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #4a3728; border-radius: 4px; margin-top: 15px; white-space: pre-wrap;">${questions ? questions : '<em>Aucune remarque supplémentaire.</em>'}</div>
            
          </div>
        </div>
      </div>
    `,
  };

  // --- EMAIL 2: TO CLIENT ---
  const mailToClient = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
    to: email, 
    subject: `Votre demande de réservation - Farihy`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f5f7; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <div style="background-color: #4a3728; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Demande de réservation reçue</h1>
          </div>
          <div style="padding: 30px; color: #555555; line-height: 1.6; font-size: 16px;">
            <p>Bonjour <strong>${prenom}</strong>,</p>
            <p>Merci d'avoir choisi Farihy ! Nous vous confirmons la bonne réception de votre demande de réservation pour le logement <strong>${typeBungalow}</strong> du <strong>${dateArrivee}</strong> au <strong>${dateDepart}</strong>.</p>
            <p>Notre équipe vérifie actuellement les disponibilités et vous contactera très rapidement.</p>
            <p style="margin-top: 30px;">À très bientôt,<br><strong style="color: #4a3728;">L'équipe Farihy</strong></p>
          </div>
        </div>
      </div>
    `,
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
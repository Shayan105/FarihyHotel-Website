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

transporter.verify(function (error, success) {
  if (error) {
    console.log("Error connecting to SMTP:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const verifyRecaptcha = async (token) => {
  if (!token) return false;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  try {
    const response = await axios.post(verifyUrl);
    return response.data.success;
  } catch (error) {
    console.error("Captcha verification error:", error);
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

  // --- EMAIL 1: TO ADMIN (You) ---
  const mailToAdmin = {
    from: `"${prenom} ${nom}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO, // shayan...
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

  // --- EMAIL 2: TO CLIENT (Confirmation) ---
  const mailToClient = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
    to: email, 
    subject: `Nous avons bien reçu votre message - Farihy`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background-color: #4a3728; padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-family: 'Playfair Display', serif; font-size: 24px;">Merci de nous avoir contactés</h1>
        </div>
        <div style="padding: 30px 20px; color: #555555; line-height: 1.6;">
          <p>Bonjour <strong>${prenom}</strong>,</p>
          <p>Nous avons bien reçu votre message et nous vous en remercions. Notre équipe vous répondra dans les plus brefs délais.</p>
          
          <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 5px; padding: 20px; margin-top: 20px;">
            <p style="margin-top: 0; font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Copie de votre message :</p>
            <p style="font-weight: bold; margin-bottom: 5px;">${sujet}</p>
            <p style="font-style: italic; color: #666;">"${message}"</p>
          </div>

          <p style="margin-top: 30px;">Cordialement,<br><strong>L'équipe Farihy</strong></p>
        </div>
        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
          <p style="margin: 0;">Ceci est un message automatique, merci de ne pas y répondre directement.</p>
          <p style="margin: 5px 0 0;"><a href="https://www.farihy-hotel.com" style="color: #4a3728; text-decoration: none;">www.farihy-hotel.com</a></p>
        </div>
      </div>
    `,
  };

  try {
    // Send both emails effectively in parallel
    await Promise.all([
      transporter.sendMail(mailToAdmin),
      transporter.sendMail(mailToClient)
    ]);
    console.log('Emails (Admin + Client) sent successfully!');
    res.status(200).json({ success: true, message: 'Emails envoyés' });
  } catch (error) {
    console.error('Contact error:', error);
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

  // --- EMAIL 1: TO ADMIN (You) ---
  const mailToAdmin = {
    from: `"${prenom} ${nom}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `📅 Nouvelle Réservation: ${prenom} ${nom}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #4a3728;">Demande de Réservation</h2>
        
        <h3>👤 Client</h3>
        <p>${prenom} ${nom}<br>
        ${email}<br>
        ${countryCode} ${telephone}</p>

        <h3>🏨 Séjour</h3>
        <ul>
          <li><strong>Arrivée :</strong> ${dateArrivee}</li>
          <li><strong>Départ :</strong> ${dateDepart}</li>
          <li><strong>Logement :</strong> ${typeBungalow}</li>
        </ul>

        <h3>👨‍👩‍👧‍👦 Occupants</h3>
        <ul>
          <li><strong>Adultes :</strong> ${nbAdultes}</li>
          <li><strong>Enfants :</strong> ${detailsEnfants}</li>
        </ul>

        ${questions ? `<h3>💬 Remarques</h3><p>${questions}</p>` : ''}
      </div>
    `,
  };

  // --- EMAIL 2: TO CLIENT (Confirmation) ---
  const mailToClient = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
    to: email, 
    subject: `Confirmation de réception de votre demande - Farihy`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background-color: #4a3728; padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-family: 'Playfair Display', serif; font-size: 24px;">Demande bien reçue</h1>
        </div>
        <div style="padding: 30px 20px; color: #555555; line-height: 1.6;">
          <p>Bonjour <strong>${prenom}</strong>,</p>
          <p>Nous avons bien pris en compte votre demande de réservation pour un séjour au Farihy.</p>
          <p><strong>⚠️ Important :</strong> Ceci n'est pas une confirmation définitive. Notre équipe va vérifier la disponibilité pour vos dates et reviendra vers vous très rapidement pour valider votre séjour.</p>
          
          <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 5px; padding: 20px; margin-top: 20px;">
            <p style="margin-top: 0; font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Récapitulatif de votre demande</p>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 5px 0; color: #888;">Dates :</td>
                <td style="padding: 5px 0; font-weight: bold; text-align: right;">Du ${dateArrivee} au ${dateDepart}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #888;">Logement :</td>
                <td style="padding: 5px 0; font-weight: bold; text-align: right;">${typeBungalow}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #888;">Voyageurs :</td>
                <td style="padding: 5px 0; font-weight: bold; text-align: right;">${nbAdultes} Adulte(s), ${nbEnfants} Enfant(s)</td>
              </tr>
            </table>
          </div>

          <p style="margin-top: 30px;">À très bientôt,<br><strong>L'équipe Farihy</strong></p>
        </div>
        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
          <p style="margin: 0;">Farihy Hotel & Lodge</p>
          <p style="margin: 5px 0 0;"><a href="https://www.farihy-hotel.com" style="color: #4a3728; text-decoration: none;">www.farihy-hotel.com</a></p>
        </div>
      </div>
    `,
  };

  try {
    // Send both emails effectively in parallel
    await Promise.all([
      transporter.sendMail(mailToAdmin),
      transporter.sendMail(mailToClient)
    ]);
    console.log(`Reservation emails (Admin + Client) sent for ${prenom} ${nom}`);
    res.status(200).json({ success: true, message: 'Réservation envoyée' });
  } catch (error) {
    console.error('Reservation error:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Mail server started on port ${PORT}`);
});
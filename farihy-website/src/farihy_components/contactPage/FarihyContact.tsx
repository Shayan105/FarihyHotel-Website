import React, { useState } from "react";

const FarihyContact = () => {
  // Gestion de l'état du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    countryCode: "+261", // Valeur par défaut modifiable
    telephone: "",
    sujet: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Styles mis à jour
  const styles = {
    section: {
      backgroundColor: "#F2EFE9",
      color: "#4a3728",
      fontFamily: "'Playfair Display', serif",
      // AJUSTEMENT ICI: Padding haut augmenté pour éviter que le header ne cache le titre
      padding: "140px 0 60px 0", 
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: 500,
      textAlign: "center" as const,
      marginBottom: "10px",
    },
    subtitle: {
      textAlign: "center" as const,
      fontFamily: "sans-serif",
      fontSize: "1rem",
      marginBottom: "40px",
    },
    redText: {
      color: "#D9534F",
      fontWeight: "bold",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: 500,
      fontFamily: "sans-serif",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "#fff",
    },
    // Style spécifique pour le petit champ indicatif
    codeField: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px 0 0 5px", // Coins arrondis seulement à gauche
      backgroundColor: "#fff",
      borderRight: "none", // Pour fusionner visuellement avec le champ téléphone
      width: "80px",
      textAlign: "center" as const,
    },
    button: {
      backgroundColor: "#4a3728",
      color: "#fff",
      padding: "12px 30px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1.1rem",
      marginTop: "10px",
    },
    successBox: {
      backgroundColor: "#d4edda",
      color: "#155724",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "20px",
      border: "1px solid #c3e6cb",
      textAlign: "center" as const,
    },
    whatsapp: {
      marginTop: "50px",
      textAlign: "center" as const,
      fontSize: "1.1rem",
      fontFamily: "sans-serif",
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire envoyé :", formData);
    setIsSubmitted(true);
  };

  return (
    <section style={styles.section}>
      <div className="container">
        
        {/* En-tête */}
        <div style={styles.title}>
          Une question ?<br />
          Contactez nous ici
        </div>

        <p style={styles.subtitle}>
        <span style={styles.redText}>*information obligatoire</span>
        </p>

        {/* Formulaire */}
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <label style={styles.label}>*Nom :</label>
                    <input 
                      type="text" 
                      name="nom" 
                      required 
                      style={styles.input} 
                      value={formData.nom} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="col-md-6">
                    <label style={styles.label}>*Prénom :</label>
                    <input 
                      type="text" 
                      name="prenom" 
                      required 
                      style={styles.input} 
                      value={formData.prenom} 
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <label style={styles.label}>*Adresse e-mail :</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  style={styles.input} 
                  value={formData.email} 
                  onChange={handleChange}
                />

                <label style={styles.label}>*Numéro de téléphone :</label>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  {/* MODIFICATION ICI : Input simple au lieu du Select */}
                  <input 
                    type="text"
                    name="countryCode" 
                    style={styles.codeField} 
                    value={formData.countryCode}
                    onChange={handleChange}
                    placeholder="+261"
                  />
                  <input 
                    type="tel" 
                    name="telephone" 
                    required 
                    placeholder="ex: 32 07 413 55"
                    style={{ ...styles.input, borderRadius: "0 5px 5px 0", marginBottom: 0 }} 
                    value={formData.telephone} 
                    onChange={handleChange}
                  />
                </div>

                <label style={styles.label}>Quel est le sujet de votre demande ?</label>
                <input 
                  type="text" 
                  name="sujet" 
                  style={styles.input} 
                  value={formData.sujet} 
                  onChange={handleChange}
                />

                <label style={styles.label}>*Comment pouvons-nous vous renseigner ?</label>
                <textarea 
                  name="message" 
                  required 
                  rows={5} 
                  style={styles.input} 
                  value={formData.message} 
                  onChange={handleChange}
                ></textarea>

                <div className="text-center">
                  <button type="submit" style={styles.button}>Envoyer ma demande</button>
                </div>
              </form>
            ) : (
              // Message de succès
              <div style={styles.successBox}>
                <h4 style={{marginBottom: "10px"}}>Dès le formulaire envoyé :</h4>
                <p style={{margin: 0}}>
                  Nous vous remercions pour votre demande, nous vous répondrons au plus vite.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  style={{...styles.button, fontSize: "0.9rem", padding: "8px 15px", marginTop: "15px"}}
                >
                  Envoyer un autre message
                </button>
              </div>
            )}
            
            {/* Footer WhatsApp */}
            <div style={styles.whatsapp}>
              <p>
                Vous pouvez également nous envoyer un message sur WhatsApp au <br />
                <strong>+261 32 07 413 55</strong>
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FarihyContact;
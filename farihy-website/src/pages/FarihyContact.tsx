import React, { useState } from "react";
// Plus besoin d'importer emailjs ni useRef

const FarihyContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // État du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    countryCode: "+261",
    telephone: "",
    sujet: "",
    message: "",
  });

  // Styles (identiques à avant, je les raccourcis pour la lisibilité ici)
  const styles = {
    section: { backgroundColor: "#F2EFE9", color: "#4a3728", fontFamily: "'Playfair Display', serif", padding: "140px 0 60px 0" },
    title: { fontSize: "2.5rem", fontWeight: 500, textAlign: "center" as const, marginBottom: "10px" },
    subtitle: { textAlign: "center" as const, fontFamily: "sans-serif", fontSize: "1rem", marginBottom: "40px" },
    redText: { color: "#D9534F", fontWeight: "bold" },
    label: { display: "block", marginBottom: "5px", fontWeight: 500, fontFamily: "sans-serif" },
    input: { width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#fff" },
    codeField: { padding: "10px", border: "1px solid #ccc", borderRadius: "5px 0 0 5px", backgroundColor: "#fff", borderRight: "none", width: "80px", textAlign: "center" as const },
    button: { backgroundColor: "#4a3728", color: "#fff", padding: "12px 30px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1.1rem", marginTop: "10px", opacity: isSending ? 0.7 : 1 },
    successBox: { backgroundColor: "#d4edda", color: "#155724", padding: "20px", borderRadius: "10px", marginTop: "20px", border: "1px solid #c3e6cb", textAlign: "center" as const },
    whatsapp: { marginTop: "50px", textAlign: "center" as const, fontSize: "1.1rem", fontFamily: "sans-serif" },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // NOUVELLE FONCTION D'ENVOI VERS VOTRE SERVEUR NODE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // On appelle votre serveur local
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setFormData({ 
            nom: "", prenom: "", email: "", countryCode: "+261", 
            telephone: "", sujet: "", message: "" 
        });
      } else {
        alert("Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de contacter le serveur. Vérifiez qu'il est bien lancé.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section style={styles.section}>
      <div className="container">
        <div style={styles.title}>Une question ?<br />Contactez nous ici</div>
        <p style={styles.subtitle}><span style={styles.redText}>*information obligatoire</span></p>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <label style={styles.label}>*Nom :</label>
                    <input type="text" name="nom" required style={styles.input} value={formData.nom} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label style={styles.label}>*Prénom :</label>
                    <input type="text" name="prenom" required style={styles.input} value={formData.prenom} onChange={handleChange} />
                  </div>
                </div>

                <label style={styles.label}>*Adresse e-mail :</label>
                <input type="email" name="email" required style={styles.input} value={formData.email} onChange={handleChange} />

                <label style={styles.label}>*Numéro de téléphone :</label>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <input type="text" name="countryCode" style={styles.codeField} value={formData.countryCode} onChange={handleChange} placeholder="+261" />
                  <input type="tel" name="telephone" required placeholder="ex: 32 07 413 55" style={{ ...styles.input, borderRadius: "0 5px 5px 0", marginBottom: 0 }} value={formData.telephone} onChange={handleChange} />
                </div>

                <label style={styles.label}>Quel est le sujet de votre demande ?</label>
                <input type="text" name="sujet" style={styles.input} value={formData.sujet} onChange={handleChange} />

                <label style={styles.label}>*Comment pouvons-nous vous renseigner ?</label>
                <textarea name="message" required rows={5} style={styles.input} value={formData.message} onChange={handleChange}></textarea>

                <div className="text-center">
                  <button type="submit" style={styles.button} disabled={isSending}>
                    {isSending ? "Envoi en cours..." : "Envoyer ma demande"}
                  </button>
                </div>
              </form>
            ) : (
              <div style={styles.successBox}>
                <h4 style={{marginBottom: "10px"}}>Formulaire envoyé</h4>
                <p style={{margin: 0}}>Nous vous remercions pour votre demande, nous vous répondrons au plus vite.</p>
              </div>
            )}
            
            <div style={styles.whatsapp}>
              <p>Vous pouvez également nous envoyer un message sur WhatsApp au <br /><strong>+261 32 07 413 55</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarihyContact;
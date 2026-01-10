import React, { useState } from "react";

const FarihyReservation = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // État du formulaire complet
  const [formData, setFormData] = useState({
    dateArrivee: "",
    dateDepart: "",
    typeBungalow: "Familiale",
    nbAdultes: 1,
    nbEnfants: 0,
    agesEnfants: [] as string[],
    nom: "",        // AJOUTÉ
    prenom: "",     // AJOUTÉ
    countryCode: "+261",
    telephone: "",
    email: "",
    questions: "",
  });

  // Mise à jour des champs simples
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion spécifique pour le nombre d'enfants
  const handleEnfantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 0;
    setFormData((prev) => {
      const newAges = [...prev.agesEnfants];
      if (count > newAges.length) {
        for (let i = newAges.length; i < count; i++) newAges.push("");
      } else {
        newAges.length = count;
      }
      return { ...prev, nbEnfants: count, agesEnfants: newAges };
    });
  };

  const handleAgeChange = (index: number, value: string) => {
    const newAges = [...formData.agesEnfants];
    newAges[index] = value;
    setFormData({ ...formData, agesEnfants: newAges });
  };

  const styles = {
    section: { backgroundColor: "#F2EFE9", color: "#4a3728", fontFamily: "'Playfair Display', serif", padding: "100px 0 60px 0" },
    title: { fontSize: "2.5rem", fontWeight: 500, textAlign: "center" as const, marginBottom: "20px" },
    intro: { textAlign: "center" as const, fontFamily: "sans-serif", fontSize: "1rem", marginBottom: "40px", maxWidth: "800px", margin: "0 auto 40px auto" },
    label: { display: "block", marginBottom: "5px", fontWeight: 600, fontFamily: "sans-serif", fontSize: "0.9rem" },
    subLabel: { display: "block", marginBottom: "5px", fontSize: "0.85rem", color: "#666", fontFamily: "sans-serif" }, // Nouveau style pour sous-titres
    input: { width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#fff" },
    select: { width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#fff", cursor: "pointer" },
    codeField: { padding: "10px", border: "1px solid #ccc", borderRadius: "5px 0 0 5px", backgroundColor: "#fff", borderRight: "none", width: "80px", textAlign: "center" as const },
    button: { backgroundColor: "#4a3728", color: "#fff", padding: "12px 30px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1.1rem", marginTop: "20px", width: "100%" },
    successBox: { backgroundColor: "#d4edda", color: "#155724", padding: "20px", borderRadius: "10px", marginTop: "20px", border: "1px solid #c3e6cb" },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("http://localhost:5000/send-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        // On ne reset pas tout pour éviter de frustrer l'utilisateur s'il veut juste changer une date, 
        // mais on peut vider les questions.
        setFormData({ ...formData, questions: "" }); 
      } else {
        alert("Erreur lors de l'envoi.");
      }
    } catch (error) {
      alert("Impossible de contacter le serveur.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section style={styles.section}>
      <div className="container">
        <h2 style={styles.title}>Comment réserver ?</h2>
        <p style={styles.intro}>
          Vous souhaitez séjourner dans notre établissement ?<br/>
          Remplissez ce formulaire pour connaître nos disponibilités.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                
                {/* 1. Dates */}
                <div className="row">
                  <div className="col-md-6">
                    <label style={styles.label}>1. Date d'arrivée *</label>
                    <input type="date" name="dateArrivee" required style={styles.input} value={formData.dateArrivee} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label style={styles.label}>Date de départ *</label>
                    <input type="date" name="dateDepart" required style={styles.input} value={formData.dateDepart} onChange={handleChange} />
                  </div>
                </div>

                {/* 2. Type de Bungalow */}
                <label style={styles.label}>2. Le type de bungalow *</label>
                <select name="typeBungalow" style={styles.select} value={formData.typeBungalow} onChange={handleChange}>
                  <option value="Familiale">Familiale</option>
                  <option value="Suite">Suite</option>
                  <option value="Double">Double</option>
                  <option value="Villa">Villa</option>
                  <option value="Duplex">Duplex</option>
                </select>

                {/* 3. Nombre de personnes */}
                <label style={styles.label}>3. Le nombre de personnes *</label>
                <div className="row">
                  <div className="col-6">
                    <label style={styles.subLabel}>Nombre d'adultes</label>
                    <input type="number" min="1" name="nbAdultes" required style={styles.input} value={formData.nbAdultes} onChange={handleChange} />
                  </div>
                  <div className="col-6">
                    <label style={styles.subLabel}>Nombre d'enfants</label>
                    <input type="number" min="0" name="nbEnfants" required style={styles.input} value={formData.nbEnfants} onChange={handleEnfantsChange} />
                  </div>
                </div>

                {/* Champs dynamiques Âges */}
                {formData.nbEnfants > 0 && (
                    <div style={{ backgroundColor: "#e9ecef", padding: "15px", borderRadius: "5px", marginBottom: "15px" }}>
                        <label style={{...styles.label, color: "#D9534F", fontSize: "0.85rem"}}>Âge des enfants (obligatoire) :</label>
                        <div className="row">
                            {formData.agesEnfants.map((age, index) => (
                                <div key={index} className="col-4">
                                    <input 
                                        type="text" 
                                        placeholder={`Âge ${index + 1}`}
                                        required
                                        style={{...styles.input, marginBottom: "5px"}}
                                        value={age}
                                        onChange={(e) => handleAgeChange(index, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. Coordonnées Personnelles (AJOUT NOM/PRENOM) */}
                <div className="row mt-4">
                    <div className="col-md-6">
                        <label style={styles.label}>4. Nom *</label>
                        <input type="text" name="nom" required style={styles.input} value={formData.nom} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label style={styles.label}>Prénom *</label>
                        <input type="text" name="prenom" required style={styles.input} value={formData.prenom} onChange={handleChange} />
                    </div>
                </div>

                {/* 5. Contact (Tel + Email) */}
                <label style={styles.label}>5. Numéro de téléphone *</label>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <input type="text" name="countryCode" style={styles.codeField} value={formData.countryCode} onChange={handleChange} placeholder="+261" />
                  <input type="tel" name="telephone" required placeholder="ex: 32 07 413 55" style={{ ...styles.input, borderRadius: "0 5px 5px 0", marginBottom: 0 }} value={formData.telephone} onChange={handleChange} />
                </div>

                <label style={styles.label}>Votre adresse e-mail *</label>
                <input type="email" name="email" required style={styles.input} value={formData.email} onChange={handleChange} />

                {/* 6. Questions */}
                <label style={styles.label}>6. Demande particulière ?</label>
                <textarea name="questions" rows={3} style={styles.input} value={formData.questions} onChange={handleChange}></textarea>

                <button type="submit" style={styles.button} disabled={isSending}>
                  {isSending ? "Envoi..." : "Envoyer ma demande de réservation"}
                </button>
              </form>
            ) : (
              <div style={styles.successBox}>
                <h4 style={{marginBottom: "10px", fontFamily: "'Playfair Display', serif"}}>Merci {formData.prenom} !</h4>
                <p>Votre demande a bien été envoyée. Nous vous répondrons très vite.</p>
              </div>
            )}

            <div style={{ marginTop: "40px", textAlign: "center", fontSize: "0.95rem" }}>
              <p>Vous pouvez également nous écrire sur WhatsApp au <strong>+261 32 07 413 55</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarihyReservation;
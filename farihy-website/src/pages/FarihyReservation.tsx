import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// Configuration des disponibilités
const ROOM_LIMITS = {
  Double: 3,
  Familiale: 4,
  Duplex: 2,
  Suite: 1,
  Villa: 1
};

type RoomType = keyof typeof ROOM_LIMITS;

const FarihyReservation = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState({
    dateArrivee: "",
    dateDepart: "",
    selectedRooms: {
      Double: 0,
      Familiale: 0,
      Duplex: 0,
      Suite: 0,
      Villa: 0
    } as Record<RoomType, number>,
    nbAdultes: 1,
    nbEnfants: 0,
    agesEnfants: [] as string[],
    nom: "",
    prenom: "",
    countryCode: "+261",
    telephone: "",
    email: "",
    questions: "",
  });

  // --- DATE HELPERS ---
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getNextDay = (dateString: string) => {
    if (!dateString) return getTodayDate();
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const today = getTodayDate();
  const minDeparture = formData.dateArrivee ? getNextDay(formData.dateArrivee) : today;

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "dateArrivee") {
      // Logic: If arrival is changed to a date AFTER the current departure, reset departure
      if (formData.dateDepart && value >= formData.dateDepart) {
         setFormData((prev) => ({ ...prev, [name]: value, dateDepart: "" }));
      } else {
         setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRoomChange = (type: RoomType, newQuantity: number, max: number) => {
    if (newQuantity >= 0 && newQuantity <= max) {
      setFormData((prev) => ({
        ...prev,
        selectedRooms: {
          ...prev.selectedRooms,
          [type]: newQuantity
        }
      }));
    }
  };

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

  // --- STYLES ---
  const styles = {
    section: { backgroundColor: "#F2EFE9", color: "#4a3728", fontFamily: "'Playfair Display', serif", padding: "100px 0 60px 0" },
    title: { fontSize: "2.5rem", fontWeight: 500, textAlign: "center" as const, marginBottom: "20px" },
    intro: { textAlign: "center" as const, fontFamily: "sans-serif", fontSize: "1rem", marginBottom: "40px", maxWidth: "800px", margin: "0 auto 40px auto" },
    label: { display: "block", marginBottom: "5px", fontWeight: 600, fontFamily: "sans-serif", fontSize: "0.9rem" },
    subLabel: { display: "block", marginBottom: "5px", fontSize: "0.85rem", color: "#666", fontFamily: "sans-serif" },
    input: { width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#fff" },
    codeField: { padding: "10px", border: "1px solid #ccc", borderRadius: "5px 0 0 5px", backgroundColor: "#fff", borderRight: "none", width: "80px", textAlign: "center" as const },
    button: { backgroundColor: "#4a3728", color: "#fff", padding: "12px 30px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1.1rem", marginTop: "10px", width: "100%", opacity: isSending ? 0.7 : 1, transition: "opacity 0.3s" },
    successBox: { backgroundColor: "#d4edda", color: "#155724", padding: "20px", borderRadius: "10px", marginTop: "20px", border: "1px solid #c3e6cb" },
    roomContainer: { backgroundColor: "#fff", borderRadius: "8px", padding: "10px 20px", marginBottom: "20px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" },
    roomRow: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0", padding: "12px 0" },
    roomNameLink: { 
        fontSize: "1.05rem", 
        fontWeight: 500, 
        fontFamily: "'Playfair Display', serif",
        color: "#4a3728",
        textDecoration: "none", 
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px"
    },
    stepperContainer: { display: "flex", alignItems: "center", backgroundColor: "#f8f9fa", borderRadius: "20px", padding: "2px" },
    stepperBtn: { width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", border: "none", backgroundColor: "#fff", borderRadius: "50%", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", cursor: "pointer", color: "#4a3728", fontSize: "1.2rem", fontWeight: "bold", transition: "all 0.2s" },
    stepperBtnDisabled: { opacity: 0.3, cursor: "not-allowed", boxShadow: "none", backgroundColor: "transparent" },
    stepperValue: { margin: "0 15px", fontSize: "1rem", fontWeight: 600, minWidth: "20px", textAlign: "center" as const, fontFamily: "sans-serif" }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const totalRooms = Object.values(formData.selectedRooms).reduce((a, b) => a + b, 0);
    if (totalRooms === 0) {
      alert("Veuillez sélectionner au moins une chambre ou bungalow.");
      return;
    }

    const token = recaptchaRef.current?.getValue();
    if (!token) {
      alert("Veuillez valider le CAPTCHA.");
      return;
    }

    setIsSending(true);

    const typeBungalowString = Object.entries(formData.selectedRooms)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => `${count}x ${type}`)
      .join(", ");

    const payload = {
      ...formData,
      typeBungalow: typeBungalowString,
      captchaToken: token
    };

    try {
      const response = await fetch("/api/send-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setFormData(prev => ({ ...prev, questions: "" })); 
      } else {
        alert("Erreur lors de l'envoi ou validation CAPTCHA échouée.");
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      console.error("Erreur:", error);
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
                
                {/* 1. Dates (UPDATED) */}
                <div className="row">
                  <div className="col-md-6">
                    <label style={styles.label}>1. Date d'arrivée *</label>
                    <input 
                        type="date" 
                        name="dateArrivee" 
                        required 
                        style={styles.input} 
                        value={formData.dateArrivee} 
                        onChange={handleChange}
                        min={today} // Prevents past dates
                    />
                  </div>
                  <div className="col-md-6">
                    <label style={styles.label}>Date de départ *</label>
                    <input 
                        type="date" 
                        name="dateDepart" 
                        required 
                        style={styles.input} 
                        value={formData.dateDepart} 
                        onChange={handleChange}
                        min={minDeparture} // Prevents incoherent dates
                        disabled={!formData.dateArrivee} // Forces user to pick arrival first
                    />
                  </div>
                </div>

                {/* 2. Sélection Multi-Chambres */}
                <label style={styles.label}>2. Choix des hébergements *</label>
                <div style={styles.roomContainer}>
                  {Object.entries(ROOM_LIMITS).map(([type, max], index, array) => {
                    const count = formData.selectedRooms[type as RoomType];
                    const isLast = index === array.length - 1;
                    const rowStyle = isLast ? {...styles.roomRow, borderBottom: "none"} : styles.roomRow;
                    
                    return (
                    <div key={type} style={rowStyle}>
                      <a 
                        href={`/${type.toLowerCase()}`}
                        target="_blank"             
                        rel="noopener noreferrer"   
                        style={styles.roomNameLink}
                        title={`Voir les détails de la ${type}`} 
                      >
                        {type} <span style={{fontSize: "0.8em"}}>↗</span>
                      </a>

                      <div style={styles.stepperContainer}>
                        <button 
                            type="button" 
                            onClick={() => handleRoomChange(type as RoomType, count - 1, max)}
                            disabled={count <= 0}
                            style={{...styles.stepperBtn, ...(count <= 0 ? styles.stepperBtnDisabled : {})}}
                        >
                          - 
                        </button>
                        
                        <span style={styles.stepperValue}>{count}</span>
                        
                        <button 
                            type="button" 
                            onClick={() => handleRoomChange(type as RoomType, count + 1, max)}
                            disabled={count >= max}
                            style={{...styles.stepperBtn, ...(count >= max ? styles.stepperBtnDisabled : {})}}
                        >
                          + 
                        </button>
                      </div>
                    </div>
                  )})}
                </div>

                {/* 3. Nombre de personnes */}
                <label style={styles.label}>3. Le nombre total de personnes *</label>
                <div className="row">
                  <div className="col-6">
                    <label style={styles.subLabel}>Total Adultes</label>
                    <input type="number" min="1" name="nbAdultes" required style={styles.input} value={formData.nbAdultes} onChange={handleChange} />
                  </div>
                  <div className="col-6">
                    <label style={styles.subLabel}>Total Enfants</label>
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
                                        placeholder={`Enfant ${index + 1}`}
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

                {/* 4. Coordonnées */}
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

                {/* 5. Contact */}
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

                {/* CAPTCHA */}
                <div className="d-flex justify-content-center my-3">
                  <ReCAPTCHA
                    sitekey="6Lfe_EssAAAAAMdlwx5E09rQPUlNge7IYsffIcQe"
                    ref={recaptchaRef}
                  />
                </div>

                {/* BOUTON */}
                <button type="submit" style={styles.button} disabled={isSending}>
                  {isSending ? "Envoi en cours..." : "Envoyer ma demande de réservation"}
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
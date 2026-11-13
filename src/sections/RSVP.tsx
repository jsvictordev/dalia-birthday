import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { invitation as c } from "../config/invitation";
export function RSVP() {
  const [notice, setNotice] = useState("");
  const ready = !!c.whatsapp && /^\d{10,15}$/.test(c.whatsapp);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready) return;
    const data = new FormData(e.currentTarget);
    const message = `¡Hola! Soy ${data.get("name")}. ${data.get("answer")} al cumpleaños de ${c.name}. Número de asistentes: ${data.get("guests")}. ${data.get("message") || ""}`;
    window.open(
      `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setNotice(
      "Se abrió WhatsApp. Presiona Enviar allí para completar tu confirmación. Si no se abrió, permite las ventanas emergentes e inténtalo de nuevo.",
    );
  }
  return (
    <section id="equipo" className="rsvp section">
      <div className="section-heading">
        <span className="eyebrow">EL MEJOR EQUIPO EMPIEZA CONTIGO</span>
        <h2>¿Te unes a mi equipo?</h2>
        <p>Tu lugar en esta aventura te está esperando.</p>
      </div>
      <form onSubmit={submit}>
        <label>
          Tu nombre o el de tu adulto responsable
          <input
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="¿Cómo te llamas?"
          />
        </label>
        <div className="form-row">
          <label>
            Asistentes
            <select name="guests" defaultValue="1">
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>
          </label>
          <label>
            ¿Vienes a jugar?
            <select name="answer">
              <option>Sí asistiré</option>
              <option>No podré asistir</option>
            </select>
          </label>
        </div>
        <label>
          Un mensaje para Dalia <span>(opcional)</span>
          <textarea
            name="message"
            maxLength={500}
            placeholder="¡Nos vemos en el siguiente nivel!"
            rows={3}
          />
        </label>
        <button className="button primary" disabled={!ready}>
          <MessageCircle size={18} /> Confirmar por WhatsApp{" "}
          <ArrowUpRight size={18} />
        </button>
        <p className="form-note">
          {ready
            ? "La confirmación se envía por WhatsApp. Tendrás que presionar Enviar dentro de la app."
            : "El número de WhatsApp está pendiente. La confirmación se habilitará cuando esté configurado."}
        </p>
        <p role="status">{notice}</p>
      </form>
    </section>
  );
}

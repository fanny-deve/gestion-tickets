import { AnimatePresence, motion } from "motion/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fadeUp, stagger } from "../motion";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try { await login(email.trim(), password); nav("/"); }
    catch (x) { setError((x as Error).message); }
    finally { setBusy(false); }
  };

  return <div className="login-shell">
    <motion.div className="login-art" initial="hidden" animate="show" variants={stagger}>
      <motion.div className="brand light" variants={fadeUp}><span className="brand-mark">✓</span> TicketFlow</motion.div>
      <motion.div variants={fadeUp}><p className="eyebrow light-text">SOPORTE SIN FRICCIÓN</p><h1>Todo tu soporte,<br/><em>en un solo lugar.</em></h1><p>Organiza solicitudes, asigna responsables y mantén a tu equipo avanzando.</p><div className="login-orb orb-one"/><div className="login-orb orb-two"/></motion.div>
      <motion.small variants={fadeUp}>© 2026 TicketFlow · Gestión de soporte</motion.small>
    </motion.div>
    <motion.div className="login-card" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:.12,duration:.5}}>
      <p className="eyebrow">BIENVENIDO</p><h2>Inicia sesión</h2><p className="muted">Ingresa con tu cuenta para acceder al espacio de trabajo.</p>
      <motion.form onSubmit={submit} initial="hidden" animate="show" variants={stagger}>
        <motion.label variants={fadeUp}>Correo electrónico<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@correo.com" autoComplete="email" required/></motion.label>
        <motion.label variants={fadeUp}>Contraseña<div className="password-field"><input type={showPassword?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required/><button type="button" className="password-toggle" aria-label={showPassword?"Ocultar contraseña":"Mostrar contraseña"} onClick={()=>setShowPassword(!showPassword)}>{showPassword?"◉":"◌"}</button></div></motion.label>
        <AnimatePresence>{error&&<motion.p className="error-message" initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}>{error}</motion.p>}</AnimatePresence>
        <motion.button whileHover={{scale:1.015}} whileTap={{scale:.98}} className="button primary full" type="submit" disabled={busy}>{busy?"Validando…":"Entrar al espacio de trabajo →"}</motion.button>
      </motion.form>
    </motion.div>
  </div>;
}

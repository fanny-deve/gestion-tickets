import axios from "axios";

// URL base del backend Spring Boot. Ajustar si se despliega en otro host/puerto.
// withCredentials permite que la cookie de sesion (JSESSIONID) viaje en
// cada peticion, que es como el backend reconoce que hay un login activo.
export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

// Si el backend responde 401 (sin sesion activa o sesion vencida), se manda
// al usuario de vuelta al login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

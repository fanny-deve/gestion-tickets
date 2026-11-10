// La selección queda centralizada aquí para que las páginas no dependan del
// mecanismo de persistencia. El adaptador API se conserva en api/client.ts y
// se activará cuando sus contratos cubran las operaciones necesarias.
export { demoStore as repository } from "./demoStore";
export const dataMode = import.meta.env.VITE_DATA_MODE ?? "demo";

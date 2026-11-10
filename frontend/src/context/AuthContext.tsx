import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { UserResponse } from "../types"; import { repository } from "../services/repository";
interface AuthValue { user: UserResponse|null; loading:boolean; login:(email:string,password:string)=>Promise<void>; logout:()=>Promise<void>; refresh:()=>void; }
const AuthContext=createContext<AuthValue|undefined>(undefined);
export function AuthProvider({children}:{children:ReactNode}){const [user,setUser]=useState<UserResponse|null>(null);const [loading,setLoading]=useState(true);useEffect(()=>{setUser(repository.currentUser());setLoading(false);},[]);const login=async(e:string,p:string)=>setUser(repository.login(e,p));const logout=async()=>{repository.logout();setUser(null);};return <AuthContext.Provider value={{user,loading,login,logout,refresh:()=>setUser(repository.currentUser())}}>{children}</AuthContext.Provider>}
export const useAuth=()=>{const c=useContext(AuthContext);if(!c)throw new Error("useAuth debe usarse dentro de AuthProvider");return c;};

"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Usuario, Rol } from "@/types"

interface AuthContextType {
  user: User | null
  userData: Usuario | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, data: Partial<Usuario>) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserData: (data: Partial<Usuario>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) return
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser && db) {
        const docRef = doc(db, "usuarios", firebaseUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserData(docSnap.data() as Usuario)
        }
      } else {
        setUserData(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase no inicializado")
    await signInWithEmailAndPassword(auth, email, password)
  }

  const register = async (email: string, password: string, data: Partial<Usuario>) => {
    if (!auth || !db) throw new Error("Firebase no inicializado")
    const credencial = await createUserWithEmailAndPassword(auth, email, password)
    const uid = credencial.user.uid
    const nuevoUsuario = {
      id: uid,
      email,
      nombre: data.nombre || "",
      apellido: data.apellido || "",
      telefono: data.telefono || "",
      rol: (data.rol as Rol) || "colaborador",
      ministerioIds: data.ministerioIds || [],
      fotoURL: data.fotoURL || "",
      activo: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    await setDoc(doc(db, "usuarios", uid), nuevoUsuario)
  }

  const logout = async () => {
    if (!auth) return
    await signOut(auth)
    setUserData(null)
  }

  const resetPassword = async (email: string) => {
    if (!auth) return
    await sendPasswordResetEmail(auth, email)
  }

  const updateUserData = async (data: Partial<Usuario>) => {
    if (!user || !db) return
    const ref = doc(db, "usuarios", user.uid)
    await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true })
    const snap = await getDoc(ref)
    if (snap.exists()) setUserData(snap.data() as Usuario)
  }

  return (
    <AuthContext.Provider
      value={{ user, userData, loading, login, register, logout, resetPassword, updateUserData }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}

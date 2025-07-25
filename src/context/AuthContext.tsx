// src/context/AuthContext.tsx
'use client';
import { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface UserDocument {
    uid: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    password?: string; // Password should not be stored in plaintext in a real app
    [key: string]: any;
}

interface AuthContextType {
    user: UserDocument | null;
    loading: boolean;
    login: (email: string, pass: string, remember?: boolean) => Promise<UserDocument | null>;
    signup: (data: any) => Promise<UserDocument | null>;
    logout: () => void;
    reloadUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => null,
    signup: async () => null,
    logout: () => {},
    reloadUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDocument | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUserAndSet = useCallback(async (uid: string, storage: Storage) => {
        try {
            const userRef = doc(db, 'donors', uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const userData = { uid: docSnap.id, ...docSnap.data() } as UserDocument;
                setUser(userData);
                // Re-store the latest user data
                storage.setItem('user', JSON.stringify(userData));
            } else {
                // User in storage but not in DB, clear it
                setUser(null);
                storage.removeItem('user');
            }
        } catch (error) {
            console.error("Error fetching user document:", error);
            setUser(null);
            storage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        let storedUser: string | null = null;
        let storage: Storage | null = null;

        try {
            if (typeof window !== 'undefined') {
                 storedUser = localStorage.getItem('user');
                 storage = localStorage;
                if (!storedUser) {
                    storedUser = sessionStorage.getItem('user');
                    storage = sessionStorage;
                }
            }

            if (storedUser && storage) {
                const parsedUser: UserDocument = JSON.parse(storedUser);
                // Instead of fetching again, just trust the stored user object for initial load
                // This prevents the flicker/logout on hot-reload
                setUser(parsedUser);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error("Failed to parse user from storage", error);
            if(typeof window !== 'undefined'){
                localStorage.removeItem('user');
                sessionStorage.removeItem('user');
            }
            setLoading(false);
        }
    }, []);


    const login = async (email: string, pass: string, remember: boolean = false): Promise<UserDocument | null> => {
        setLoading(true);
        const storage = remember ? localStorage : sessionStorage;
        try {
            // Temporary "master key" to allow admin login and re-seeding
            if (email === 'admin@roktobondhu.com' && pass === 'admin123') {
                const adminData = {
                    uid: "admin-user",
                    email: "admin@roktobondhu.com",
                    name: "Admin User",
                    role: "admin",
                } as UserDocument;
                
                storage.setItem('user', JSON.stringify(adminData));
                setUser(adminData);
                return adminData;
            }

            const q = query(collection(db, "donors"), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("No matching user found for email.");
                throw new Error("Invalid credentials");
            }

            const userDoc = querySnapshot.docs[0];
            const userData = { uid: userDoc.id, ...userDoc.data() } as UserDocument;
            
            if (userData.password !== pass) {
                console.log("Password does not match.");
                throw new Error("Invalid credentials");
            }

            storage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return userData;
        } finally {
            setLoading(false);
        }
    };


    const signup = async (data: any): Promise<UserDocument | null> => {
        setLoading(true);
        try {
            const storedData = { ...data };
            
            if (storedData.lastDonation === undefined) {
                storedData.lastDonation = null;
            }

            const userRef = doc(collection(db, "donors"));
            await setDoc(userRef, storedData);

            const newUser = { uid: userRef.id, ...storedData } as UserDocument;
            // By default, keep new signups logged in via session storage
            sessionStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
            return newUser;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        // Use window.location to force a hard reload, clearing all state.
        window.location.href = '/login';
    };
    
    const reloadUser = useCallback(() => {
        if(user?.uid) {
            setLoading(true);
            const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
            fetchUserAndSet(user.uid, storage);
        }
    }, [user, fetchUserAndSet]);

    const value = useMemo(() => ({
        user,
        loading,
        login,
        signup,
        logout,
        reloadUser,
    }), [user, loading, reloadUser, login, signup]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

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
    login: (email: string, pass: string) => Promise<UserDocument | null>;
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

    const fetchUser = useCallback(async (uid: string) => {
        const userRef = doc(db, 'donors', uid);
        try {
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const userData = { uid: docSnap.id, ...docSnap.data() } as UserDocument
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                return userData;
            } else {
                logout(); // User in local storage but not in DB
            }
        } catch (error) {
            console.error("Error fetching user document:", error);
            // If there's an error (e.g., permissions), log out the user
            logout();
        }
        return null;
    }, []);

    useEffect(() => {
        setLoading(true);
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser: UserDocument = JSON.parse(storedUser);
                if (parsedUser?.uid) {
                    // To prevent infinite loops and ensure user data is fresh on reload
                    if (!user || user.uid !== parsedUser.uid) {
                         fetchUser(parsedUser.uid).finally(() => setLoading(false));
                    } else {
                         setLoading(false);
                    }
                } else {
                     setLoading(false);
                }
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            setLoading(false);
            localStorage.removeItem('user');
        }
    }, []);


    const login = async (email: string, pass: string): Promise<UserDocument | null> => {
        setLoading(true);
        try {
            // Query only by email to avoid composite index requirement
            const q = query(collection(db, "donors"), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("No matching user found for email.");
                throw new Error("Invalid credentials");
            }

            const userDoc = querySnapshot.docs[0];
            const userData = { uid: userDoc.id, ...userDoc.data() } as UserDocument;
            
            // Verify password in the client-side code
            // THIS IS NOT SECURE. In a real app, use Firebase Auth or a backend with hashing.
            if (userData.password !== pass) {
                console.log("Password does not match.");
                throw new Error("Invalid credentials");
            }

            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return userData;
        } finally {
            setLoading(false);
        }
    };


    const signup = async (data: any): Promise<UserDocument | null> => {
        setLoading(true);
        try {
             // In a real app, password should be hashed before storing.
            // Storing plain text passwords is a major security risk.
            const storedData = { ...data };
            
            // Firestore doesn't allow `undefined` values. Convert them to `null`.
            if (storedData.lastDonation === undefined) {
                storedData.lastDonation = null;
            }

            const userRef = doc(collection(db, "donors"));
            await setDoc(userRef, storedData);

            const newUser = { uid: userRef.id, ...storedData } as UserDocument;
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
            return newUser;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/');
    };
    
    const reloadUser = useCallback(() => {
        if(user?.uid) {
            fetchUser(user.uid);
        }
    }, [user, fetchUser]);

    const value = useMemo(() => ({
        user,
        loading,
        login,
        signup,
        logout,
        reloadUser,
    }), [user, loading, reloadUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

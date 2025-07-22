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
                    fetchUser(parsedUser.uid).finally(() => setLoading(false));
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
    }, [fetchUser]);

    const login = async (email: string, pass: string): Promise<UserDocument | null> => {
        setLoading(true);
        try {
            const q = query(collection(db, "donors"), where("email", "==", email), where("password", "==", pass));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("No matching user found.");
                throw new Error("Invalid credentials");
            }

            const userDoc = querySnapshot.docs[0];
            const userData = { uid: userDoc.id, ...userDoc.data() } as UserDocument;

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
            const { password, ...userData } = data; // Separate password from other data
            // In a real app, password should be hashed before storing.
            // Storing plain text passwords is a major security risk.
            const storedData = { ...userData, password: password };

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
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
// src/context/AuthContext.tsx
'use client';
import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { 
    getAuth, 
    onAuthStateChanged, 
    User, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface UserDocument {
    uid: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    userDoc: UserDocument | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<any>;
    signup: (email: string, pass: string, data: object) => Promise<any>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userDoc: null,
    loading: true,
    login: async () => {},
    signup: async () => {},
    logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userDoc, setUserDoc] = useState<UserDocument | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true);
            if (user) {
                setUser(user);
                const userRef = doc(db, 'donors', user.uid);
                try {
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        setUserDoc({ uid: user.uid, ...docSnap.data() } as UserDocument);
                    } else {
                        setUserDoc(null);
                    }
                } catch (error) {
                    console.error("Error fetching user document:", error);
                    setUserDoc(null);
                }
            } else {
                setUser(null);
                setUserDoc(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (email: string, pass: string) => {
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const signup = async (email: string, pass: string, data: object) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;
        const userRef = doc(db, "donors", user.uid);
        const userData = {
            ...data,
            uid: user.uid,
            email: user.email,
        };
        await setDoc(userRef, userData);
        setUserDoc(userData as UserDocument);
        return userCredential;
    };

    const logout = () => {
        return signOut(auth);
    };

    const value = useMemo(() => ({
        user,
        userDoc,
        loading,
        login,
        signup,
        logout,
    }), [user, userDoc, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

import type { Session, User } from "@supabase/supabase-js";
import supabase from "lib/Supabase";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: User | null;
    session: Session | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            console.log(data.session)
            setUser(data.session?.user ?? null);
            setLoading(false);
        })

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                console.log(session)
                setSession(session);
                setUser(session?.user ?? null);
            }
        )

        return () => {
            listener.subscription.unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, session, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');

    return context;
}

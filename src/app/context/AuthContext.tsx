import React, { createContext, useEffect, useState } from "react";
import { IUser } from "@/app/types";
import { getCurrentUser } from "@/lib/appwrite/api";
import { useRouter } from "next/navigation";

export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
};
const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {

       
        if (
            localStorage.getItem('cookieFallback') === '[]' || 
            localStorage.getItem('cookieFallback') === null
          ) {
            router.push("auth/signin");
          }
        checkAuthUser()
    }, [])
    
    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser({ id: currentAccount.$id, name: currentAccount.name, username: currentAccount.username, email: currentAccount.email, imageUrl: currentAccount.imageUrl, bio: currentAccount.bio })
           

            setIsAuthenticated(true)
                return true
            }
            return false
        } catch (err) {
            console.log(err)
            return false;
        } finally {
            setIsLoading(false)
        }
    }
    const value = { user, setUser, isLoading, setIsLoading, isAuthenticated, setIsAuthenticated, checkAuthUser }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
};

export default AuthProvider;
export default AuthProvider;

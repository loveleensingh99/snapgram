import { INewUser } from "@/app/types";
import { ID, Query } from "appwrite";
import { account, avatars, databases } from "./config";
import { Database } from "lucide-react";



export async function createUserAccount(user: INewUser) {

    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if (!newAccount) {
            throw Error;
        }

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDb({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl
        });

        return newUser;
    }
    catch (err) {

        console.log(err)
        return err;
    }


}

export async function saveUserToDb(user: {
    accountId: string; email: string, name: string;
    imageUrl: URL;
    username?: string
}) {
    try {
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const collectionId = process.env.NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID;

        if (!databaseId || !collectionId) {
            throw new Error('Database ID or Collection ID is not defined in environment variables');
        }

        const newUser = await databases.createDocument(databaseId,
            collectionId,
            ID.unique(),
            user)
        console.log("🚀 ~ newUser:", newUser)
    } catch (error) {
        console.log("Error", error)
    }
}

interface TSignInUser {
    email: string; password: string
}

export async function signInAccount(user: TSignInUser) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password)
        return session
    } catch (err) {

    }
}


export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) {
            throw Error;
        }
        const databaseID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const userId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

        if (!databaseID || !userId) {
            throw Error;
        }
        const currentUser = await databases.listDocuments(databaseID, userId, [Query.equal("accountId", currentAccount.$id)]);
        if (!currentUser) {
            throw Error
        }

        return currentUser.documents[0]
    } catch (err) {
        console.log(err)
    }
}
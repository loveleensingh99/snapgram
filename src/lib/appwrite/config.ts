import { Client, Databases, Account, Storage, Avatars } from "appwrite";
declare const process: {
    env: {
        NEXT_PUBLIC_APPWRITE_ID: string;
        NEXT_PUBLIC_APPWRITE_URL: string;
    };
};

const client = new Client();
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

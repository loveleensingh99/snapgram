import { useMutation } from "@tanstack/react-query"
import { createUserAccount, signInAccount } from "../appwrite/api"
import { INewUser } from "@/app/types"

export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => {
            return createUserAccount(user)
        },
    })
}


export const useSigninAccountMutation = () => {
    return useMutation({
        mutationFn: (user: { email: string; password: string }) => {
            return signInAccount(user)
        },
    })
}
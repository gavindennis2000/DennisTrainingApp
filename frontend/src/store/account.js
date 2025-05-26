import { create } from "zustand";

const usernameRegex = /^[a-zA-Z0-9]{5,20}$/;
const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}|;:,.<>\/?`~]{5,20}$/;


export const useAccountStore = create((set) => ({
    accounts: [],
    setAccounts: (accounts) => set({ accounts}),
    createAccount: async (newAccount) => {
        if (!newAccount.username || !newAccount.password || !newAccount.repeatPassword || !newAccount.firstName || !newAccount.lastName || !newAccount.email) {
            return { success: false, message: "missing information" };
        }

        if (!usernameRegex.test(newAccount.username)) {
            return { success: false, message: "invalid username" };
        }

        if (!passwordRegex.test(newAccount.password)) {
            return { success: false, message: "invalid password" };
        }

        if (newAccount.password != newAccount.repeatPassword) {
            return { success: false, message: "passwords don't match" };
        }

        // copy account info but leave out the repeat password
        const { repeatPassword, ...accountData } = newAccount;
        
        const res = await fetch("/api/accounts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(accountData)
        })
        const data = await res.json();
        if (data.message === "can't create") {
            return { success: false, message: "can't create"}
        }
        else if (data.message === "Username or email already exists") {
            return { success: false, message: "duplicate" }
        }
        set((state) => ({accounts:[...state.accounts, data.data]}));
        return { success: true, message: "success"}
    },
    loginAccount: async ({usernameOrEmail, password}) => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({usernameOrEmail, password})
            });
            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message};
            }

            return { success: true, message: data.message, user: data.user };
        } catch (error) {
            return { success: false, message: "login failed" };
        }

    }
}))
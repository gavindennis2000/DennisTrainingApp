/* 
accounts.js

api calls for logging in, registering, and deleting account
*/

import express from 'express';
import Account from '../models/account.model.js';
import bcrypt from 'bcrypt';

const accountsRouter = express();
accountsRouter.use(express.json());

// Example login route
accountsRouter.post("/login", async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
            return res.status(400).json({message: 'Missing username or password'});
        }

    try {
        const user = await Account.findOne({
            $or: [
                { username: usernameOrEmail.toLowerCase() },
                { email : usernameOrEmail.toLowerCase() }
            ]
        });

        if (!user) {
            return res.status(401).json({ success: false, message: 'invalid username/password' });
        }

        // compare given password with hashed
        const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

        if (passwordsMatch) {
            const { passwordHash, ...userData } = user.toObject();
            return res.json({ success: true, user: userData});
        }
        return res.status(401).json({ success: false, message: 'invalid username/password' });
        
    } catch (error) {

    }
});

accountsRouter.post("/register", async (req, res) => {
    const { username, password, firstName, lastName, email } = req.body;  // user will send this data
    const passwordHash = await bcrypt.hash(password, 10);

    if (!username || !password || !firstName || !lastName || !email) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newAccount = new Account({
            username,
            passwordHash: hashedPassword,
            firstName,
            lastName,
            email
        });

        await newAccount.save();
        res.status(201).json({ success: true, data: newAccount });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key violation
            console.log("duplicate detected");
            return res.status(409).json({ success: false, message: "Username or email already exists" });
        }
        console.error("Error in create account:", error.message);
        res.status(500).json({ success: false, message: "can't create" });
    }
});

accountsRouter.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;

    try {
        await Account.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "account deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "account not found" });
    }
});

export default accountsRouter;

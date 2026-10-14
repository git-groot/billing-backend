import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import users from '../Models/users.js';


function generatePassword(length = 8) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let pass = '';
    for (let i = 0; i < length; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }
    return pass;
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ SuperAdmin — first time (2FA not setup)
        if (existingUser.role === 'SuperAdmin' ) {
            const tempToken = jwt.sign(
                { id: existingUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '5m' }
            );
            return res.status(200).json({
                requires2FA: true,
                isFirstTime: true,
                tempToken,
            });
        }

        // ✅ SuperAdmin — 2FA already setup
        if (existingUser.role === 'SuperAdmin' ) {
            const tempToken = jwt.sign(
                { id: existingUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '5m' }
            );
            return res.status(200).json({
                requires2FA: true,
                isFirstTime: false,
                tempToken,
            });
        }

        // ✅ Admin or User — normal login
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            data: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

// ✅ Register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await users.create({
            name,
            email,
            password: hashedPassword,
            role: req.body.role
        });

        return res.status(201).json({
            message: "User registered successfully",
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

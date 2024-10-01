const express=require('express');
const app=express();
const cors=require('cors')
const bcrypt=require('bcrypt')
const saltRounds=3;
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const mysql=require('mysql')
app.listen(3002,(req,res)=>{
    console.log('Server is running at port 3002')
})
const db=mysql.createConnection({
    host:"localhost",
    user:"vr",
    password:"maZoun007#",
    database:"Vr",
})
app.post('/signUp',(req,res)=>{
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Hashing error:', err);
            return res.status(500).json({ success: false, message: 'Internal server error during password hashing.' });
        }
        db.query('INSERT INTO VR (email, firstName,lastName, password) VALUES (?, ?, ?, ?)', 
                 [firstName, lastName, email, hash], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Error inserting data into the database.' });
            }
            console.log("Sign up complete");
            res.json({ success: true, message: 'Sign-up successful.' });
        });
    });
})
app.post('/signIn', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM VR WHERE email=?', [email], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Internal server error during sign-in.' });
        }

        if (result.length > 0) {
            
            bcrypt.compare(password, result[0].password, (err2, isMatch) => {
                if (err2) {
                    console.error('Password comparison error:', err2);
                    return res.status(500).json({ success: false, message: 'Internal server error during password comparison.' });
                }

                if (isMatch) {
                    console.log('Sign in successful');
                    res.json({ success: true, message: 'Sign in successful' });
                } else {
                    console.log('Wrong password');
                    return res.status(401).json({ success: false, message: 'Wrong password' });
                }
            });
        } else {
            console.log('User not found');
            return res.status(404).json({ success: false, message: 'User not found, wrong email or password' });
        }
    });
});
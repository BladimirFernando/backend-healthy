//aqui se crea el token y todo de la autenticacion 
const express = require('express')
const router = express.Router()
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = admin.firestore()

//ruta de login
router.post('/login', async (req, res) => {
    try {
        const { email, password }= req.body
        const userRef = db.collection('users').doc(email)
        const userDoc = await userRef.get()
        if(!userDoc.exists) {
            return res.status(401).json({
                'status': 'failed',
                'message': 'invalid email or password'
            })
        }

        const userData = userDoc.data()
        const isPassValid = await bycrypt.compare(password, userData.password)
        if (isPassValid){
            const token = jwt.sign(
                { email: userData.email }, 
                'CLAVE SECRETA',
                { expiresIn: '1h'}
            )

            res.json({
                'status': 'success',
                token
            })
        }else{
            return res.status(401).json({
                'status': 'failed',
                'message': 'invalid email or password'
            })
        }


    } catch (error) {
        res.json({
            'status': 'failed',
            'error': error
        })
    }
})

module.exports = router
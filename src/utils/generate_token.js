import jwt from "jsonwebtoken"


const generateToken  = async (userEmail) => { 
    
return new Promise((resolve, reject) => { 
    jwt.sign({data:userEmail}, process.env.SECRET , {expiresIn: '24h'}, (error, token) => { 
        if(error) { 
            reject(new Error("Erro durante criação do token"))
        } else {
            resolve(token)
        }
    })
})
}



export default generateToken
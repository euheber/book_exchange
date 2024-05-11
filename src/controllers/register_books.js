import prisma from "../lib/prismaClient.js"

async function register_books(req, res) {
    const { name, email, tracking_code, books } = req.body
    
    const user = await prisma.user.create({
        data: {
            name,
            email,
            tracking_code
        }
    })
    
    const editedBooks = books.map(book => { 
        return { 
            ...book, 
            userId: user.id
        }
    })

    await prisma.books.createMany({data: editedBooks})
    
    res.status(200).send("testando rotas de post")
}

export default register_books
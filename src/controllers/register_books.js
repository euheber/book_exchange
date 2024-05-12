import prisma from "../lib/prismaClient.js"
import voucherGenegerator from "../utils/generate-voucher.js"
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
    const vouchers = await voucherGenegerator(editedBooks)
    console.log(vouchers)
    await prisma.books.createMany({data: editedBooks})
    
    res.status(200)
    .send(`Aqui está o seu id: ${user.id}. Não perca este identificador ou não conseguirá ter acesso aos seus dados na nossa plataforma`)
}

export default register_books
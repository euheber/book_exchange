import prisma from "../lib/prismaClient"

const register_books = async (req, res) => { 
        const {books, id} = req.body
        
        await prisma.user.findUnique({ 
          where:{ 
            id
          }
        })

          const editedBooks = books.map(book => { 
        return { 
            ...book, 
            userId: user.id
        }
    })

    await prisma.books.createMany({data: editedBooks})
    res.status(StatusCodes.OK).send("user registered")
}

export default register_books
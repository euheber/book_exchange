import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"


const get_recycled_info = async (req, res) => {

    const booksByState = await prisma.user.findMany({
        select: {
          state: true,
          _count: {
            select: {
              books: true
            }
          }
        }
      });

    const formatBookByState = booksByState.reduce((acc, currentValue, currentIndex) => { 
        const state = currentValue.state;
        const bookCount = currentValue._count.books;
      
        if (acc[state]) {
           
          acc[state] += bookCount;
        } else {
          acc[state] = bookCount;
        }
      
        return acc;
    }, {})

    res.status(StatusCodes.ACCEPTED).json(formatBookByState)
}

export default get_recycled_info
function checkBooks(books) {
    const invalidBooks = []

    books.forEach(book => {
        if (!book.name || !book.book_id || !book.publisher) {
            invalidBooks.push(book);
        }
    });


    return invalidBooks
}

export default checkBooks
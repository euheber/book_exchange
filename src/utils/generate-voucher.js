const generateVoucher = ()=> {
    let voucher = '';
    const voucherCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 12; i++) {
        voucher += voucherCharacters.charAt(Math.floor(Math.random() * voucherCharacters.length));
        if ((i + 1) % 4 === 0 && i !== 11) {
            voucher += '-';
        }
    }
    return voucher;
}


const voucherGenegerator = async (arrayOfBooks) => {

    if (arrayOfBooks.length > 1) {
        return arrayOfBooks.map(book => `${book.name} - ${generateVoucher()}`).join('\n');
    }  else {
        const bookName = arrayOfBooks[0].name;
        const voucher = generateVoucher();
        return `Aqui está o Voucher do ${bookName}: ${voucher}`;
    }
}


export default voucherGenegerator


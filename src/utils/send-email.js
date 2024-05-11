import voucherGenegerator from "./generate-voucher.js"

const sendEmail = (user) => {
    const { name, email } = user
    return `Olá, ${name}. Aqui estão os seus vouchers referentes ao livros que você enviou para reciclagem.`
}


export default sendEmail
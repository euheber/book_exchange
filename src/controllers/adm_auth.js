async function admLogin(req, res, next) {
    const { user, password} = req.body
    const token = req.headers.authorization.split(' ')[1]
}

export default admLogin
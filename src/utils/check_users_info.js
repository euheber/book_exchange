import checkEmail from "../utils/check_if_email_is_valid.js"
import validStates from "../utils/valid_states.js";
import { badRequest } from "../errors/index.js"

function checkUsersInfo(userInfo) {

    if (userInfo.email) {
        if (typeof userInfo.email == "number") {
            return new badRequest("Ofereça um email válido pra contato: numero")
        }
        if (!checkEmail(userInfo.email)) {
            return new badRequest("Ofereça um email válido para contato")
        }
    }

    if (userInfo.state) {
        if (typeof userInfo.state == "number") {
            return new badRequest("somente caracteres alfabéticos são permitidos nesse campo")
        }
        if (!validStates(userInfo.state)) {

            return new badRequest("Você precisa enviar um estado válido")
        }
    }

    if (userInfo.name) {
        if (typeof userInfo.name == "number") {

            return new badRequest("Somente letras nesse campo")
        }
    }

}


export default checkUsersInfo
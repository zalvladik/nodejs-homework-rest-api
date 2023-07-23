import isValidId from "./isValidId.js";
import validateBody from "./validateBody.js";
import authenticate from "./authenticate.js";

const mw = {
    isValidId,
    validateBody,
    authenticate,
}

export default mw
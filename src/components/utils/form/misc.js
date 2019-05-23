export const validation = (value,rules) => {
    let valid = true;
    let length;
    for(let rule in rules){
        switch(rule){
            case "isRequired":
                valid = valid && validateIsRequired(value);
                break;
            case "isEmail" :
                valid = valid && validateIsEmail(value);
                break;
            case "minLength" :
                length = rules.minLength;
                valid = valid && validateMinLength(value,length);
                break;
            case "maxLength" :
                length = rules.maxLength;
                valid = valid && validateMaxLength(value,length);
                break;
            case "confirmPass" :
                valid = valid && confirmPassword(value,rules);
                break;
            default:
                valid = true;
        }
    }
    console.log(valid);
    return valid;

}

const confirmPassword = (value,rules) => {
    if(value != rules.confirmPass){
        return false;
    }
    return true;
}

const validateIsEmail = value => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}
const validateIsRequired = value => {
    if(value.replace(/\s+/, "")  != ""){
        return true
    }
    return false;
}

const validateMinLength = (value,length) => {
    if(value.length >= length){
        return true;
    }
    return false;
}

const validateMaxLength = (value,length) => {
    if(value.length <= length){
        return true;
    }
    return false;
}
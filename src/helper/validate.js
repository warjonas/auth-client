import toast from 'react-hot-toast'
import { authenticate } from './helper'

/**validate login page username */
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values)

    if (values.username) {
        //check user existence
        const { status } = await authenticate(values.username)
        if (status !== 200) {
            errors.exist = toast.error('User does not exist')
        }

    }

    return errors
}

/**validate  password */
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values)

    return errors;
}

/**validate reset password */

export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);

    if (values.password !== values.confirmPassword) {
        errors.exist = toast.error("Passwords do not match");
    }

    return errors;
}

export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;


}

/**profile validation */

export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors;
    
}


/************************************************************** */


function passwordVerify(errors = {}, values) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        errors.password = toast.error('Password Required')
    } else if (values.password.includes(" ")) {
        errors.password = toast.error('Wrong Password')
    } else if (values.password.length < 4) {
        errors.password = toast.error('Password must be more than 4 Characters long')
        
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error('Password must include special characters')
        
    }
}


function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required');

    } else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid Username')
    }

    return error;
}

function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required");

    }
    else if (values.email.includes(" ")){
        error.email = toast.error("Wrong email");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = toast.error("Invalid email address")
        
    }

    return error;

}


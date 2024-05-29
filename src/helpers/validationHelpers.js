export function validateName(name) {
    /**
     * Validates that the given name contains only alphabetic characters, numbers, and spaces.
     * Also checks if the name is at least 4 characters long.
     *
     * @param {string} name - The name to validate.
     * @returns {[boolean, string]} - An array where the first element is true if the name is valid,
     *                                false otherwise, and the second element is the reason for rejection.
     */
    
    // Regular expression to match only alphabetic characters, numbers, and spaces
    const pattern = /^[A-Za-z0-9\s]+$/;

    // Check if the name has less than 4 characters
    if (name.length < 4) {
        return [false, "The name must be at least 4 characters long."];
    }
    
    // Check if the name contains any invalid characters
    if (!pattern.test(name)) {
        return [false, "The name contains special characters."];
    }

    // If both checks pass, the name is valid
    return [true, "The name is valid."];
}


export function validateEmail(email) {
    /**
     * Validates the given email address.
     *
     * @param {string} email - The email address to validate.
     * @returns {[boolean, string]} - An array where the first element is true if the email is valid,
     *                                false otherwise, and the second element is the reason for rejection.
     */
    
    // Regular expression to validate email addresses
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email contains spaces
    if (/\s/.test(email)) {
        return [false, "The email address should not contain spaces."];
    }
    
    // Check if the email matches the pattern
    if (!pattern.test(email)) {
        return [false, "The email address is not in a valid format."];
    }

    // If both checks pass, the email is valid
    return [true, "The email address is valid."];
}

export function validatePassword(password) {
    /**
     * Validates the given password based on common criteria.
     *
     * @param {string} password - The password to validate.
     * @returns {[boolean, string]} - An array where the first element is true if the password is valid,
     *                                false otherwise, and the second element is the reason for rejection.
     */

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
        return [false, "The password must be at least 8 characters long."];
    }
    
    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return [false, "The password must contain at least one uppercase letter."];
    }
    
    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return [false, "The password must contain at least one lowercase letter."];
    }
    
    // Check if the password contains at least one digit
    if (!/\d/.test(password)) {
        return [false, "The password must contain at least one digit."];
    }
    
    // Check if the password contains at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return [false, "The password must contain at least one special character."];
    }

    // If all checks pass, the password is valid
    return [true, "The password is valid."];
}

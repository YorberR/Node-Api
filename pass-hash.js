const bcrypt = require('bcrypt');

async function hashPassword() {
    const password = 'mysecretpassword';
    const hash = await bcrypt.hash(password, 10);

    return hash;

}

hashPassword();
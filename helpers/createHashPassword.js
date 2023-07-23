import bcrypt from 'bcryptjs'

const lmao = async(password) => {
    const salt = bcrypt.genSaltSync(10);
    const result = bcrypt.hashSync(password, salt)

    const compareResult = await bcrypt.compare(password, result)
} 

lmao()
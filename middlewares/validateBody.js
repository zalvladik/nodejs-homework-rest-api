const validateBody = schema =>{
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error){
            return (res.status(401).send({ message: 'Помилка від Joi або іншої бібліотеки валідації' }))
        }
        next()
    }

    return func
}

export default validateBody
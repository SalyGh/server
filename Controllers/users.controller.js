
const express = require('express')
const router = express.Router()

const User = require('../Models/users.models.js')
const { generateCrudMethods } = require('../Repository/users.repository.js')
const users = generateCrudMethods(User)
// const { validateDbId, raiseRecord404Error } = require('../middlewares');

// http get request = get all ysers 
router.get('/', (req, res, next) => {
    users.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
})
// http get request = get user by id passed
router.get('/:id', (req, res, next) => {
    users.getById(req.params.id)
        .then(data => {
             res.send(data)
        })
        .catch(err => next(err))
})
// http post request  = add user 
router.post('/', (req, res, next) => {
    users.create(req.body)
        .then(data => res.send(data)) 
        .catch(err => next(err))
})
// http put request = edit user with this id 
router.put('/:id',  (req, res) => {
    users.update(req.params.id, req.body)
        .then(data => {
            res.send(data)
        })
        .catch(err => next(err))
})

// http delete request = delete user with this id 
router.delete('/:id',  (req, res) => {
    users.delete(req.params.id)
        .then(data => {
            res.send(data)
        })
        .catch(err => next(err))
})


module.exports = router
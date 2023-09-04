
const express = require('express')
const router = express.Router()
const User = require('../Models/users.models.js')
const { generateCrudMethods } = require('../Repository/users.repository.js')
const users = generateCrudMethods(User)


router.get('/all', (req, res, next) => { // all users 
  users.getAll()
      .then(data => {
           res.send(data)
      })
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
    console.log(req.body)
    users.create(req.body)
        .then(data => res.send(data)) 
        .catch(err => next(err))
})
// http put request = edit user with this id 
router.put('/:id',  (req, res, next ) => {
    users.update(req.params.id, req.body)
        .then(data => {
            res.send(data)
        })
        .catch(err => next(err))
})

// http delete request = delete user with this id 
router.delete('/:id',  (req, res , next) => {
    users.delete(req.params.id)
        .then(data => {
            res.send(data)
        })
        .catch(err => next(err))
})

const pageSize = 2 ; // 2 items per page

// api/user/pages/2 
router.get('/pages/:page', (req, res) => { // get request with pagination - note : we can implement pagination method as a middleware if we want to use the pagination for multiple APIs

    const pageNumber = req.params.page || 1; // getting  the current page number from the query parameters
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    users.getAll()
        .then(data => {
            const result = data.slice(startIndex, endIndex);
            const sortedResult = result.sort((a, b) => {
                return a.Username > b.Username;
            }); 
            res.send(sortedResult)
        })
        .catch(err => next(err))

});
// api/users?character=s
router.get('/', (req, res , next)  => { // filteration method - get all users whose name starts with ...

    const character = req.query.character ; 
    users.getAll()
        .then(data => {
            const result = data.filter(u=> u.Username[0].toLowerCase() == character.toLowerCase());
            res.send(result)
        })
        .catch(err => next(err))

});





module.exports = router
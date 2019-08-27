const express = require('express')
const employeeRouter = express.Router()
const Employee = require('../models/employeeSchema.js')

// GET ALL
employeeRouter.get("/", (req, res, next) => {
    // Addition: include fultering criteria to the find so that it only finds todo items with a 'user' property with the current user's id.
    Employee.find((err, employees) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.send(employees)
    })
})

employeeRouter.post("/", (req, res, next) => {
    console.log(req.body)
    const employee = new Employee(req.body)

    // Set the user property of an employee to req.user._id (logges-in user's '_id" property)
    // employee.user = req.user._id - for userAuth
    // employee.user = req.body._id

    // Same as before
    employee.save((err, newEmployee) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newEmployee)
    })
})

// What endpoint do I use for my put request?
// Should I route to my view component?
employeeRouter.put("/:_id",(req, res, next) => {
    Employee.findOneAndUpdate(
        {_id: req.params._id, },
        // adding to array thats inside data
        // What will I add to instead of responses
        {$push: {responses: req.body.response}},
        {new: true}, (error, updatedEmployee) => {
            if(error) {
                res.status(500)
                return next(error)
            }
            return res.status(201).send(updatedEmployee)
        }
    )
})

employeeRouter.get('/:employeeId', (req, res, next) => {
    
    // Addition: Change to findOne and include the seatch criteria for users
    Employee.findOne({_id: req.params.employeeId, user: req.user._id}, (err, employee) => {
        if (err) {
            res.status(500)
            return next (err)
        }
        if (!employee) {
            res.status(404)
            return next (new Error("No employee found"))
        }
        return res.send(employee)
    })
})

employeeRouter.put("/:employeeId", (req, res, next) => {
    // Addition: Change to findOneAndUpdate and include the query for users
    Employee.findOneAndUpdate(
        // Updated query to include user
        {_id: req.params.employeeId, user: req.user._id},
        req.body,
        {new: true},
        (err, employee) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.send(employee)
        }
    )
})

// Addition: Change to findOneAndRemove and include the search criteria for users
employeeRouter.delete("/:employeeId", (req, res, next) => {
    Employee.findOneAndRemove({_id: req.params.employeeId, user: req.user._id}, (err, deletedEmployee) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send({employee: deletedEmployee, msg: `Successfully deleted the employee`})
    })
})

module.exports = employeeRouter
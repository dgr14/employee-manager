const express = require('express')
const employeeRouter = express.Router()
const Employee = require('../models/employeeSchema.js')

// GET ALL
employeeRouter.get("/", (req, res, next) => {
    // Addition: include filtering criteria to the find so that it only finds todo items with a 'user' property with the current user's id.
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
    // console.log(req.body)
    const newObject = req.body
    console.log(newObject)
    Employee.findOneAndUpdate(
        {_id: req.params._id },
        // adding to array thats inside data
        // What will I add to instead of responses
        // Need to figure out how to display the updated data
        newObject,
        {new: true}, (err, updatedEmployee) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            console.log(updatedEmployee)
            return res.status(201).send(updatedEmployee)
        }
    )
})

employeeRouter.get('/:employeeId', (req, res, next) => {
    
    // Addition: Change to findOne and include the seatch criteria for users
    console.log(req.params)
    Employee.findOne({_id: req.params.employeeId}, (err, employee) => {
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

// Addition: Change to findOneAndRemove and include the search criteria for users
employeeRouter.delete("/:employeeId", (req, res, next) => {
    Employee.findOneAndRemove({_id: req.params.employeeId}, (err, deletedEmployee) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send({employee: deletedEmployee, msg: `Successfully deleted the employee`})
    })
})

module.exports = employeeRouter
const mongoose = require('mongoose');
const {Types: {ObjectId}} = mongoose;
const Task = require('../models/task');

// get all the tasks by user id
const getTasks = async (req, res) => {
    try{
        const userId = req.userId;
        const tasks = await Task.find({userId}).sort({createdAt: 'desc'});;
        res.status(200).json(tasks); 
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
}

// get a single task
const getTaskById = async (req, res) => {
    const {id} = req.params;
    try{
        if(!ObjectId.isValid(id)){
            return res.status(404).json({error: "No such task found"})
        }
        const task = await Task.findById(id);
        if(!task){
            return res.status(404).json({error: "No such task found"});
        }
        res.status(200).json(task); 
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
}

// create a task
const createTask = async (req, res) => {
    const {text, date, priority} = req.body;
    const userId = req.userId;
    try{
        const task = await Task.create({text, date, priority, userId});
        res.status(200).json(task); 
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
}

// delete a task
const deleteTaskById = async (req, res) => {
    const {id} = req.params;
    try{
        if(!ObjectId.isValid(id)){
            return res.status(404).json({error: "No such task found"});
        }
        const task = await Task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({error: "No such task found"});
        }
        res.status(200).json(task); 
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
}

//update a task
const updateTaskById = async (req, res) => {
    const {id} = req.params;
    const updateData = req.body;
    try{
        if(!ObjectId.isValid(id)){
            return res.status(404).json({error: "No such task found"})
        }
        const task = await Task.findByIdAndUpdate(id, updateData);
        if(!task){
            return res.status(404).json({error: "No such task found"});
        }
        res.status(200).json(task); 
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    deleteTaskById,
    updateTaskById
}
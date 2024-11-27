const express = require('express');
const { resolve } = require('path');

let cors = require('cors');
const app = express();
const port = 3010;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];
app.use(cors());

app.use(express.static('static'));
function addNewTask(taskId, text, priority, tasks) {
  let obj = { taskId, text, priority };
  tasks.push(obj);
  return tasks;
}
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);

  tasks = addNewTask(taskId, text, priority, tasks);
  res.json(tasks);
});

function getTasks() {
  return tasks;
}

app.get('/tasks', (req, res) => {
  let taskList = getTasks();
  res.json(taskList);
});

function sortByPriority(tasks) {
  let newTask = tasks.sort((task1, task2) => task1.priority - task2.priority);
  return newTask;
}
app.get('/tasks/sort-by-priority', (req, res) => {
  let results = sortByPriority(tasks);
  res.json(results);
});
function changePriority(tasks, taskId, priority) {
  let result = tasks.map((task) => {
    if (task.taskId === taskId) {
      task.priority = priority;
    }
    return task;
  });
  return result;
}
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);

  tasks = changePriority(tasks, taskId, priority);
  res.json(tasks);
});
function chageTaskText(tasks, taskId, text) {
  let result = tasks.map((task) => {
    if (task.taskId === taskId) {
      task.text = text;
    }
    return task;
  });
  return result;
}
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  tasks = chageTaskText(tasks, taskId, text);
  res.json(tasks);
});

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  tasks = tasks.filter((ele) => ele.taskId !== taskId);
  res.json(tasks);
});
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let newTask = tasks.filter((ele) => ele.priority === priority);
  res.json(newTask);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

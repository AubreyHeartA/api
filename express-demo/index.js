const express = require('express');
const app = express();

app.use(express.json());

const student = [
    {id: 1, student_id: 100, name: "Heart Aubrey", birthday: "February 20, 1999"},
    {id: 2, student_id: 200, name: "Clarice Raven", birthday: "March 01, 1999"},
    {id: 3, student_id: 300, name: "Katrina Gwen", birthday: "April 02, 1999"},
    {id: 4, student_id: 400, name: "Aselle Drew", birthday: "May 21, 1999"},
];

//get all
app.get(('/api/student'), (req, res) => {
    res.send(student);
});

//get specific
app.get(('/api/student/:id'), (req, res) => {
    const student_data = student.find(s => s.id === parseInt(req.params.id));
    if(!student_data) res.status(404).send("The student with id " + student.id + " does not exist.");
    res.send(student_data);
});

//post information
app.post('/api/student', (req, res) => {
    if(!req.body.name || req.body.name.length < 3){
        res.status(404).send('Name should not be empty or minimum of 3 characters.');
        return;
    }
        const student_data = {
            id: student.length + 1,
            name: req.body.name
        };
        student.push(student_data);
        res.status(200).send('New Information Added');
});

//put information
app.put('/api/student/:id', (req, res) => {
    const student_data = student.find(c => c.id === parseInt(req.params.id));
    if(!student_data) res.status(404).send('Student not found');

    student_data.name = req.body.name;
    res.status(200).send('Update Successfully');
});

//delete information
app.delete("/api/student/:id", (req, res) =>{
    const student_data = student.find(c => c.id === parseInt(req.params.id));
    if(!student) res.status(404).send('Not Found');

    const index = student.indexOf(student_data);
    student.splice(index, 1);

    res.status(200).send('Successfully Deleted');
});


app.listen(3000, () => console.log("Listening on http://localhost:3000"));
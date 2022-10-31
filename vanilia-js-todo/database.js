const fs = require("fs");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();

module.exports = {
    addElement: function (todo,done) {

        let db = new sqlite3.Database(path.join(__dirname, "database.db"));

        // insert one row into the langs table
        db.run(`INSERT INTO todos (todo,done) VALUES(?,?)`, [todo,done], function(err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });

        // close the database connection
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });

    },

    createDB: function () {

        let db = new sqlite3.Database(path.join(__dirname, "database.db"));

        // create table todos
        db.run("CREATE TABLE IF NOT EXISTS  todos(todo text, done int)", function (err) {
            if (err) {
                return console.log(err.message);
            }


            console.log(`A table has been created with name todos`);
        });

        // close the database connection
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    },


    loadDB: function () {


         var todoList = [{todo:"sada"}];

        // open the database and load data
        let db = new sqlite3.Database(path.join(__dirname, "database.db"), sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database.');
        });


           /* db.each(`SELECT * FROM todos`, (err, row) => {
                if (err) {
                    console.error(err.message);
                }

                const obj = {};
                obj['todo'] = row.todo;
                todoList.push(obj);


            },() => {
                console.log("pushed: "+todoList)
               return  resolve(todoList);
            });*/


            return new Promise((resolve, reject) => {
                db.each(`SELECT * FROM todos`, (err, row) => {
                    if (err) {
                        reject(err);
                        console.error(err.message);
                    } else{
                        const obj = {};
                        obj['todo'] = row.todo;
                        todoList.push(obj);
                        resolve(todoList);
                    }

                })

            })

    },

    deleteEntry: function (todo) {
        let db = new sqlite3.Database(path.join(__dirname, "database.db"), sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database.');
        });

        db.run("DELETE FROM todos WHERE todo=(?)", todo, function(err) {
            if (err) {
                return console.log(err.message);
            }

            console.log(`Deleted`);
        });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    },

    updateEntry: function (oldTodo, newTodo) {
        let db = new sqlite3.Database(path.join(__dirname, "database.db"), sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database.');
        });

        db.run("UPDATE todos SET todo=(?) WHERE todo=(?)", newTodo,oldTodo, function(err) {
            if (err) {
                return console.log(err.message);
            }

            console.log(`Updated`);
        });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}


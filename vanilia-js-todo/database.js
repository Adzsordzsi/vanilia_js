const path = require("path");
const sqlite3 = require('sqlite3').verbose();

module.exports = {
    addElement: function (todo) {

        let db = connect();

        // insert one row into the todos table
        db.run(`INSERT INTO todos (todo,done) VALUES(?,0)`, todo, function(err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });

        // close the database connection
        close(db)

    },

    createDB: function () {

        let db = new sqlite3.Database(path.join(__dirname, "/db/database.db"));

        // create table todos
        db.run("CREATE TABLE IF NOT EXISTS  todos(todo text, done int)", function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`A table has been created with name todos`);
        });

        // close the database connection
        close(db)
    },


    loadDB: function () {
        const todoList = [];

        // open the database and load data from todos table
        let db = connect()

            return new Promise((resolve, reject) => {
                db.each(`SELECT * FROM todos`, (err, row) => {
                    if (err) {
                        reject(err);
                        console.error(err.message);
                    } else{
                        const obj = {};
                        obj['todo'] = row.todo;
                        obj['done'] = row.done;
                        todoList.push(obj);
                        resolve(todoList);
                    }

                });
                close(db);

            })

    },

    deleteElement: function (todo) {
        let db = connect()

        db.run("DELETE FROM todos WHERE todo=(?)", todo, function(err) {
            if (err) {
                return console.log(err.message);
            }

            console.log(`Deleted from table todos`);
        });

        close(db)
    },

    deleteAllElements: function () {
        let db = connect()

        db.run("DELETE FROM todos ", function(err) {
            if (err) {
                return console.log(err.message);
            }

            console.log(`Deleted all elements in todos`);
        });

        close(db)
    },

    updateElement: function (todo, done) {
        let db = connect()

        db.run("UPDATE todos SET done=(?) WHERE todo=(?)", done,todo, function(err) {
            if (err) {
                return console.log(err.message);
            }

            console.log(`Updated`);
        });

        close(db)
    }
}

function connect() {
    return new sqlite3.Database(path.join(__dirname, "/db/database.db"), sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
}


function close(db) {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}


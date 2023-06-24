const express = require('express');
const routes = express.Router();

routes.get('/', (req, res)=> {
    req.getConnection((error, conn)=> {
        if(error) return res.send(error);

        conn.query('SELECT * FROM tasks', (error, rows)=> {
            if(error) return res.send(error);

            res.json(rows);
        });
    });
});

routes.post('/', (req, res)=> {
    console.log(req.body)
    req.getConnection((error, conn)=> {
        if(error) return res.send(error);

        conn.query('INSERT INTO tasks SET ?', [req.body], (error, rows)=> {
            if(error) return res.send(error);

            res.send({ message: 'task added' });
        });
    });
});

routes.delete('/:id', (req, res)=> {
    req.getConnection((error, conn)=> {
        if(error) return res.send(error);

        conn.query('DELETE FROM tasks WHERE idtasks = ?', [req.params.id], (error, rows)=> {
            if(error) return res.send(error);

            res.send({ message: 'task eliminated' });
        });
    });
});

routes.post('/:id', (req, res)=> {
    console.log(req.body)
    req.getConnection((error, conn)=> {
        if(error) return res.send(error);

        conn.query('UPDATE tasks SET ? WHERE idtasks = ?', [req.body, req.params.id], (error, rows)=> {
            if(error) return res.send(error);

            res.send({ message: 'task added' });
        });
    });
});

module.exports = routes;
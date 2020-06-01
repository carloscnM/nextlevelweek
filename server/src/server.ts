import express, { response } from 'express';

const app = express();

app.get('/users', (req, res) => {


    res.json({'desafio': 'Next Level Week', 'aluno': 'Carlos Mario'});
});

app.listen(3333);
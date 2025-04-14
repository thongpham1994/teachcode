import express from 'express';

import * as dotenv from 'dotenv'
import connect from './database/database.js'
//authen middleware
import checkToken from './authentication/auth.js';
import { usersRouter,
         studentsRouter,
         klassRouter
        } from './routes/index.js'




dotenv.config()     //must have
const app = express();
app.use(checkToken);
app.use(express.json());
const port = process.env.PORT ?? 3000

app.use('/users', usersRouter);
app.use('/students', studentsRouter);
app.use('/klass', klassRouter);

app.get('/', (req, res) => {
    res.send('response from root router testing side')
})
app.listen(port, async() => {
    //Connect to database
    await connect()
    console.log(`listening on port: ${port}`)
})


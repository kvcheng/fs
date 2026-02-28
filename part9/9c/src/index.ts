import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosis';
import patientsRouter from './routes/patients';
import zodErrorHandler from './middleware/zodErrorHandler';
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
    console.log('Received ping request');
    res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientsRouter);

app.use(zodErrorHandler);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
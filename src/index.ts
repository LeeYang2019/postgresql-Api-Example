import * as dotenv from 'dotenv';
dotenv.config(); //loaded into process.env

import app from './server';

const PORT = process.env.port || 3001;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

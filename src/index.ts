import * as dotenv from 'dotenv';
dotenv.config(); //loaded into process.env

import app from './server';
import config from './config';

const PORT = process.env.port || config.port;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

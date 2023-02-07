import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { AppDataSource } from './database/connection';

async function main() {
    const port = process.env.APP_PORT || undefined;
    
    await AppDataSource.initialize()
        .then(() => {
            app.listen(port || 3000, () => { 
                console.info(`\nServer is running on port: ${port}`);
            });
        }).catch((error) => {
            console.error(`\nConection refused: ${error}`);
        });
}

main();
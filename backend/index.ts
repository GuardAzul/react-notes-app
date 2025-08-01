import app from './src/interfaces/http/Server';
import { sequelize } from './src/infraestructure/config/database';

const PORT = 3000;

async function start() {
 try{
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
 }catch(error){
    console.error('Error starting server:', error);
 }
}

start();

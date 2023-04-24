import createApp from './app';
import DatabaseConnection from './database/dbConnection';

const port = process.env.PORT || 3000;
const db = new DatabaseConnection();
const app = createApp(db);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
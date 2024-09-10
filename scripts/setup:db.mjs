import inquirer from 'inquirer';
import { config } from 'dotenv';
import path from 'path';
import { execSync } from 'child_process';
import utils from './utils/index.mjs';
import testConnection from './utils/testConnection.mjs';
import createUser from './utils/createUser.mjs';

config();

const DB_CONTAINER = process.env.CMS_DOCKER_DB_CONTAINER;
const DB_SERVER = process.env.CMS_DOCKER_DB_SERVER;
const DB_PORT = process.env.CMS_DB_PORT;
const DB_USER = process.env.CMS_DB_USER;
const DB_PASSWORD = process.env.CMS_DB_PASSWORD;
const DB_NAME = process.env.CMS_DB_NAME;

const importDump = async () => {
  const dump_file = path.resolve('./migrations/initial.sql');
  const command = `docker exec -i ${DB_CONTAINER} mysql -h ${DB_SERVER} -P ${DB_PORT} -u ${DB_USER} -p${DB_PASSWORD} ${DB_NAME} < ${dump_file}`;

  console.log('Preparing for import the database');

  try {
    execSync(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`⚠️ Error importing database: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`⚠️ Error: ${stderr}`);
        return;
      }
      console.log('Import was success');
    });
  } catch (e) {
    console.error(e);
  }
};

const createAdmin = async () => {
  try {
    const admin_data = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstname',
        message: 'First name',
        validate: (input) => input.length >= 3,
      },
      {
        type: 'input',
        name: 'lastname',
        message: 'Last name',
        validate: (input) => input.length >= 3,
      },
      {
        type: 'input',
        name: 'email',
        message: 'Email',
        validate: (input) => utils.isEmailValid(input),
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password',
        validate: (input) => input.length >= 3,
      },
    ]);

    await createUser({ ...admin_data });
  } catch (e) {
    console.error(e);
  }
};

const setupDb = async () => {
  try {
    await testConnection();

    console.log('*******************************');
    console.log('*   AitneCMS database setup   *');
    console.log('*******************************');
    console.log('\n');
    console.log('Now we will prepare the MySQL database and import the initialization data and prepare the users');
    console.log('\n');

    const intro = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'create_initial_db',
        message: 'Do you want to import the initialization database?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'create_new_admin',
        message: 'Do you want to create a new admin?',
        default: false,
      },
    ]);

    if (intro.create_initial_db) await importDump();
    if (intro.create_new_admin) await createAdmin();

  } catch (e) {
    console.error(e);
  }
};

setupDb();

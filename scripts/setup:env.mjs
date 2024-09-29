import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { node_createFile, node_getSalt } from '../utility/index.mjs';

const TOKEN_ENV_KEY = 'CMS_INTEGRITY_TOKEN';
const ENV_SRC = '.env.example';
const ENV_DEV = '.env';
const ENV_PROD = '.env.production';
const ENV_SRC_PATH = path.join(process.cwd(), ENV_SRC);
const ENV_DEV_PATH = path.join(process.cwd(), ENV_DEV);
const ENV_PROD_PATH = path.join(process.cwd(), ENV_PROD);

const replaceKeyValue = (content, key, newValue) => {
  const regex = new RegExp(`^(${key}=)(.*)$`, 'm');

  return content.replace(regex, `$1${newValue}`);
};

const prepareDevEnv = async () => {
  try {
    const data = await fs.promises.readFile(ENV_SRC_PATH, 'utf8');
    const content = replaceKeyValue(data, TOKEN_ENV_KEY, node_getSalt(8));

    node_createFile(ENV_DEV_PATH, content);
  } catch (err) {
    console.error(err);
  }
};

const updateDevEnv = async ({
  dbName,
  dbUser,
  dbPass,
  dbPort,
}) => {
  try {
    let data = await fs.promises.readFile(ENV_SRC_PATH, 'utf8');
    data = replaceKeyValue(data, TOKEN_ENV_KEY, node_getSalt(8));
    data = replaceKeyValue(data, 'CMS_DB_NAME', dbName);
    data = replaceKeyValue(data, 'CMS_DB_USER', dbUser);
    data = replaceKeyValue(data, 'CMS_DB_PASSWORD', dbPass);
    const content = replaceKeyValue(data, 'CMS_DB_PORT', dbPort);

    node_createFile(ENV_DEV_PATH, content);
  } catch (err) {
    console.error(err);
  }
};

const prepareProdEnv = async () => {
  try {
    const data = await fs.promises.readFile(ENV_SRC_PATH, 'utf8');
    const content = replaceKeyValue(data, TOKEN_ENV_KEY, node_getSalt(8));

    node_createFile(ENV_PROD_PATH, content);
  } catch (err) {
    console.error(err);
  }
};

const setupEnv = async () => {
  try {
    console.log('**********************************');
    console.log('*   AitneCMS environment setup   *');
    console.log('**********************************');
    console.log('\n');
    console.log('Now we will prepare the environment variables in the project');
    console.log('\n');

    const intro = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'create_prod_env',
        message: 'Do you want to create variables for production as well?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'update_dev_env',
        message: `Do you want to edit development variables now?`,
        default: false,
      },
    ]);

    await prepareDevEnv();

    if (intro.create_prod_env) await prepareProdEnv();
    if (intro.update_dev_env) {
      const setup_db = await inquirer.prompt([
        {
          type: 'input',
          name: 'dbName',
          message: 'Database name',
        },
        {
          type: 'input',
          name: 'dbUser',
          message: 'Database user',
        },
        {
          type: 'password',
          name: 'dbPass',
          message: 'Database password',
        },
        {
          type: 'number',
          name: 'dbPort',
          message: 'Database port',
          default: 3306,
        },
      ]);

      await updateDevEnv(setup_db);
    }

    // Results:
    console.log(`✔️󠀠   Environment file "${ENV_DEV}" was created`);
    if (intro.create_prod_env) console.log(`✔️󠀠   Environment file "${ENV_PROD}" was created`);
    if (intro.update_dev_env) console.log(`✔️󠀠   Environment file "${ENV_DEV}" was updated`);
    console.log('\n');
  } catch (err) {
    console.error(err);
  }
}

setupEnv();

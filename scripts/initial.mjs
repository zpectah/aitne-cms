import fs from 'fs';
import path from 'path';
import crypto from 'node:crypto';
import utils from './utils.mjs';

const sourceEnv = '.env.example';
const developmentEnv = '.env';
const productionEnv = '.env.production';

const sourceEnvPath = path.join(process.cwd(), sourceEnv);
const developmentEnvPath = path.join(process.cwd(), developmentEnv);
const productionEnvPath = path.join(process.cwd(), productionEnv);

const replaceKeyValue = (content, key, newValue) => {
  const regex = new RegExp(`^(${key}=)(.*)$`, 'm');

  return content.replace(regex, `$1${newValue}`);
};

const copyAndModifyEnv = async () => {
  try {
    const token = crypto.randomBytes(16).toString('hex');
    const data = await fs.promises.readFile(sourceEnvPath, 'utf8');

    const content = replaceKeyValue(data, 'CMS_TOKEN', token);

    utils.createFile(developmentEnvPath, content);
    utils.createFile(productionEnvPath, content);
  } catch (err) {
    console.error(err);
  }
};

function initial() {
  copyAndModifyEnv().then(() => {
    console.log(`\n✔️󠀠  Environment files [${developmentEnv}, ${productionEnv}] was successfully created\n`);
  });
}

initial();

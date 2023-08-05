const { exec } = require('child_process');

const compileReact = () => {
  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
};

const compileAndWatch = () => {
  compileReact();
  console.log('Watching for changes...');
  exec('npm run start');
};
npm 
compileAndWatch();
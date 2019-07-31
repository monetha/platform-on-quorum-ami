const download = require('download-git-repo');
const shell = require('shelljs');
const url = 'github:monetha/reputation-contracts';
const tmpDir = 'tmp';
const destDir = 'build';
console.log('Downloading contracts...');
download(url, tmpDir, (err) => {
  try {
    if (err) {
      console.log(err);
      return;
    }
    shell.cd(tmpDir);
    try {
      console.log('Installing contract dependencies...');
      if (shell.exec('npm install').code !== 0) {
        console.log('Failed to install dependencies for contracts');
        return;
      }
      console.log('Compiling contracts...');
      if (shell.exec('npm run compile').code !== 0) {
        console.log('Failed to compile contracts');
        return;
      }
    } finally {
      shell.cd('..');
    }
    // Move built contracts to root
    shell.rm('-rf', destDir);
    shell.mv(`${tmpDir}/build`, destDir);
    console.log('Done!');
  } finally {
    // Always remove tmp dir
    shell.rm('-rf', tmpDir);
  }
});
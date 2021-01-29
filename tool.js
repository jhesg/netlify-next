const execSync = require('child_process').execSync;

const getAffected = `git diff 82dd691eb84aa83ac865fe6b509de1d34fc1311d 82dd691eb84aa83ac865fe6b509de1d34fc1311d -- apps/app_one/`;
const output = execSync(getAffected, {
    shell: '/bin/bash'
}).toString().trim();

console.log('output: ', `"${output}", typeof: "${typeof output}", result: ${Boolean(output)}`);
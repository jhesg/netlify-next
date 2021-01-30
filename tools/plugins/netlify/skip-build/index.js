module.exports = {
    onPreBuild: ({ utils }) => {
        const currentProject = process.env.PROJECT_NAME;

        if (currentProject === undefined) {
            utils.build.cancelBuild(
                `Build was cancelled because workspace does not have a "PROJECT_NAME" enviroment variable.`
            );
        }

        const lastDeployedCommit = process.env.CACHED_COMMIT_REF;
        const latestCommit = 'HEAD';

        const projectHasChanged = checkIfProjectHasChanged(
            lastDeployedCommit,
            latestCommit
        );

        if (!projectHasChanged) {
            utils.build.cancelBuild(
                `Build was cancelled because workspace: "${currentProject}" was not affected by the latest changes`
            );
        } else {
            console.log(`Build will proceed for workspace: "${currentProject}" as it was affected by the latest changes`)
        }
    }
};

function checkIfProjectHasChanged(fromHash, toHash) {
    const execSync = require('child_process').execSync;

    const getAffected = `git diff ${fromHash} ${toHash} -- $(pwd)`;
    const output = execSync(getAffected, {
        shell: '/bin/bash'
    }).toString().trim();

    console.log(getAffected);

    return Boolean(output);
}

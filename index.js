import core from '@actions/core';
import exec from '@actions/exec';
import tc from '@actions/tool-cache';

const baseDownloadURL = "https://github.com/symbiosis-cloud/cli/releases/download"

async function downloadCli(version) {
	if (process.platform === 'win32') {
		const download = await tc.downloadTool(`${baseDownloadURL}/v${version}/sym-cli_${version}_Windows_amd64.zip`);
		return tc.extractZip(download);
	}
	if (process.platform === 'darwin') {
		const download = await tc.downloadTool(`${baseDownloadURL}/v${version}/sym-cli_${version}_Darwin_amd64.tar.gz`);
		return tc.extractTar(download);
	}
	const download = await tc.downloadTool(`${baseDownloadURL}/v${version}/sym-cli_${version}_Linux_amd64.tar.gz`);
	return tc.extractTar(download);
}

async function main() {
	const version = core.getInput('version');
	try {
    var path = tc.find("sym", version);
    if (!path) {
      const installPath = await downloadCli(version);
      path = await tc.cacheDir(installPath, 'sym', version);
    }

    core.addPath(path);
    core.info(`sym version v${version} installed to ${path}`);

    var apiKey = core.getInput('api-key', { required: true });
    core.setSecret(apiKey);
    await exec.exec('sym config init', [apiKey]);
    core.info(`successfully configured sym API key`);
	} catch (error) {
		core.setFailed(error.message);
	}
}

main();

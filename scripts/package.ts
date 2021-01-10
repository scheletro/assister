import path from 'path';
import fs from 'fs';
import archiver from 'archiver';

import version from '../configurations/version.json';

import { getGitBranch, getGitCommitInfo, getGitCommitHash } from './version';

const DistFolder = path.resolve(__dirname, '../build/');
const OutputPath = path.resolve(__dirname, '../assister-package.zip');

const output = fs.createWriteStream(OutputPath);
const archive = archiver('zip', {
    zlib: { level: 9 }
});

output.on('close', function() {
    console.log('hash : ', getGitCommitHash());
    console.log('file size : ' + archive.pointer() + ' total bytes .');
    console.log('Archiver Successfully !!!');
});

output.on('end', function() {
    console.log('Data has been drained');
});

archive.on('warning', function(err: archiver.ArchiverError) {
    if (err.code === 'ENOENT') {
        // log warning
    } else {
        // throw error
        throw err;
    }
});

archive.on('error', function(err: archiver.ArchiverError) {
    throw err;
});

archive.pipe(output);

const VersionBuffer = Buffer.from(JSON.stringify(Object.assign({}, version, {
    commit: { ...getGitCommitInfo(), hash: getGitCommitHash(), branch: getGitBranch() }
})));
archive.append(VersionBuffer, { name: 'version.json' });

archive.directory(DistFolder, false);

// TODO: set ignore file config
// glob

archive.finalize();
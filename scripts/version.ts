import { execSync } from 'child_process';

export function getGitBranch(): string {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

export function getGitCommitHash(isLong = false): string {
    let command = 'git show -s --format=%h';

    if (isLong) {
        command = 'git show -s --format=%H';
    }

    return execSync(command).toString().trim();
}

export function getGitCommitInfo(): {
    author: string,
    email: string,
    timestamp: number | string,
    description: string
} {
    const timestamp = execSync('git show -s --format=%cd').toString().trim();
    const author = execSync('git show -s --format=%cn').toString().trim();
    const email = execSync('git show -s --format=%ce').toString().trim();
    const description = execSync('git show -s --format=%s').toString().trim();

    return {
        timestamp,
        author,
        email,
        description
    }
}
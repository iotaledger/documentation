/* eslint-disable no-console */
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const axios = require('axios');
const emoji = require('node-emoji');
const chalk = require('chalk');

const { rootFolder, reportFile, projectsFile, checkRemotePages, consoleDetail } = require('./buildProjects.config.json');

let errorCount = 0;

async function buildProjects(docsFolder) {
    try {
        await fsPromises.unlink(reportFile);
    } catch (err) {
        // Do nothing
    }

    await reportEntry(`Built on: ${new Date().toISOString()}`);
    await reportEntry('');

    await reportEntry(`Reading Project Dir: '${docsFolder}'`);
    await reportEntry('');

    const projects = await readProjects(docsFolder);
    console.log(`Found ${projects.length} Projects.`);

    for (let i = 0; i < projects.length; i++) {
        if (consoleDetail) {
            console.log('');
            console.log('-'.repeat(projects[i].name.length));
            console.log(`${projects[i].name}`);
            console.log('-'.repeat(projects[i].name.length));
            console.log('');
        }

        await reportEntry('');
        await reportEntry(`\tProject: '${projects[i].name}'`);
        await reportEntry(`\tFolder: '${projects[i].folder}'`);

        await buildHome(docsFolder, projects[i]);
        await buildVersions(docsFolder, projects[i]);
    }

    return projects;
}

async function readProjects(docsFolder) {
    const projectFileName = `${docsFolder}/projects.md`;
    const projects = [];

    try {
        await reportEntry(`Reading Projects from file '${projectFileName}'`);

        const projectFile = (await fsPromises.readFile(projectFileName)).toString();

        const re = /\[(.*?)\]\((.*?)\)/g;

        let match;
        do {
            match = re.exec(projectFile);
            if (match && match.length === 3) {
                projects.push({
                    name: match[1],
                    folder: match[2].replace(/^\.?\//, ''),
                    versions: []
                });
            }
        } while (match);
    } catch (err) {
        await reportError(`Failed while trying to read the projects file '${projectFileName}'`, err);
    }

    return projects;
}

async function buildHome(docsFolder, project) {
    const versions = [];
    const homeFile = `${docsFolder}/${project.folder}/home.md`;

    try {
        if (fs.existsSync(homeFile)) {
            await reportEntry(`\tHome File: '${homeFile}'`);

            const home = (await fsPromises.readFile(homeFile)).toString();

            const descriptionMatch = /^# (.*)$/gm.exec(home);
            let description = '';
            if (descriptionMatch && descriptionMatch.length === 2) {
                description = descriptionMatch[1];
            }

            const re = /^\[(.*)\]\((.*)\)\s## (.*)$/gm;
            const links = [];

            let match;
            do {
                match = re.exec(home);
                if (match && match.length === 4) {
                    let link = match[2];
                    if (isRoot(link)) {
                        link = rootToDocs(sanitizeLink(link), docsFolder);
                    } else if (!isRemote(link)) {
                        link = `/${docsFolder}/${project.folder}/${sanitizeLink(link)}`;
                    }
                    links.push({
                        name: match[1],
                        link,
                        description: rootToDocs(match[3], docsFolder)
                    });
                }
            } while (match);

            project.home = {
                description,
                links
            };
        } else {
            await reportEntry(`\tHome File: '${homeFile}' does not exist, project will not show on home navigation`);
        }
    } catch (err) {
        await reportError(`Failed while trying to build the home content for '${project.folder}'`, err);
    }

    return versions;
}

async function buildVersions(docsFolder, project) {
    const projectVersions = listDirs(`${docsFolder}/${project.folder}/`);

    for (let i = 0; i < projectVersions.length; i++) {
        await reportEntry('');
        await reportEntry(`\t\tVersion: '${projectVersions[i]}'`);

        project.versions.push({
            version: projectVersions[i],
            pages: await buildSingleVersion(docsFolder, project.folder, projectVersions[i])
        });
    }
}

async function buildSingleVersion(docsFolder, projectFolder, version) {
    const versions = [];
    const docIndexFile = `${docsFolder}/${projectFolder}/${version}/doc-index.md`;

    try {
        await reportEntry(`\t\tVersion Index: '${docIndexFile}'`);
        const docIndex = (await fsPromises.readFile(docIndexFile)).toString();

        const re = /\[(.*)\]\((.*)\)/g;

        let match;
        do {
            match = re.exec(docIndex);
            if (match && match.length === 3) {
                if (isRoot(match[2])) {
                    versions.push({
                        name: match[1],
                        link: rootToDocs(sanitizeLink(match[2]), docsFolder)
                    });
                } else if (isRemote(match[2])) {
                    versions.push({
                        name: match[1],
                        link: match[2]
                    });
                } else {
                    const { toc, assets } = await extractTocAndValidateAssets(docsFolder, projectFolder, version, match[2], docIndexFile);
                    versions.push({
                        name: match[1],
                        link: `/${docsFolder}/${projectFolder}/${version}/${sanitizeLink(match[2])}`,
                        toc,
                        assets: assets.length > 0 ? assets : undefined
                    });
                }
            }
        } while (match);
    } catch (err) {
        await reportError(`Failed while trying to build the content for '${projectFolder}' v${version}`, err);
    }

    return versions;
}

async function extractTocAndValidateAssets(docsFolder, projectFolder, version, doc, docIndexFile) {
    // Try and load the markdown for the page and if it exists extract
    // the headers to create a toc
    const toc = [];
    const assets = [];

    const docName = webifyPath(path.join(`${docsFolder}/${projectFolder}/${version}/`, doc));

    try {
        if (fs.existsSync(docName)) {
            await reportEntry(`\t\t\tTOC: '${docName}'`);

            let doc = (await fsPromises.readFile(docName)).toString();

            // Match all headers e.g.
            // # Blah blah
            // ## Blah blah
            // But not inside our tab controls or project topics

            doc = removeTabControls(doc);
            doc = removeProjectTopics(doc);

            const reHeaders = /^\s?(#+)(.*?)$/gm;
            let matchHeader;

            do {
                matchHeader = reHeaders.exec(doc);
                if (matchHeader && matchHeader.length === 3) {
                    toc.push({
                        level: matchHeader[1].length,
                        name: extractContent(matchHeader[2])
                    });

                }
            } while (matchHeader);

            toc.map(async t => await reportEntry(`\t\t\t\t${t.level}: ${t.name}`));

            if (!doc.startsWith('# ')) {
                await reportError(`'${docName}' does not start with a level 1 heading`);
            }

            await assetHtmlImage(doc, docName, assets);
            await assetMarkdownImage(doc, docName, assets);

            await htmlLinks(doc, docName);
            await markdownLinks(doc, docName);
            await separators(doc, docName);
        } else {
            await reportError(`'${docIndexFile}' referenced '${docName}' but the file does not exist`);
        }
    } catch (err) {
        await reportError(`'${docIndexFile}' referenced '${docName}' but building TOC failed`, err);
    }

    return { toc, assets };
}

function extractContent(markdown) {
    // The header might be contain a link so we need to extract
    // the actual label
    // e.g. [**`mylabel`**](https://someplace)
    let content = markdown.trim();

    const reLink = /^(?:\[)(.*?)(?:\])\(.*\)/;

    const match = reLink.exec(content);
    if (match && match.length === 2) {
        // Found a link so just extract the content
        content = match[1];
    }

    // Now remove any additional formatting like bold, italic, inline
    content = stripWrapper(content, '\\*\\*');
    content = stripWrapper(content, '\\*');
    content = stripWrapper(content, '__');
    content = stripWrapper(content, '_');
    content = stripWrapper(content, '`');

    return content;
}

function stripWrapper(markdown, wrapper) {
    // If the content is wrappedin the marker then remove it
    // e.g. **my label**
    const reWrapper = new RegExp(`(${wrapper})(.+?)(${wrapper})`);

    const match = reWrapper.exec(markdown);
    if (match && match.length === 4) {
        markdown = match[2];
    }

    return markdown;
}

function removeTabControls(markdown) {
    const re = /^--------------------$[\S\s]*?^--------------------$/gm;
    return markdown.replace(re, '');
}

function removeProjectTopics(markdown) {
    const re = /#### (.*)\n(\[.*\]\((.*)\))?([\S\s]*?)---/gm;
    return markdown.replace(re, '');
}

async function assetHtmlImage(markdown, docPath, assets) {
    const re = /(<img src="(.*?)")/gm;

    let match;
    do {
        match = re.exec(markdown);
        if (match && match.length === 3) {
            if (isRemote(match[2])) {
                const response = await checkRemote(match[2]);
                if (!response) {
                    await reportEntry(`\t\t\tRemote Image: '${match[2]}'`);
                } else {
                    await reportError(`Remote image errors: '${match[2]}' in '${docPath}' with '${response}'`);
                }
            } else if (match[2].length > 0) {
                const imgFilename = path.resolve(path.join(path.dirname(docPath), match[2]));
                if (fs.existsSync(imgFilename)) {
                    await reportEntry(`\t\t\tLocal Image: '${match[2]}'`);
                    assets.push(`/${webifyPath(path.relative('.', imgFilename))}`);
                } else {
                    await reportError(`Image file does not exist '${match[2]}' in '${docPath}'`);
                }
            } else {
                await reportError(`Invalid Image reference: ${match[0]} in '${docPath}'`);
            }
        }
    } while (match);
}

async function assetMarkdownImage(markdown, docPath, assets) {
    const re = /(!\[(.*?)\]\((.*?)( ".*")?\))/gm;

    let match;
    do {
        match = re.exec(markdown);

        if (match && (match.length === 4 || match.length === 5)) {
            if (isRemote(match[3])) {
                const response = await checkRemote(match[3]);
                if (!response) {
                    await reportEntry(`\t\t\tRemote Image: '${match[3]}'`);
                } else {
                    await reportError(`Remote image errors: '${match[3]}' in '${docPath}' with '${response}'`);
                }
            } else if (match[3].length > 0) {
                const imgFilename = path.resolve(path.join(path.dirname(docPath), match[3]));
                if (fs.existsSync(imgFilename)) {
                    await reportEntry(`\t\t\tLocal Image: '${match[3]}'`);
                    assets.push(`/${webifyPath(path.relative('.', imgFilename))}`);
                } else {
                    await reportError(`Image file does not exist '${match[3]}' in '${docPath}'`);
                }
            } else {
                await reportError(`Invalid Image reference: ${match[0]} in '${docPath}'`);
            }
        }
    } while (match);

    return markdown;
}

async function markdownLinks(markdown, docPath) {
    const re = /(?:!)?\[(.*?)\]\((.*?)\)/gm;

    let match;
    do {
        match = re.exec(markdown);

        if (match && match.length === 3) {
            if (isRemote(match[2])) {
                const response = await checkRemote(match[2]);
                if (!response) {
                    await reportEntry(`\t\t\tRemote Page: '${match[2]}'`);
                } else {
                    await reportError(`Remote page errors: '${match[2]}' in '${docPath}' with '${response}'`);
                }
            } else if (isRoot(match[2])) {
                let rootUrl = stripAnchor(stripRoot(match[2]));
                const docFilename = path.resolve(path.join(rootFolder, rootUrl));
                if (!fs.existsSync(docFilename)) {
                    await reportError(`Root page does not exist '${match[2]}' in '${docPath}'`);
                }
            } else if (match[2].startsWith('#') || match[0].startsWith('!')) {
                // Anchor skip and images skip
            } else if (match[2].length > 0) {
                let localUrl = stripAnchor(match[2]);
                const docFilename = path.resolve(path.join(path.dirname(docPath), localUrl));
                if (!fs.existsSync(docFilename)) {
                    await reportError(`Local page does not exist '${match[2]}' in '${docPath}'`);
                }
            } else {
                await reportError(`Invalid html reference: ${match[0]} in '${docPath}'`);
            }
        }
    } while (match);

    return markdown;
}

async function htmlLinks(markdown, docPath) {
    const re = /<a\s+href="(.*?)"/gm;

    let match;
    do {
        match = re.exec(markdown);

        if (match && match.length === 2) {
            if (!match[1].startsWith('#')) {
                await reportError(`HTML Links should be converted to Markdown: '${match[1]}' in '${docPath}'`);
            }
        }
    } while (match);

    return markdown;
}

async function separators(markdown, docPath) {
    const re = /<hr/gmi;

    const match = re.exec(markdown);

    if (match && match.length === 1) {
        await reportError(`HTML Separators <hr> should be converted to Markdown ---: in '${docPath}'`);
    }

    return markdown;
}

function isRoot(link) {
    return link.startsWith('root://');
}

function isRemote(link) {
    return link.startsWith('http://') || link.startsWith('https://');
}

function rootToDocs(content, docsFolder) {
    return content.replace(/root:\/\//g, `/${docsFolder}/`);
}

function stripRoot(content) {
    return content.replace(/root:\/\//g, '');
}

function stripAnchor(content) {
    return content.replace(/#.*$/, '');
}

async function reportEntry(data) {
    await fsPromises.appendFile(reportFile, `${data}\n`);
}

async function reportError(data, err) {
    errorCount++;

    await fsPromises.appendFile(reportFile, `ERROR: ${data}\n`);

    if (consoleDetail) {
        console.error(`ERROR: ${data}`);
    }

    if (err) {
        await fsPromises.appendFile(reportFile, `ERROR: ${err.message}\n`);
    }
}

function webifyPath(p) {
    return p.replace(/\\/g, '/');
}

function listDirs(dir) {
    return fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
}

function sanitizeLink(item) {
    return item
        .replace(/^\.?\//, '')
        .replace(/\.md$/i, '');
}

async function checkRemote(url) {
    if (checkRemotePages) {
        try {
            await axios.head(url);
        } catch (err) {
            if (err.message.indexOf('404') >= 0) {
                return 'Not found';
            } else if (err.message.indexOf('409') < 0) {
                return err.message;
            }
        }
    }
}

async function run() {
    const projects = await buildProjects(rootFolder);

    if (projectsFile) {
        await fsPromises.writeFile(projectsFile, JSON.stringify(projects, undefined, '\t'));
    }

    if (errorCount > 0) {
        console.error(chalk.red(`\nERROR: There were ${errorCount} errors found during project build, see ${reportFile} for details.`));
    }
}

console.log(chalk.green.underline.bold('Build Projects'));

const docsFolder = process.argv[2] || 'docs';

run(docsFolder)
    .then(() => console.log(chalk.green(`\n${emoji.get('smile')}  Completed Successfully`)))
    .catch((err) => {
        console.error(chalk.red(`\n${emoji.get('frown')}  Building failed with the following error:`));
        console.error(chalk.red(err.message));
        process.exit(1);
    });
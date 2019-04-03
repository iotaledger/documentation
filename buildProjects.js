/* eslint-disable no-console */
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const axios = require('axios');
const emoji = require('node-emoji');
const emojiRegex = require('emoji-regex');
const emojiUnicode = require('emoji-unicode');
const chalk = require('chalk');

const { rootFolder, reportFile, projectsFile, checkRemotePages, checkSpelling, spellingFile, consoleDetail, exitWithError } = require('./buildProjects.config.json');

let remoteCheck = checkRemotePages;

let md;
let spellchecker;
let cheerio;

if (checkSpelling) {
    md = require('markdown-it');
    spellchecker = require('spellchecker');
    cheerio = require('cheerio');
}

let dictionary = {};

let errorCount = 0;
let warningCount = 0;

async function buildProjects(docsFolder, singleProject) {
    try {
        await fsPromises.unlink(reportFile);
    } catch (err) {
        // Do nothing
    }

    await reportEntry(`Built on: ${new Date().toISOString()}`);
    await reportEntry('');

    await reportEntry(`Reading Project Dir: '${docsFolder}'`);
    await reportEntry('');

    let projects = await readProjects(docsFolder);
    if (singleProject) {
        projects = projects.filter(p => p.folder === singleProject);
    }
    console.log(`Found ${projects.length} Projects.`);

    for (let i = 0; i < projects.length; i++) {
        const totalCount = errorCount + warningCount;
        if (consoleDetail) {
            console.log('');
            console.log(chalk.blue.underline(`${projects[i].name}`));
            console.log('');
        }

        await reportEntry('');
        await reportEntry(`\tProject: '${projects[i].name}'`);
        await reportEntry(`\tFolder: '${projects[i].folder}'`);

        await buildHome(docsFolder, projects[i]);
        await buildVersions(docsFolder, projects[i]);

        if (errorCount + warningCount === totalCount && consoleDetail) {
            console.log(chalk.green('OK'));
        }
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
        if (fileExistsWithCaseSync(homeFile)) {
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
        if (fileExistsWithCaseSync(docName)) {
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

            for (let i = 0; i < toc.length; i++) {
                await reportEntry(`\t\t\t\t${toc[i].level}: ${toc[i].name}`);
            }

            if (!doc.startsWith('# ')) {
                await reportError(`'${docName}' does not start with a level 1 heading`);
            }

            await assetHtmlImage(doc, docName, assets);
            await assetMarkdownImage(doc, docName, assets);

            await htmlLinks(doc, docName);
            await markdownLinks(doc, docName);
            await separators(doc, docName);
            await code(doc, docName);
            await bold(doc, docName);
            await italic(doc, docName);
            await img(doc, docName);
            await emojiChars(doc, docName);
            await spellCheck(projectFolder, doc, docName);
        } else {
            await reportError(`'${docIndexFile}' referenced '${docName}' but the file/folder does not exist or has wrong casing`);
        }
    } catch (err) {
        await reportError(`'${docIndexFile}' referenced '${docName}' but validating content failed see ${projectsFile} for more details`, err);
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
                if (fileExistsWithCaseSync(imgFilename)) {
                    await reportEntry(`\t\t\tLocal Image: '${match[2]}'`);
                    assets.push(`/${webifyPath(path.relative('.', imgFilename))}`);
                } else {
                    await reportError(`Image file does not exist or has wrong casing '${match[2]}' in '${docPath}'`);
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
                if (fileExistsWithCaseSync(imgFilename)) {
                    await reportEntry(`\t\t\tLocal Image: '${match[3]}'`);
                    assets.push(`/${webifyPath(path.relative('.', imgFilename))}`);
                } else {
                    await reportError(`Image file does not exist or has wrong casing '${match[3]}' in '${docPath}'`);
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
                if (match[2].indexOf('docs.iota.org') >= 0) {
                    await reportError(`You should not use absolute paths for docs content: '${match[2]}' in '${docPath}'`);
                } else {
                    const response = await checkRemote(match[2]);
                    if (!response) {
                        await reportEntry(`\t\t\tRemote Page: '${match[2]}'`);
                    } else {
                        await reportWarning(`Remote page errors: '${match[2]}' in '${docPath}' with '${response}'`);
                    }
                }
            } else if (isRoot(match[2])) {
                let rootUrl = stripAnchor(stripRoot(match[2]));
                const docFilename = path.resolve(path.join(rootFolder, rootUrl));
                if (!fileExistsWithCaseSync(docFilename)) {
                    await reportError(`Root page does not exist or has wrong casing '${match[2]}' in '${docPath}'`);
                }
            } else if (isMail(match[2])) {
                // Skip mail links
            } else if (match[2].startsWith('#') || match[0].startsWith('!')) {
                // Anchor skip and images skip
            } else if (match[2].length > 0) {
                let localUrl = stripAnchor(match[2]);
                const docFilename = path.resolve(path.join(path.dirname(docPath), localUrl));
                if (!fileExistsWithCaseSync(docFilename)) {
                    await reportError(`Local page does not exist or has wrong casing '${match[2]}' in '${docPath}'`);
                }
            } else {
                await reportError(`Invalid html reference: ${match[0]} in '${docPath}'`);
            }
        }
    } while (match);

    return markdown;
}

async function htmlLinks(markdown, docPath) {
    const re = /<a\s+href="(.*?)">(.*?)<\/a>/gm;

    let match;
    do {
        match = re.exec(markdown);

        if (match && match.length === 3) {
            if (!match[1].startsWith('#')) {
                await reportError(`HTML Link <a href="${match[1]}">${match[2]}</a> should be converted to Markdown: [${match[2]}](${match[1]}) in '${docPath}'`);
            }
        }
    } while (match);

    return markdown;
}

async function separators(markdown, docPath) {
    if (/<hr/gmi.test(markdown)) {
        await reportWarning(`HTML Separators <hr> should be converted to Markdown ---: in '${docPath}'`);
    }
}

function isValidWord(projectFolder, word) {
    let isValid = false;

    const noPunc = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');

    if (noPunc.length === 0) {
        isValid = true;
    } else {
        if (dictionary.global) {
            for (let d = 0; d < dictionary.global.length && !isValid; d++) {
                isValid = dictionary.global[d].test(noPunc);
            }
        }

        if (!isValid && dictionary[projectFolder]) {
            for (let d = 0; d < dictionary[projectFolder].length && !isValid; d++) {
                isValid = dictionary[projectFolder][d].test(noPunc);
            }
        }
    }

    return isValid;
}

async function spellCheck(projectFolder, markdown, docPath) {
    if (checkSpelling) {
        let noCode = markdown.replace(/```[\s\S]*?```/g, '');
        let noObjects = noCode.replace(/¬¬¬[\s\S]*?¬¬¬/g, '');
        let noHtml = noObjects.replace(/<(?:.*?)>(.*?)<\/(?:.*?)>/g, ' $1 ');

        const html = md({ html: true }).render(noHtml);
        const dom = cheerio.load(html);
        const plainText = dom.root().text().replace(/(:.*?:)/g, '');

        const results = await spellchecker.checkSpellingAsync(plainText);

        const misspelled = [];
        for (let i = 0; i < results.length; i++) {
            const word = plainText.substring(results[i].start, results[i].end);

            if (!isValidWord(projectFolder, word) && spellchecker.isMisspelled(word)) {
                misspelled.push(word);
            }
        }

        if (misspelled.length > 0) {
            await reportWarning(`'${misspelled.join('\', \'')}' possible spelling mistake(s) in '${docPath}'`);

            let output = `\n## [${docPath}](${docPath})\n\n`;

            for (let i = 0; i < misspelled.length; i++) {
                output += misspelled[i];
                const alts = spellchecker.getCorrectionsForMisspelling(misspelled[i]);
                if (alts && alts.length > 0) {
                    output += `${' '.repeat(30 - misspelled[i].length)} => ${alts.join(', ')}`;
                }
                output += '\n';
            }

            fs.appendFileSync(spellingFile, output);
        }
    }
}

async function code(markdown, docPath) {
    const re = /<code>(.*?)<\/code>/gm;

    let match;
    do {
        match = re.exec(markdown);

        if (match && match.length === 2) {
            await reportWarning(`HTML <code>${match[1]}</code> element should be converted to Markdown: \`${match[1]}\` in '${docPath}'`);
        }
    } while (match);

    return markdown;
}

async function bold(markdown, docPath) {
    const re = /<b>(.*?)<\/b>/gm;

    let match;
    do {
        match = re.exec(markdown);

        if (match && match.length === 2) {
            await reportWarning(`HTML <b>${match[1]}</b> element should be converted to Markdown: **${match[1]}** in '${docPath}'`);
        }
    } while (match);

    return markdown;
}

async function italic(markdown, docPath) {
    const re = /<i>(.*?)<\/i>/gm;

    let match;
    do {
        match = re.exec(markdown);

        if (match && match.length === 2) {
            await reportWarning(`HTML <i>${match[1]}</i> element should be converted to Markdown: *${match[1]}* in '${docPath}'`);
        }
    } while (match);

    return markdown;
}

async function img(markdown, docPath) {
    const re = /<img\ssrc="(.*)"(?:\salt="(.*?)")/gm;

    let match;
    do {
        match = re.exec(markdown);

        if (match && match.length === 3) {
            await reportWarning(`HTML <img src="${match[1]}" alt="${match[2]}"> should be converted to Markdown: ![${match[2]}](${match[1]}) in '${docPath}'`);
        }
    } while (match);

    return markdown;
}

async function emojiChars(markdown, docPath) {
    const re = emojiRegex();

    let match;
    do {
        match = re.exec(markdown);

        if (match) {
            await reportWarning(`Emoji ${match[0]}  ${emojiUnicode(match[0])} should be converted to Markdown ${emoji.unemojify(match[0])} in '${docPath}'`);
        }
    } while (match);

    return markdown;
}

function isRoot(link) {
    return link.startsWith('root://');
}

function isRemote(link) {
    return link.startsWith('http://') || link.startsWith('https://');
}

function isMail(link) {
    return link.startsWith('mailto:');
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
        console.error(chalk.red(`ERROR: ${data}`));
    }

    if (err) {
        await fsPromises.appendFile(reportFile, `ERROR: ${err.message}\n`);

        if (consoleDetail) {
            console.error(chalk.red(err.message));
        }
    }
}

async function reportWarning(data, err) {
    warningCount++;

    await fsPromises.appendFile(reportFile, `WARN: ${data}\n`);

    if (consoleDetail) {
        console.warn(chalk.cyan(`WARN: ${data}`));
    }

    if (err) {
        await fsPromises.appendFile(reportFile, `WARN: ${err.message}\n`);

        if (consoleDetail) {
            console.error(chalk.cyan(err.message));
        }
    }
}

function webifyPath(p) {
    return p.replace(/\\/g, '/');
}

function listDirs(dir) {
    return fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
}

function fileExistsWithCaseSync(file) {
    const dir = path.dirname(file);

    if (dir === '/' || dir === '.' || dir.indexOf(':') >= 0) {
        return true;
    }

    const filenames = fs.readdirSync(dir);
    if (filenames.indexOf(path.basename(file)) === -1) {
        return false;
    }
    return fileExistsWithCaseSync(dir);
}

function sanitizeLink(item) {
    return item
        .replace(/^\.?\//, '')
        .replace(/\.md$/i, '');
}

async function checkRemote(url) {
    if (remoteCheck) {
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

function loadDictionary() {
    const dictionaryFile = 'dictionary.json';

    if (fileExistsWithCaseSync(dictionaryFile)) {
        try {
            const dic = JSON.parse(fs.readFileSync(dictionaryFile));

            const keys = Object.keys(dic);

            for (let k = 0; k < keys.length; k++) {
                const key = keys[k];
                dictionary[key] = [];
                for (let i = 0; i < dic[key].length; i++) {
                    dictionary[key].push(new RegExp(dic[key][i], 'i'));
                }
            }
        } catch (err) {
            console.error(chalk.red('ERROR: Failed loading dictionary.'));
            console.error(chalk.red(err.message));
        }
    }
}

async function run(singleProject) {
    if (checkSpelling && spellingFile) {
        if (fs.existsSync(spellingFile)) {
            fs.unlinkSync(spellingFile);
        }
        fs.appendFileSync(spellingFile, '# Spelling Summary\n');
        loadDictionary();
    }
    const projects = await buildProjects(rootFolder, singleProject);

    if (projectsFile) {
        await fsPromises.writeFile(projectsFile, JSON.stringify(projects, undefined, '\t'));
    }

    if (errorCount > 0 || warningCount > 0) {
        console.log();
        console.log();
        console.log(chalk.blue.underline('Summary'));
        console.log();
    }

    if (errorCount > 0) {
        console.error(chalk.red(`ERROR: There were ${errorCount} errors during project build, see ${reportFile} for details.`));
    }
    if (warningCount > 0) {
        console.error(chalk.cyan(`WARNING: There were ${warningCount} warnings during project build, see ${reportFile} for details.`));
    }
    if (errorCount > 0 && exitWithError) {
        process.exit(1);
    }
}

console.log(chalk.green.underline.bold('Build Projects'));

let singleProject = '';
for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === '--no-remote') {
        remoteCheck = false;
    } else {
        singleProject = process.argv[i];
    }
}

run(singleProject)
    .then(() => console.log(chalk.green(`\n${emoji.get('smile')}  Completed Successfully`)))
    .catch((err) => {
        console.error(chalk.red(`\n${emoji.get('frown')}  Building failed with the following error:`));
        console.error(chalk.red(err.message));
        process.exit(1);
    });
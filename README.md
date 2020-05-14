<h2 align="center">Developer Documentation for IOTA technology</h2>

<p align="center">
    <a href="https://docs.iota.org/docs/wallets/0.1/hub/introduction/overview" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/Documentation%20portal-blue.svg?style=for-the-badge" alt="Developer documentation portal">
</p>
<p align="center">
  <a href="https://discord.iota.org/" style="text-decoration:none;"><img src="https://img.shields.io/badge/Discord-9cf.svg?logo=discord" alt="Discord"></a>
    <a href="https://iota.stackexchange.com/" style="text-decoration:none;"><img src="https://img.shields.io/badge/StackExchange-9cf.svg?logo=stackexchange" alt="StackExchange"></a>
    <a href="https://raw.githubusercontent.com/iotaledger/documentation/develop/LICENSE" style="text-decoration:none;"><img src="https://img.shields.io/github/license/iotaledger/documentation.svg" alt="Creative Commons 4.0 license"></a>
    <a href="https://buildkite.com/iota-foundation/documentation-platform-build-and-deploy" style="text-decoration:none;"><img src="https://badge.buildkite.com/f736fdb29f0102a9e640363d347bd7332ec2002aeb69916556.svg" alt="Build status"></a>
</p>
      
<p align="center">
  <a href="#about">About</a> ◈
  <a href="#prerequisites">Structure</a> ◈
  <a href="#supporting-the-project">Supporting the project</a> ◈
  <a href="#joining-the-discussion">Joining the discussion</a> 
</p>

---

## About

This repository contains all the documentation that's hosted on [docs.iota.org](https://docs.iota.org).

The documentation is written in markdown files and built by the platform in the [documentation platform repository](https://github.com/iotaledger/documentation-platform).

## Structure

The content is structured in a way that allows us to render it on a webpage.

### Top level navigation

The `projects.md` file contains the top level navigation labels and links for the following:

- Home page floating menu
- Footer
- Burger menu navigation

The order of the items in the file determines the order in the navigation.

**Note:** An item will appear in the navigation only if the corresponding sub-directory for that project also contains a `home.md` file. The links must be relative to the location of the `projects.md` file.

The content of the file is a list of markdown links.

### Home page

The `home.md` file of a project contains the content to display on the home page. The file contains a level 1 heading, which determines the description for that section. In addition there are links followed by level 2 header which contain the direct links into the content.

The links must be relative to the location of the `home.md` file.

### Version directories

Under each project directory is another directory that's named after the version number for the content. If more than one version directory exists, a version selector will be displayed. This version selector allows the reader to choose which version of the content they want to see.

Each version directory contains all of the content required for that project version as well as a `doc-index.md` file, which contains the items that you want to appear in the left navigation panel.

The links must be relative to the `doc-index.md` file.

If you want to link to another project, use the following structure `root://another-project/0.1/some-content.md`.

## Supporting the project

If you'd like to help us write new content, or to edit existing content, please refer to the [contribution guidelines](.github/CONTRIBUTING.md).

## Joining the discussion

If you want to get involved in the community or just want to discuss IOTA, Distributed Registry Technology (DRT) and IoT with other people, feel free to join our [Discord](https://discord.iota.org/).

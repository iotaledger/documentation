# Documentation Markdown

Documentation can be viewed on our web site at [docs.iota.org](https://docs.iota.org)

This repository contains the content which is utilised by the documentation platform in the [documentation platform repository](https://github.com/iotaledger/documentation-platform).

## Contribute

If you'd like to help us build missing content, please see open issues and filter by the [Help Wanted](https://github.com/iotaledger/documentation/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) label. We'll be adding more of these issues in the coming weeks as we identify more content to be added. Before writing new content, please refer to the [CONTRIBUTING](./docs/CONTRIBUTING.md) guide.

## Structure

More information about the structure of the files and folders in this repository can be found in the [STRUCTURE](./docs/STRUCTURE.md) document.

## Markdown

The documentation content is created using Markdown, we also have some additional features which are documented here [MARKDOWN](./docs/MARKDOWN.md).

## Validating Content

If you make changes to this repository you should run the validation script before commiting any content.

To validate the content of the repo first make sure you have installed the dependencies with `npm install`, then run the following script:

```shell
node buildProjects
```

This will output any errors to the console and create `projects-summary.log`, which shows the structure of the content and also highlights the errors.

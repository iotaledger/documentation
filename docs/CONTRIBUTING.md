# Contribute to IOTA Documentation

We encourage everyone with knowledge of IOTA to contribute to our documentation. To discuss the documentation, join our #Documentation channel on [Discord](https://discordapp.com/invite/fNGZXvh).

1. See our [open issues](https://github.com/iotaledger/documentation/issues)
2. Filter the issues by the `Help Wanted` label
3. Pick something that you'd like to work on
4. Comment on the issue that you'd like to work on
5. [Set up GitHub](#set-up-github)
6. Start writing your content using our [writing guide](#writing-guide)
7. [Push your content to our GitHub repository](#push-content-to-our-github-repository)

Thanks! :heart:

## Writing guide

If you are creating or editing an article, please follow our writing guide to help us do the following:

* Create and maintain a consistent tone of voice 
* Offer documentation in a standard format
* Make our documentation straightforward to read for non-native English readers
* Make sure that our documentation educates our readers

If you have a question about writing that we don't cover in this guide, use the [Google style guide](https://developers.google.com/style/).

### File format

We use markdown for documentation files. Please refer to these [tips](https://help.github.com/articles/basic-writing-and-formatting-syntax/) if you haven't used markdown before.

### Writing tools

We recommend using a code editor that supports markdown files, for example [Visual Studio Code](https://code.visualstudio.com/) with the [markdown Lint extension](https://github.com/DavidAnson/vscode-markdownlint).

### General rules

These general rules make information easier to understand and translate.

| Rule | Example |
| :----| :-------|
| Never use a long word where a short one will do| '~~Utilize~~ **Use** short words'|
|If it's possible to remove a word, always remove it | 'This method is ~~exactly~~ the same as the previous one'
| Always use the active voice where possible | '~~The active voice must always be used where possible~~.' 'You must always use the active voice where possible'
| Never use a foreign phrase, a scientific word or a jargon word if you can think of an everyday English equivalent | ~~E.g~~ For example |
| Place the one-word modifiers 'only' and 'not' immediately in front of whatever they're modifying| 'For security reasons, IOTA addresses should ~~only~~ be withdrawn from **only** once'|
|Don't use (s) to form plural nouns| 'Select the ~~item(s)~~ **items** that you want to remove'|

Research shows that the above holds true even for very technical audience. See the [GOV.UK style guide](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) for examples.

### UK English or US English?

We always write in US English.

### Punctuation

* Never use semicolons
* Always use a capital letter after colons
* Always use an oxford comma (comma before and in a list, for example 'The mainnet, testnet, and devnet networks')
* Don't use periods at the end of single sentence lists. Use periods only when list items consists of more than one sentence

### Article titles

| Rule | Example |
| :----| :-------|
|Use sentence case for titles. Do not use title case.|'The distributed ledger', not 'The Distributed Ledger'|
|Article titles in the 'Concepts' sections should always be nouns|'Tip selection' not 'What is tip selection?' or 'Understanding tip selection'|
|Article titles in the 'How-to guides' section should always start with an infinitive| 'Run the IRI' not 'Running the IRI'|
|Article titles in the 'References' section should always be plural nouns| 'IRI configuration options' not 'IRI configuration' or 'Configuring the IRI'|

### First paragraph

Always embolded the first paragraph of an article. This paragraph should explain the main purpose or point of the article in as few words as possible.

Make sure you answer the following questions:
* What is the article about?
* Why do users care about or need the information in the article?

### How-to guides

A how-to guide is an article that helps users achieve a task.

When you write how-to guides, follow these general guidelines:

* [Write one task per article](#write-one-task-per-article)
* [Create subtasks to organize long how-to guides](#create-subtasks-to-organize-long-how-to-guides)

Each how-to guide should explain not only **how** to perform the scenario, but also **why** a user would want to perform the scenario. What does it achieve? Why is it needed?

A brief introduction in the form of a **what** is the scenario about. A **when** section to put the scenario in context with other scenarios. For example, a scenario on **Running IRI** should mention that you need to **Download and install IRI** first.

The general flow of a how-to guide would be:

1. A short description (overview of the task, benefits and importance of the task, brief conceptual information, and links to longer conceptual information, if necessary)
3. Prerequisites (things that the user must have or do before they can complete the task)
4. Steps (how to do the task)
5. Summary of what the user has accomplished

#### Write one task per article

When a how-to guide contains one task, it's easier to manage, organize, and reuse to help users find specific tasks when they need them.

For example, don't combine the tasks for installing and uninstalling software in a single article. Users typically won't need these tasks at the same time.

#### Create subtasks to organize long how-to guides

Tasks that are more than 10 steps can be difficult to follow, especially if they're complicated and include substeps.

If you start writing a task that contains more than 10 steps, separate them into subtasks by using headings.

### Concept articles

Concept articles can be written to do any of the following:

* Describe a system, product, or solution
* Introduce tools and technology
* Explain features, components, characteristics, restrictions, and capabilities
* Define terms in more details than you would find in a glossary
* Describe benefits or help users to make choices between options

You should write concept articles to support tasks and user goals.

Concept articles must not include task information or reference information.

### Code formatting

When adding code examples and snippets into an article, make sure you format it accordingly and add language identifiers for correct code highlighting. See [Creating and highlighting code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/) for more information.

#### Bash

Bash code blocks shall not contain the path.
Instead of
```bash
user@hostname:~/tmp$ mkdir whatever
```
Use a standalone statement
```bash
mkdir whatever
```

## Set up GitHub

Our documentation is hosted on GitHub, which is a version control tool. To send us your content, you must use Git or GitHub.

If you already have a GitHub account and Git is set up on your computer, go straight to [Create a new branch](#create-a-new-branch).

1. [Create a new GitHub account](https://github.com/) if you don't already have one
2. [Set up Git](https://help.github.com/articles/set-up-git/)
3. Go to our [documentation repository](https://github.com/iotaledger/documentation.git) and click **Fork** at the top of the page
4. Copy your fork to your local machine by doing the following in the command prompt:
    ```cmd
    git clone https://github.com/{your username}/documentation
    ```
5. Create a reference to the root repository by doing the following:

    ```cmd
    cd documentation
    git remote add upstream https://github.com/iotaledger/documentation.git
    git fetch upstream
    ```
Now, your documentation directory will contain all the documentation files.

### Create a new branch

Branches help make contributing seamless. Make sure each branch only addresses one article to make adding the changes to the documentation repository as easy as possible. The following types of contribution are appropriate for a new branch:

- A new article ( a single markdown file)
- Grammar edits and spelling corrections on an existing article

1. Open GitBash

2. Do the following:
    ```
    git pull upstream develop:<your branch name>
    git push origin <your branch name>
    ```
3. To start working on your local copy of the branch, do the following:
    ```
    git checkout <your branch name>
    ```

Please follow our [writing guide](#writing-guide) when you write and edit articles.

## Push content to our GitHub repository

1. After writing or editing content in your local copy of the branch, do the following in the command prompt:
    ```cmd
    git add .
    ```
    
  **Note:**  you may be asked to set your account's default identity
  
    ```
    Please tell me who you are
    Run 
    git config --global user.email "you@example.com"
    git config --global user.name "Your Name"
    ```
    
2. Commit your changes by doing the following:

    ```
    git commit -v -a -m "<Describe the changes you made>"
    ```
    
  **Note:** Make any additional changes to the same files in subsequent commits as you work. Not all changes need to be in the same commit.

3. Push your changes by doing the following:

    ```
    git push origin <your branch name>
    ```
    
4. In GitHub, go to the repository that you forked from `iotaledger/documentation`, and click **Pull Request** at the top of the page

5. Make sure that the base branch is `iotaledger/documentation@develop` and the head branch is `<your username>/documentation@<your branch name>`

6. Click **Update Commit Range** or **Compare & pull request**

7. Give your pull request a title, and describe all the changes you're making

8. Click **Submit**

Thank you! We will now process your pull request. If there are any edits to make, we will ask you in the comments of the pull request you created. 

You can continue working and commit/push new changes like you did before. Any updates will appear in the pending pull request.

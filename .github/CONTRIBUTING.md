# Contribute to the developer documentation

This document describes how to contribute to the IOTA developer documentation.

We encourage everyone with knowledge of IOTA technology to contribute.

Thanks! :heart:

<details>
<summary>Do you have a question :question:</summary>
<br>

If you have a general or technical question, you can use one of the following resources instead of submitting an issue:

- [**Discord:**](https://discord.iota.org/) For communicating with the developers and community members
- [**IOTA cafe:**](https://iota.cafe/) For discussing technical questions with the Research Department at the IOTA Foundation
- [**StackExchange:**](https://iota.stackexchange.com/) For asking technical questions
</details>

<br>

<details>
<summary>Ways to contribute :mag:</summary>
<br>

To contribute, you can:

- Report a mistake
- Suggest new content
- Write new content
- Suggest a new documentation feature
</details>

<br>

<details>
<summary>Report a mistake :bug:</summary>
<br>

This section guides you through reporting a typo or any type of mistake in the content. Following these guidelines helps maintainers and the community verify and and fix mistakes.

### Before reporting a mistake

Please check the following list:

- **Ensure the mistake has not already been reported** by searching on GitHub under [**Issues**](https://github.com/iotaledger/documentation/issues). If the mistake has already been reported **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

**Note:** If you find a **Closed** issue that seems similar to what you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

### Reporting a mistake

To report a mistake, [open a new issue](https://github.com/iotaledger/documentation/issues/new), and be sure to include as many details as possible, using the template.

If you also want to fix the mistake, submit a [pull request](#pull-requests) and reference the issue.
</details>
<br>

<details>
<summary>Suggest new content :bulb:</summary>
<br>

This section guides you through suggesting new content. Following these guidelines helps maintainers and the community collaborate to find the best possible way forward with your suggestion.

### Before suggesting new content

**Ensure the suggestion has not already been suggested** by searching on GitHub under [**Issues**](https://github.com/iotaledger/documentation/issues).

### Suggesting new content

To suggest new content, talk to the IOTA community and IOTA Foundation members in the #documentation-discussion channel on [Discord](https://discord.iota.org/).

If your suggestion is approved, the team will create an issue to include it.
</details>

<br>

<details>
<summary>Write new content :pencil2:</summary>
<br>

This section guides you through writing content for the documentation portal. Following these guidelines helps give your content the best chance of being approved and merged.

### Before writing

Make sure to discuss your idea in the #documentation-discussion channel on [Discord](https://discord.iota.org/).

Otherwise, your content may not be approved at all.

### Writing new content

To build a new feature, check out a new branch based on the `develop` branch, and be sure to consider the following:

- Choose an appropriate location for your content
- Follow the [documentation style guide](STYLEGUIDE.md)

</details>

<br>

<details>
<summary>Suggest a new documentation feature :art:</summary>
<br>

To suggest new features for the documentation portal:

1. Go to the [`iotaledger/documentation-platform`](https://github.com/iotaledger/documentation-platform/issues) repository
2. If no existing issues address your suggestion, create a new issue and describe your feature idea
</details>

<br>

<details>
<summary>Get started with your first contribution :checkered_flag:</summary>
<br>

Our documentation is hosted on GitHub, which is a version control tool. To create new content, or suggest changes to existing content, you must use either Git or GitHub.

If you already have a GitHub account and Git is set up on your device, go straight to [Create a new branch](#create-a-new-branch).

1. [Create a new GitHub account](https://github.com/) if you don't already have one

2. [Set up Git](https://help.github.com/articles/set-up-git/)

3. Go to our [documentation repository](https://github.com/iotaledger/documentation.git) and click **Fork** at the top of the page

4. Copy your fork to your local machine by doing the following in a command-line interface. Replace the `$USERNAME` placeholder with your GitHub username

    ```bash
    git clone https://github.com/$USERNAME/documentation
    ```

5. Create a reference to our repository from your fork

    ```bash
    cd documentation
    git remote add upstream https://github.com/iotaledger/documentation.git
    git fetch upstream
    ```

Now, your `documentation` directory will contain all the documentation files.

To find an existing article, you can use the URL of the documentation portal as a reference. The path to the article comes after `docs`.

For example, to find the article about minimum weight magnitude, which has the following URL, you would look in the `getting-started/0.1/network` directory, and find the article called `minimum-weight-magnitude.md`:

```
https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude
```

### Create a new branch

Branches help us to review content by separating your contributions into categories.

The following types of contribution are appropriate for a new branch:

- A new article (a single markdown file)
- Grammar edits and spelling corrections, and any other suggestions for an existing article

1. Open a command-line interface

2. Do the following. Replace the `$BRANCH` placeholder with your own branch name

    ```bash
    git pull upstream develop:$BRANCH
    git push origin $BRANCH
    ```

3. To start working on your local copy of the branch, do the following:

    ```bash
    git checkout $BRANCH
    ```

Please follow our [style guide](STYLEGUIDE.md) when you write and edit articles.

### Validate your content

To make sure that you haven't introduced spelling errors or broken links, the next step is to validate your content.

1. [Install Node.js](https://nodejs.org/en/download/)

2. In the `documentation` directory, install the dependencies

    ```bash
    npm install
    ```

3. Run the `buildProjects` script

    ```bash
    node buildProjects
    ```

This script will do the following:

- Print errors to the console
- Create a `projects-summary.log` file, which shows the structure of the content and also highlights the errors
- Create a spelling-summary.md file, which contains any possible spelling mistakes and suggestions

To enhance the [Hunspell](https://en.wikipedia.org/wiki/Hunspell) spell checker, you can add words to the dictionary.json file, which supports regular expressions. For example:

```json
{
    "global": [
        "(P|p)ermission(less|ed)"
    ]
}
```

If you made changes to a single directory, you can validate it alone by adding its name to the end of the `node buildProjects` command. For example, to validate only the content in the `getting-started` directory, you'd do the following:

```shell
node buildProjects getting-started
```

### Push your content to our GitHub repository

After writing or editing content and validating it, the next step is to push it to our repository.

1. Add your changes

    ```bash
    git add .
    ```
    
    :::info:
    You may be asked to set your account's default identity.
    :::
  
    ```bash
    Please tell me who you are
    Run 
    git config --global user.email "you@example.com"
    git config --global user.name "Your Name"
    ```
    
2. Commit your changes

    ```bash
    git commit -m "<Describe the changes you made>"
    ```

    :::info:
    Make any additional changes to the same files in subsequent commits as you work. Not all changes need to be in the same commit.
    :::

3. Push your changes

    ```bash
    git push origin <your branch name>
    ```
    
4. In GitHub, go to the repository that you forked from `iotaledger/documentation`, and click **Pull Request** at the top of the page

5. Make sure that the base branch is `iotaledger/documentation@develop` and the head branch is `$USERNAME/documentation@$BRANCHNAME`

6. Click **Update Commit Range** or **Compare & pull request**

7. Give your pull request a title, and describe all the changes you're making

8. Click **Submit**

Thank you :tada: We will now process your pull request. If there are any edits to make, we will ask you in the comments of the pull request you created. 

You can continue pushing new changes like you did before. Any updates will appear in the pending pull request.
</details>

<br>

<details>
<summary>Pull requests :mega:</summary>
<br>

This section guides you through submitting a pull request (PR). Following these guidelines helps give your PR the best chance of being approved and merged.

### Before submitting a pull request

When creating a pull request, please follow these steps to have your contribution considered by the maintainers:

- A pull request should have exactly one concern (for example one feature or one bug). If a PR address more than one concern, it should be split into two or more PRs.

- A pull request can be merged only if it references an open issue

    **Note:** Minor changes such as fixing a typo can but do not need an open issue.

- All code should be well tested

### Submitting a pull request

The following is a typical workflow for submitting a new pull request:

1. Fork this repository
2. Create a new branch based on your fork
3. Commit changes and push them to your fork
4. Create a pull request against the `develop` branch

If all [status checks](https://help.github.com/articles/about-status-checks/) pass, and the maintainer approves the PR, it will be merged.

**Note:** Reviewers may ask you to complete additional work, tests, or other changes before your pull request can be approved and merged.
</details>

<br>

<details>
<summary>Code of Conduct :clipboard:</summary>
<br>

This project and everyone participating in it is governed by the [IOTA Code of Conduct](https://www.iota.org/contact-us/community-support).

# Style Guide

**This document is a reference for anyone who is writing content for the documentation portal. Do note that this style guide is a "living document" meant to be continuously updated.**

If you are creating or editing an article, please follow our style guide to help us do the following:

- Create and maintain a consistent tone of voice 
- Offer documentation in a standard format
- Make our documentation straightforward to read for non-native English readers
- Make sure that our documentation educates our readers

If you have a question about writing that we don't cover in this tutorial, use the [Google style guide](https://developers.google.com/style/).



## Quick Reference Guide

### Tone and Content

- [Be conversational and friendly](https://developers.google.com/style/tone) without being frivolous.
- [Don't pre-announce anything](https://developers.google.com/style/future) in documentation.
- [Use descriptive link text](https://developers.google.com/style/link-text).
- [Write for a global audience](https://developers.google.com/style/translation).

### Language and Grammar

- [Use second person](https://developers.google.com/style/person): but use "you" and "we" where applicable
- [Use active voice](https://developers.google.com/style/voice): make clear who's performing the action and actions over utility verbs (open the door, not use the door, debug console displays errors, not contains errors).
- [Use standard American spelling](https://developers.google.com/style/spelling) and punctuation.
- [Put conditional clauses before instructions](https://developers.google.com/style/clause-order), not after.
- [For usage and spelling of specific words, see the word list](https://developers.google.com/style/wordlist); additionally, only use words you *know*

### Formatting, Punctuation, and Organisation

- For headings from the first to the third level, capitalize the words; headings below this level should use sentence case
- [Use numbered lists](https://developers.google.com/style/lists) for sequences.
- [Use bulleted lists](https://developers.google.com/style/lists) for most other lists.
- [Use description lists](https://developers.google.com/style/lists) for pairs of related pieces of data.
- [Use serial commas](https://developers.google.com/style/commas-serial).
- [Put code-related text in code font](https://developers.google.com/style/code-in-text).
- Put UI in weak emphasis
- Use the DD/MM/YY formatting



## Comprehensive Guide

### General Do's and Dont's 

Don't use *&* instead of *and* in headings, text, navigation, or tables of contents. However, it's OK to use *&* when referencing UI elements that use *&*, or in table headings and diagram labels where space constraints require abbreviation. Of course, it's fine to use & for technical purposes in code.

### Reading Ease

- Break up walls of text to aid in scannability. For example, separate paragraphs, create headings, and use lists.
- Define acronyms and abbreviations on first usage and if they're used infrequently.
- Use parallel writing structures for similar things. For example, start each list in the same format.
- Place distinguishing and important information of a paragraph in the first sentence to aid in scannability.
- Use clear and direct language. Avoid the use of double negatives and exceptions for exceptions.
  **Recommended:** You can continue without a path.
  **Not recommended:** A missing path won't prevent you from continuing.

### Headings and Titles

Use descriptive headings and titles because they help a user navigate their browser and the page. It's easier to jump between pages and sections of a page if the headings and titles are unique.

- Use [meaningful link text](https://developers.google.com/style/link-text). Links should make sense when read out of context.
- Don't use *click here* or *read this document*, use “For further reference” or “For further reading” or something along those lines
- If a link downloads a file, the link text needs to indicate this action as well as the file type.

### Images

- For every image, provide [alt text](https://developers.google.com/style/images#alt-text) that adequately summarizes the intent of each image.
- Don't present new information in images; always provide an equivalent text explanation with the image.
- Don't repeat images unless absolutely necessary.
- Don't use images of text, code samples, or terminal output. Use actual text.
- Use SVG instead of PNG if available. SVGs stay sharp when you zoom in on the image.

### Videos, recordings, and GIFs

- Ensure that captions can be translated into major languages.
- Don't use flickering or flashing elements. They can cause anything from motion sickness to a seizure.

### Tables

- Introduce tables in the text preceding the table.
- Use table headings for the first column and the first row only. Use the [th element](https://www.w3.org/TR/html4/struct/tables.html#edef-TH).
- Avoid when possible tables in the middle of a numbered procedure.
- Don't merge cells. Don't use colspan or rowspan attributes.
- Don't use tables unless it's the best method to present your information. 

### Document Rendering

Don't use color, size, location, or other visual cues as the primary way of communicating information.

- If you're using color, icon, or outline thickness to convey state, then also provide a secondary cue, such as a change in the text label.
- Refer to buttons and other elements by their label (or [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute), if they're visual elements)—for example:
  **Recommended:** Click **Save**.
  **Not recommended:** Click the round button.
- Don't use directional language to orient the reader, such as *above*, *below*, or *right-hand side*. This type of language doesn't work well for accessibility or for localization reasons. If a [UI element](https://developers.google.com/style/ui-elements) is hard to find, [provide a screenshot](https://developers.google.com/style/images).
  **Recommended:** Click menu **Menu**.
  **Not recommended:** In the left-side panel, click the button with three lines.

### Test-formatting Summary

#### Bold

Use bold formatting, <b> or **, for [UI elements](https://developers.google.com/style/ui-elements#formatting) and at the beginning of [notices](https://developers.google.com/style/notices).

Although a double underscore, __, can also indicate bold styling in Markdown, it can be difficult to distinguish in a text editor. 

#### Italic

Use italics formatting, <i> or an underscore, when drawing attention to a specific word or phrase, such as when [defining terms](https://developers.google.com/style/formatting-key-terms) or [using words as words](https://developers.google.com/style/formatting-words-as-words).

Italicize titles of books, movies, web series, and other full-length works, unless they're part of a link. For example, when you refer to the parameters of a method like doSomething(Uri data, int count), italicize *data* and *count*.

Italicize mathematical variables and version variables. For example, *x* + *y* = 3, version 1.4.*x*.

To indicate emphasis in HTML, use the <em> element, which renders as italics in most contexts. To indicate emphasis in Markdown, use underscores (_) or single asterisks (*); you can't do semantic tagging in Markdown.

#### Underline

Do note underline.

#### Code font

Use <code> in HTML or ` in Markdown to apply a monospace font and other styling to [code in text](https://developers.google.com/style/code-in-text), inline code, and user input.

Use code blocks, <pre> or ```, for [code samples](https://developers.google.com/style/code-samples) or other blocks of code.

Do not override or modify font styles inline.

Use code font to mark up code, such as class names, method names, HTTP status codes, console output, and placeholder variables.

#### Sentence Case and Capitalization

Use American English style for [general capitalization](https://developers.google.com/style/capitalization). For headings 1-3, capitalize the applicable words; for headings under those levels, use sentence case.

#### Quotation Marks

In general, use American English style when [punctuating quotations](https://developers.google.com/style/quotation-marks).

For titles of shorter works—such as articles or episodes in a web series—put titles in quotation marks, unless they're part of a link.

#### Font type, Size, and Color

Times New Roman, 12 pt, black.

#### Other Punctuation Conventions

Don't use [ampersands (&)](https://developers.google.com/style/word-list#ampersand) as conjunctions or shorthand for *and*. Use *and* instead. That includes headings and navigation. **Exception:** It's okay to use *&* in cases where you need to refer to a UI element or the name of a menu that uses *&*.

Put quotation marks and end punctuation [outside of link text](https://developers.google.com/style/link-text#punctuation-with-links).

## Writing for a Globabl Audience

**Key Point:** Write in US English, but write with translation and a global audience in mind.

### General Dos and Dont's

- Use [present tense](https://developers.google.com/style/tense).
- Write [dates and times](https://developers.google.com/style/dates-times) in the global way (DD/MM/YY and 00:00)
- Use qualifying nouns for technical keywords. For example, when referring to a file called example.yaml, call it the *example.yaml* *file* and not *example.yaml* by itself. 
- Provide context. Don't assume that the reader already knows what you're talking about.
- Use negative constructions on a case by case basis, like when explaining what a feature does and what does and doesn’t work with it. 

### Write Short, Clear, and Precise Sentences

- Use active voice. Address the reader directly. Use *you*, instead of *the user* or *they*. 
- Use a simple word. For example, don't use words like *commence* when you mean *start* or *begin*. Don't use *consequently* when you mean *so*. Don't use words like *utilize* or *leverage* when you mean *use*. However, do not avoid complex words where they do belong.
- Use a single word when it conveys the same idea as a phrase. For example, don't use a phrase like *a number of* when you can use *some* or *many*.Avoid phrasal verbs when possible. A phrasal verb combines multiple words to form a single verb phrase. These verbs are also known as compound verbs. Try to substitute a simpler verb first. There might not be a better verb; for example, a few exceptions to this rule include *set up*, *log in*, and *sign in*.
  **Recommended:** This document uses the following terms:
  **Not recommended:** This document makes use of the following terms:
- Define abbreviations. Abbreviations can be confusing out of context, and they don't translate well. Spell things out whenever possible, at least the first time that you use a given term. 
- Don't use too many modifiers. In particular, don't use more than two nouns as modifiers of another noun.
  **Recommended:** A cloud-native DevSecOps pipeline in a hybrid environment
  **Not recommended:** A hybrid cloud-native DevSecOps pipeline
- Don't misplace modifiers. For example, place a word like *only* immediately before the noun or verb that it relates to.
  **Recommended:** Developers need to apply for only one token.
  **Not recommended:** Developers only need to apply for one token.
- Don't omit relative pronouns. To provide clarity and to avoid ambiguity, use relative pronouns such as *that* and *who*.
  **Recommended:** Running in a hybrid environment means that some of your processing happens on Google Cloud and other processing remains on-premises.
  **Not recommended:** Running in a hybrid environment means some of your processing happens on Google Cloud and other processing remains on-premises.
- Clarify antecedents. Using pronouns can get tricky when translators are working with small, unconnected strings of text. Help them out by making things as clear as possible. For example, if a pronoun is ambiguous, then replace it with the appropriate noun.
  **Recommended:** If you use the term *green beer* in an ad, then make sure that the ad is targeted.
  **Not recommended:** If you use the term *green beer* in an ad, then make sure that it's targeted.
- Use helper words. Helper words, such as *if*, *then*, and *of*, are frequently left out of conversational English. Use these words to avoid ambiguity.

### Be Consistent

If you use a particular term for a particular concept in one place, then use that exact same term elsewhere, including the same capitalization. 

- Don't use the same word to mean different things. In particular, avoid using the same word as both a noun and a verb in close proximity. 
- Use standardized phrases for frequently used sentences, introductory phrases, and other common tasks. 
- Use standard English word order. Sentences follow the *subject + verb + object* order.
- Try to keep the main subject and verb as close to the beginning of the sentence as possible.
- Use the conditional clause first. If you want to tell the audience to do something in a particular circumstance, mention the circumstance before you provide the instruction. 
- Make list items consistent. 
- Make list items parallel in structure. 
- Be consistent in your capitalization and punctuation. 
- Use consistent typographic formats. 
- Use bold and italics consistently. 
- Don't switch from using italics for emphasis to underlining. 
- Use consistent capitalization. 

### Be Inclusive

You're not writing for your culture. Write with inclusivity in mind. 

- Don't be too culturally specific. In particular, don't refer to specific holidays, cultural practices, or sports unless you're certain they're known worldwide.
- Avoid colloquialisms, idioms, or slang. Phrases like *ballpark figure*, *back burner*, or *hang in there* can be confusing and difficult to translate.

### Using Third-party Sources

**Key Point:** Write using your own words. Don't lift content from third-party sources.

Don't copy content from another source because it might violate copyright. Instead, paraphrase and link to their content.

Content includes the following types: text, images, code, logos, and speech.

### Voice and Tone

**Key Point:** Be conversational without being frivolous.In your documents, aim for a voice and tone that's conversational, friendly, and respectful without being overly colloquial or frivolous; a voice that's casual and natural and approachable, not pedantic or pushy. Try to sound like a knowledgeable friend who understands what the developer wants to do.

Don't try to write exactly the way you speak; you probably speak more colloquially and verbosely than you should write, at least for developer documentation. But aim for a conversational tone rather than a formal one.

Don't try to be super-entertaining, but also don't aim for super-dry. Be human, let your personality show, be memorable; you can even be a little funny now and then. But remember that the primary purpose of the document is to provide information to someone who's looking for it.

Remember that many readers aren't fluent English speakers, many of them come from cultures different from yours, and your document might be translated into other languages. 

### Some Things to Avoid Where Possible

- Buzzwords or technical jargon.
- Being too cutesy.
- [Ableist language](https://developers.google.com/style/inclusive-documentation#ableist-language) or figures of speech.
- Placeholder phrases like *please note* and *at this time.*
- Choppy or long-winded sentences.
- Starting all sentences with the same phrase (such as *You can* or *To do*).
- Current pop-culture references.
- Jokes at the expense of customers, competitors, or anyone else.
- Exclamation marks, except in rare really exciting moments.
- Wackiness, zaniness, and goofiness.
- Mixing metaphors or taking a metaphor too far.
- Funny lines that aren't closely related to the topic, or that require much off-topic verbiage, or that obscure information.
- Phrasing that denigrates or insults any group of people.
- Phrasing in terms of *let's* do something.Using phrases like *simply*, *It's that simple*, *It's easy*, or *quickly* in a procedure.

### Some Techniques and Apporaches to Consider

- If you're having trouble expressing something, step back and ask yourself, "What am I trying to say?" Often, the answer you give yourself reveals what you should be saying in the document.
- If you're uncertain about your phrasing or tone, ask a colleague to take a look.
- Try reading parts of your document out loud, or at least mouthing the words. Does it sound natural? Not every sentence has to sound natural when spoken; these are written documents. But if you come across a sentence that's awkward or confusing when spoken, consider whether you can make it more conversational.
- Use transitions between sentences. Phrases like *Though* or *This way* can make paragraphs less stilted. (Then again, sometimes transitions like *However* or *Nonetheless* can make paragraphs more stilted.)
- Even if you're having trouble hitting the right tone, make sure you're communicating useful information in a clear and direct way; that's the most important part.

## Markdown

We use an enhanced version of markdown for our documentation. Please refer to these [tips](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) if you haven't used markdown before.

### Tabbed controls

Tabbed controls are useful for creating content for different users or use cases such as multiple code samples.

To create tabbed code samples, use the following syntax:

```markdown
--------------------
### Tab Page 1
This is the content in tab page 1.
---
### Tab Page 2
This is the content in tab page 2.
--------------------
```

:::info:
The h3 heading is the tab label.
:::

![Tabbed Control](images/tabbed-control.png)

### Cards

Cards are useful for project landing pages, where you need to list more than one type or category.

To create a card, use the following syntax:

```markdown
-------------------------
Image
## Title with link to file
Data silos make it difficult to buy and sell data among different data points. To overcome this challenge, the Data Marketplace uses IOTA MAM channels to open up the data silos and allow users to make micropayments of IOTA tokens to the data owners in exchange for data.
-------------------------
```

![Cards](images/card.png)

### Colored headings

Colored headings are useful for showing a clearer distinction between to different headings.

To create a colored heading, use the following syntax:

```markdown
### **OFFICIAL SUPPORT** ###

### __COMMUNITY SUPPORT__ ###
```

![Heading Label](images/heading-label-primary.png)

![Heading Label](images/heading-label-secondary.png)

### Colored bullets

Colored bullets are useful for listing content under colored headings.

To create a colored bullet, use the following syntax:

```markdown
---------------
#### **JavaScript Library** ####
Link to file

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui.
---
#### __Go Library__ ####
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui.
---
#### Python Library ####
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui.
---------------
```

![Project Topics](images/project-topics.png)

### Emoji

Using an emoji in your content can help to engage the reader.

:::warning:
Certain emoji have different meanings in different cultures. For example, in Brazil the OK symbol :ok_hand: is considered rude, and in the Middle East, so is the thumbs-up symbol :+1:.
:::

To create an emoji, use the following syntax:

```markdown
:smile:
:laughing:
```

![Emojis](images/emojis.png)

For a list of available emoji, see this JSON file: [https://github.com/muan/emojilib/blob/master/emojis.json](https://github.com/muan/emojilib/blob/master/emojis.json)

### Google maps

A Google map can be embedded in your content by surrounding it with `¬¬¬` fencing. You can then specify the type as `[map]` and provide the JSON configuration for the object as follows:

```markdown
¬¬¬
[map]
{
    "zoom":14,
    "center": {
        "lat": 52.5294498,
        "lng": 13.412903
    },
    "markers": [
        {
            "name": "IOTA Foundation",
            "lat": 52.5294498,
            "lng": 13.412903
        }
    ]
}
¬¬¬
```

![Google Maps for IOTA](images/maps.png)

### Data feeds

A feed can be embedded in your content by surrounding it with `¬¬¬` fencing. You can then specify the type as `[feed]` and provide the JSON configuration for the object as follows:

```markdown
¬¬¬
[feed]
{
    "displayType": "event",
    "context": "training"
}
¬¬¬
```

The `displayType` field specifies how the content will be rendered on the page and the `context` field is used to determine where the data is retrieved from using the documentation api e.g. `https://docs-api.iota.org/feed/training`. The feeds list supports paging and will show it when necessary. The table of contents for the page is dynamically generated from any h2 headers in the rendered items.

![Event Feed](images/feed.png)

### Message boxes

Message boxes are useful for bringing attention to certain information.

To create a message box, use the following syntax:

```markdown
:::success:A Success
This is the content,
on multiple lines :tada:
:::

:::warning:Just A Warning Title:::

:::info:
Some multiline content only.
This is line 2.
:::

:::danger:Danger Danger
Will Robinson :bomb:
:::
```

![Message Boxes](images/message-boxes.png)

:::info:
Use an `info` box to bring attention to informations. For example, you may want to give the reader a hint. Without an `info` box, a user may lose precious time and become frustrated while trying to understand why something is not working.
:::

:::success:
Use a `success` box at the end of a task to let the reader know that they've completed it.
:::

:::warning:
Use a `warning` box more serious information than an `info` box to let the reader know important information.
:::

:::danger:
Use a `danger` box to warn the reader that an action may lead to lost funds or system failure.
:::

## Writing tools

We recommend using a code editor that supports markdown files, for example [Visual Studio Code](https://code.visualstudio.com/) with the [markdown Lint extension](https://github.com/DavidAnson/vscode-markdownlint).

## General rules

## Article titles

|Use sentence case for titles. Do not use title case.

## Guides

A guide is an article that helps experienced users achieve a task or a set of related tasks.

Each guide should explain not only **how** to perform the scenario, but also **why** a user would want to perform the scenario. What does it achieve? Why is it needed?

A brief introduction in the form of a **what** is the scenario about. A **when** section to put the scenario in context with other scenarios.

## Tutorials

A tutorial is an article for newcomers to a product that provides step-by-step instructions on how to complete a specific task.

## Code formatting

When adding code examples and snippets into an article, make sure you format it accordingly and add language identifiers for correct code highlighting. See [Creating and highlighting code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/) for more information.

### Bash

Bash code blocks shall not contain the path.

Instead of:

```bash
user@hostname:~/tmp$ mkdir iota
```

Use a standalone statement:

```bash
mkdir iota
```

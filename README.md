# **Northcoders News (Front-end)** [![CircleCI](https://circleci.com/gh/justJackjon/fe-nc-news-p/tree/master.svg?style=svg)](https://circleci.com/gh/justJackjon/fe-nc-news-p/tree/master)

Northcoders News (Front-end) is a **React application** built as the counterpart to the [back-end nc-news project](https://github.com/justJackjon/be-nc-news) accessible on github. Many of React's newer features such as hooks have been employed throughout, opting for function components over class components in order to reduce overhead for the transpiler. In addition, whilst the project originally relied upon React's Context API for application state management, the code base has since been refactored to utilise Redux.

A popular news aggregation service was used as the basis for this educational project's design, with specific design choices gravitating away from this base design where appropriate. Special attention was paid to ensure the design was as responsive as possible across all devices, and that good accessibility practices were employed throughout.

The code-base is intended to be as DRY as possible, though this is very much still a work in progress, and I would welcome any feedback.

## View a hosted version of this project at: [ncnews.justjackjon.dev](https://ncnews.justjackjon.dev/).

The front-end of this project is hosted by [netlify](https://www.netlify.com/). You can find more information about the [back-end for this project](https://github.com/justJackjon/be-nc-news) at the github repository page found [here](https://github.com/justJackjon/be-nc-news).

## View the Scrum Board:

Agile inspired development practices continue to fuel the development of this project. You can view the online [Scrum Board](https://ora.pm/project/197576/kanban) for this project [here](https://ora.pm/project/197576/kanban) to **see upcoming features and bug fixes**. Optionally, you can also view the current sprint for this project by clicking on the 'Sprint' tab at the top of the Scrum Board page. **Please bear in mind that a current sprint may not be in progress at all times**, as time is divided between this and other projects.

## Getting Started Locally:

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **git >= 2.17.1** - view multi-platform installation instructions [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
- **node >= 12.13.0 and npm >= 6.13.7** - download for your platform [here](https://nodejs.org/en/download/).

### Installing

A step by step series of examples that tell you how to get a development env running:

1. Clone this repo:

```bash
# Run the following CLI command:
git clone https://github.com/justJackjon/fe-nc-news-p
```

2. Install required dependencies:

```bash
# Run the following CLI command:
npm install
```

3. To run the application locally run the command:

```bash
npm start
# Use CTRL+C to stop
```

## Built using a [React](https://reactjs.org/) front-end - https://reactjs.org/

## Author Information:

**John Butcher** - _Find my other projects on github at: 'justJackjon'_

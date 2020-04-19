# **Northcoders News (Front-end)** [![CircleCI](https://circleci.com/gh/justJackjon/fe-nc-news-p/tree/master.svg?style=svg)](https://circleci.com/gh/justJackjon/fe-nc-news-p/tree/master)

**Live version hosted by Netlify at [ncnews.justjackjon.dev](https://ncnews.justjackjon.dev/)**

Northcoders News (Front-end) is a **React application** built as the counterpart to the [back-end nc-news project](https://github.com/justJackjon/be-nc-news) accessible on github. Many of React's newer features such as hooks, function component memoization, and more have been employed throughout, utilising function components over class components throughout the codebase in order to reduce overhead for the transpiler. Whilst the project originally relied upon React's Context API for application state management, the codebase has since been refactored to utilise [Redux](https://redux.js.org/).

Some newer additions include adding support for [contentful](https://www.contentful.com/), allowing hypothetical content teams manage content on the application with little to no coding expertise. The additional CMS functionality this allowed was put behind a feature flag so that, in the again, *hypothetical* scenario whereby the application was under great load, the contentful integration could be switched off and the application could fallback to a more basic means of retrieving content.

## Continous Integration and Delivery

Along with the introduction of contentful, a move towards CI/CD and trunk based development was employed and [CircleCI](https://circleci.com/) was introduced to manage CI/CD tasks and create custom build pipelines to streamline the delivery process. In doing so, custom build piplines have been set up to ensure continous *deployment* of draft builds, whilst production builds from master branch are continously delivered but require manual approval to deploy. CircleCI's new 'Orbs' functionality has also been utilised with this configuration, allowing custom notifications to be sent to Slack (potentially notifying specific teams/channels) for particular events in the pipeline such as manual approval or successful deployment.

The move towards trunk based development and continuous integration also necessitated the use of feature flagging (currently provided by [split.io](https://www.split.io/)) and whilst the application is now able to take advantage of the vast array of potential benefits that feature flagging provides, this was initially simply proposed to ensure unfinished features can still be committed to master.

## Agile Development

Agile inspired development practices continue to fuel the development of this project. You can view the online [Scrum Board](https://ora.pm/project/197576/kanban) for this project [here](https://ora.pm/project/197576/kanban) to **see upcoming features and bug fixes**. Optionally, you can also view the current sprint for this project by clicking on the 'Sprint' tab at the top of the Scrum Board page. **Please bear in mind that a current sprint may not be in progress at all times**, as time is divided between this and other projects.

## UI Design

A popular news aggregation service was used as the basis for this educational project's design, with specific design choices gravitating away from this base design where appropriate. Special attention was paid to ensure the design was as responsive as possible across all devices, and that good accessibility practices were employed throughout.

## Feedback

The codebase is intended to be as DRY, yet feature rich as possible though this is very much still a work in progress and I would welcome any feedback.

## View a hosted version of this project at: [ncnews.justjackjon.dev](https://ncnews.justjackjon.dev/).

The front-end of this project is hosted by [netlify](https://www.netlify.com/). You can find more information about the [back-end for this project](https://github.com/justJackjon/be-nc-news) at the github repository page found [here](https://github.com/justJackjon/be-nc-news).

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

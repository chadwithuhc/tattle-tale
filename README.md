# tattle-tale

> A GitHub App built with [Probot](https://github.com/probot/probot) that calls you out when you break the build

![Build Status](https://travis-ci.org/chadwithuhc/tattle-tale.svg?branch=master)

## Demo

A demo of the bots comment can be seen on [this PR](https://github.com/chadwithuhc/json-parser-code-challenge/pull/5)

## Github App Setup

- Create a new GitHub App at https://github.com/settings/apps/new
- Go to https://smee.io/new set the "Webhook URL" to the URL that you are redirected to
  - You will also need to save this URL in your `.env`
- Set "Webhook secret" to match `.env` value
- Add the following permissions:
  - Issues: Read & Write
  - Pull Requests: Read & Write
  - Commit Statuses: Read-only
- Subscribe to the following events:
  - Status

After creation:
- Generate your private key and move the download to this project folder
- Find your App ID on the page and add it to your `.env`

## Local Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Challenges

Some challenges faced during this app: (A.K.A. #protips)

- Tried to use `pull_request` events
  - The CI build information is not included here
- Tried to use `check_run` event
  - Nope, not here either
- Tried `status` event
  - Now we're seeing something!
- Nailing down the permissions
  - After using multiple events, had to tighten up the permissions
- Testing the log output with ✓ in it
  - Couldn't get a match without re-requesting via fetch
- Getting the issue number for adding a comment
  - Had to make multiple requests, might be able to simplify using `context.github...`

## License

[ISC](LICENSE) © 2018 chadwithuhc <chadwithuhc@gmail.com>

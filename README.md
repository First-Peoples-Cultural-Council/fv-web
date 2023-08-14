[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=First-Peoples-Cultural-Council_fv-web&metric=alert_status)](https://sonarcloud.io/dashboard?id=First-Peoples-Cultural-Council_fv-web)

# FirstVoices Frontend

## Getting Started

Mac OS X is the ideal environment for running and developing the FirstVoices Web Application. The steps below are instructions for downloading project dependencies and building the project using Terminal on Mac OS X.

### Setting Up and Running

Perform the steps below to setup your environment and run the FirstVoices Web Application on Mac OS X.

1. Install [Homebrew](https://brew.sh/) by following the instructions found on the [Homebrew](https://brew.sh/) home page.

2. Use [Homebrew](https://brew.sh/) to install [NVM](http://nvm.sh) by running:

```bash
$ brew update
$ brew install nvm
$ mkdir ~/.nvm
```

Configure NVM by adding the following entry to your `~/.bash_profile` file:

```
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

Activate and verify your new `~/.bash_profile` entry by running:

```bash
$ source ~/.bash_profile
$ echo $NVM_DIR
```

3. Clone this repository and navigate into the `fv-web` directory:

```bash
$ git clone https://github.com/First-Peoples-Cultural-Council/fv-web.git
$ cd fv-web
```

4. Install NodeJS. If you are using NVM, it will also install a coordinating version of NPM. Find the appropriate version of Node in `./package.json` (for example, 18.16.0) and set it as the active version of NodeJS by running:

```bash
$ nvm install 18.16.0
$ nvm use 18.16.0
```

5. To successfully run NPM, you need to configure your `~/.ssh/config` file so that NPM knows which RSA Key to use when cloning GitHub repositories. If you don't have an RSA Key [generate](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) one and [add](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) it to your GitHub account. Create a `~/.ssh/config` file if it does not already exist. Add the following entry to your `~/.ssh/config` file while replacing `<mykey>` as needed:

```
# Github RSA Key
Host github.com
    UseKeychain yes
    AddKeysToAgent yes
    IdentityFile ~/.ssh/<mykey>_rsa
```

6. Run npm to download `node_modules` dependencies by running:

```bash
$ npm ci
```

Important Note: when running 'npm ci' for the first time you will be silently prompted to enter the Key Phrase for the RSA Key you added to the `~/.ssh/config` file. If progress halts and a small `lock icon` appears, enter your RSA Key Phrase to proceed. If you recieve an error when running 'npm install' you may need to close your terminal and try running it again.

7. Assuming you have a local instance of backend server running on localhost:8080, you can start the dev server:

```bash
$ npm run start
```

1. Configure required environment variables.

- AWS_CLIENT_ID - OAuth2 client id
- OIDC_AUTHORITY_URL - Authority URL for retrieving OIDC metadata
- OAUTH2_REDIRECT_URL - Destination to redirect after signing in
- END_SESSION_URL - OAuth2 end session (or logout) endpoint, if not included in the OIDC metadata

8. Visit [localhost:3000](http://localhost:3000) in your web browser to view the FirstVoices app.

## Building for Production

You can build for production after completing the steps found in the _Setting Up and Running_ section above.

1. Run the following command to build for production:

```
$ npm run production
```

2. Copy the generated files in `/public` folder to your webserver.

_Note:_ Remember to configure your web application to rewrite all requests to the root path, in order for Push State to work.

## Contributing

### Adding New Dependencies

Install dependencies using `npm install --save` or `npm install --save-dev`

### Tips

- Learn how to work with [React.js](https://facebook.github.io/react/docs/getting-started.html)
- Get familiar with [ES2015](https://babeljs.io/docs/learn-es2015/) syntax

## Testing

We use BroswerStack in order to ensure our UI functions in the latest version of all major browsers, and at least 1 version back depending on demand from our users. We will be posting a more detailed and up-to-date compatibility status in the future.

## Git Hooks

Git hooks are validating the frontend code on commit.

You can skip the commit checks by adding the `--no-verify` flag to a `git commit`, eg:

`git commit -m 'pull update & conflict resolution' --no-verify`

[Husky](https://github.com/typicode/husky) runs the `pre-commit` hooks for us.

[lint-staged](https://github.com/okonet/lint-staged) runs linters against staged git files.

Configure lint-staged in `package.json`, for example:

```
  "lint-staged": {
    "*.{json,css,md}": "prettier --write",
    "*.js": [
      "eslint --fix",
      "prettier --write"
    ]
  },
```

[ESLint](https://eslint.org/) is checking the code

Please adjust the rules to suit your preference.

Configure ESLint in `.eslintrc`.

For example, downgrading a rule to a warning instead of an error.

## Licensing

The data and code in this repository is licensed under multiple licenses.

- All code in the /app directory is licensed under the Apache License 2.0. See LICENSE.

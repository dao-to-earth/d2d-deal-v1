# d2d-deal-v1
D2D deal client and contracts.

## Quickstart

### Required
* Node.js v16
* yarn CLI
* Git CLI

### Setup and Run
* Clone or fork
```bash
# clone (or fork and clone)
git clone https://github.com/dao-to-earth/d2d-deal-v1.git
cd d2d-deal-v1
```

```bash
# install node packages
yarn

```

```bash
# run client locally
yarn dev

```

You can check more commands in the scripts in package.json.<br />
About .env setup, there's .env.example for reference but only for using hardhat you just have to set API keys and your private key(DEPLOYER_PRIVATE_KEY).<br />
If you run and get errors please contract @aiinkiestism or @st2dii0.

## Project Exlained

This repo is made up of frontend([Vite](https://vitejs.dev/) + [Vue3](https://vuejs.org/)) and contract-related directories([Hardhat](https://hardhat.org/) + [hardhat-deploy](https://github.com/wighawag/hardhat-deploy)).<br />
This is just a v1 so the project structure might change.<br />

### `.github`

The .github directory contains Github Actions files and dependabot script.

### `abi`

The abi directory contains contract ABIs that are necessary in frontend.

### `contracts`

The contracts directory contains the deal deal protocol smart contract.

### `deploy`

The deploy directory contains contract deployment scripts.<br />More information about this the usage of this in [Hardhat-deploy documentation](https://github.com/wighawag/hardhat-deploy).

### `public`

The public directory contains uncompiled static assets, such as images.

### `src`

The src directory contains frontend-specific directories and files.

#### `src/assets`

The src/assets directory contains compiled static assets, such as images and Sass files.

#### `src/components`

The src/components directory contains Vue.js components.<br /> Components make up the different parts of your page and can be reused and imported into views directory.

#### `src/composables`

The src/composables contains business logic in frontend and more heavier logic than src/helpers.

#### `src/helpers`

The src/helpers contains organized logic so that complex codes and library specific codes does not appear many times in the views and components.

#### `src/views`

The src/views files are exactly the same usage with pages in Nuxt.js/Next.js, which means src/views files are responsible for rendering pages.<br />
Routing is written in src/router.ts

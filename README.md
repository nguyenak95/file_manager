# File Manager
**Author**: Khang Nguyen
**Stack**: Typescript, React, CSS
**Tool**: Vite for bundle and dev server, Vitest for unit test with coverage

This repo is 100% coverage with unit test
## Get started
Use npm to install yarn if you dont have 
```sh
npm i -g yarn
```
Install deps, navigate to the root folder of this repo, run:
```sh
yarn
```
We need to run a mock API server at localhost:8080 to view the project in the web browser. After that start the project
```sh
yarn dev
```
Unit test
```sh
yarn test:ui
```
Coverage result screenshot
![Coverage result screenshot](https://i.ibb.co/8my1DYt/image.png)
## Notes
I also found an issue with mock API server. Some file cant not be fetch, this maybe an issue with `json-server` library (version too low `0.17.3`)
Example: `directory-1/directory-1a/directory-1aA/index.js`
![Error cant get file](https://i.ibb.co/b7ZJnMY/image.png)

Other file we can still get the data
![enter image description here](https://i.ibb.co/d7KwSz8/image.png)

I'm pretty sure that this is an mock server problem, because I use `msw` as Unit Test mock server. Then I replicate the same behavior (a rest api to get `directory-1/directory-1a/directory-1aA/index.js`) It working correctly with no error
Test setup
![enter image description here](https://i.ibb.co/s1DYwwC/image.png)
Mock server handler:
![enter image description here](https://i.ibb.co/b5twJpZ/image.png)
# Image-processing-API
Resize width and height of images

## Features
- Resize images with width and height intended
- Save resized images 
- Puts width and height parameters in resized images name
- Send image saved directly if served before
- Show guide messages to user in bad requests
- Log requests to file

## Prerequisite
-node v14

## Quick start
1. Head to the project directory
2. Simply run the following command
      ```bash
      npm run quickstart
      ```
      it will do the job of : (**install dependensies** then **build project** and **start the server on port 3000**)
3. Start your bowser and head to the following link
      ```
      http://localhost:3000/resized/?filename=a&width=100&height=100
      ```
      tada.. it's working

## Structure
#### Brief
|folder/ or file |description        |
|----------------|-------------------|
|dist/           |application folder created after build and has all js files|
|log/            |has logs files basicaly access.log file|
|node modules/   |has all dependencies|
|public/         |contains images splited between 2 folders **images** and **resized**|
|src/            |contains all typescript files of the project. *read more below*|
|.eslintrc.js    |eslint configuration|
|.getignore      |git ignored files|
|.prettierignore |prettier ignore files|
|.prettierrc.json|prettier configuration file|
|jest.config.js  |jest configuration file|
|package.json    |contains installed packages and scripts|
|package-lock.json|contains all packages and dependencies||
|tsconfig.json   | specifies compiler options required to compile typesscript|

#### More Details

## Scripts
to run any script type ```npm run <script-name-here>``` in terminal
|script          |description        |
|----------------|-------------------|
|build           |builds typescript to javascript into dist/ folder |
|start           |starts server by node|
|startdev        |starts server by nodemon (for development)|
|quickstart      |install dependencies then runs **build** and **start** scripts|
|quickstartdev   |same as quick start but starts server by nodemon (fordevelopment)|
|jasmine         |test with jasmine for unit testing|
|jest            |test with supertest & jest for API integration testing|
|jest:init       |initialize jest|
|test            |compines **build** & **jasmine** & **jest**|
|lint            |run code linting with eslint|
|lint:fix        |fixes auto fixable linting errors|
|format          |user prettier to format the code|

## Endpoint
project has one endpoint which is ```/images```
for example ```http://localhost:3000/resized/?filename=a&width=100&height=100```
#### Queries
|query           |description        |
|----------------|-------------------|
|filename        |name of image exists in **public/images** folder that needs to be resized|
|width           |specifies width of image in pixels|
|height          |specifies height of image in pixels|

## Examples
project has 5 images in ```public/images``` folder, named from a to e

**Request ```a.jpg``` image to be resized as ```200w*100h```**
```
http://localhost:3000/resized/?filename=a&width=200&height=100
```
- returns ```a.jpg``` image resized as specified
- save resized image at ```public/resized``` folder with name ```a-edited-w100-h100.jpg```
- if requested with same size again will send resized image directly


**Request ```b.jpg``` image with ```missing height``` parameter**
```
http://localhost:3000/resized/?filename=a&width=200
```
- returns "height parameter is missing"


**Request not exist image ```notexist.jpg```
```
http://localhost:3000/resized/?filename=notexist&width=100&height=100
```
- returns "Image not found"

    

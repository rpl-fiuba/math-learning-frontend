


## Run locally 

#### In the project directory, you must:

- *(Temporary Fix)* Replace babel-loader version
  - Change `"babel-loader": "8.1.0"` to `"babel-loader": "8.0.6"` in `package.json` file
  - Run `npm i`
  - Run `npm start`
  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  The page will reload if you make edits. You will also see any lint errors in the console.


## Testing

### Static files
- Run `npm test`
- Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Watching Files
- Run `npm run test:watch`
- Launches same as the test runner but when some file changes, the tests run again without need of executing the command again. 

## Linting
- Run `npm run lint`
- Launches the linter test runner to check the code syntaxis.


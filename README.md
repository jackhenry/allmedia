### Setup

```
git clone git@github.com:jackhenry/allmedia.git
cd allmedia
yarn install
```

### Question 1 and 3
I wrote my solution to question 1 as a library. It is imported by my solution to question 3.

From root of the project:
```
// build the projects
yarn build
// You shouldn't have to run this, but just in case
yarn q3 build 
```
The build folder will contain an index.html that can be opened through the web browser.

### Question 2
From root of project:
```
// yarn q2 start <number to solve the problem for>
yarn q2 start 1111110
```

Please note that I wrote this all on linux. I think the npm scripts should work on windows though.
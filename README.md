# Setup

To launch this project you need to complete next steps

## Server-side setup
:computer:
- Open _any_ shell.
- Switch to the **'server'** directory inside of the repo.
- Install all dependencies by `npm install`.
- Change `.env` file _if needed_. In case if you need to change **HOST/PORT/DB URI**. Repo includes my own file, you can use it as default.
- Now you can launch project by **3** different ways(_scripts_). Choose **any**.

`npm run start` to run in **production**.  
`npm run dev` to run in **dev**(_with nodemon_).  
`npm run test` to run mocha **tests**.  

## Client-side setup
:tv:
- Open **another one** terminal window with _shell_.
- Switch to the **'client'** directory inside of the repo.
- Install all dependencies by `npm install`.
- Run client's **CLI** by `node client.js`.
- Enjoy.

You also can change axios **base url** in **config.js** _if needed_.  
`http://localhost:3000/` _by default_.

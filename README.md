# Description

Simple Node JS CRUD application with JSON storage (Express.js + Body-parser + CORS + Bootstrap)

Backend is server.js (express js server, with RESTful API endpoints)

Frontend is public/index.html (and also public/app.js)!

Data is stored in data.json, basically as soon as you click you will get data into the file

```diff
! The main goal of this app is to be a portable Node.js CRUD 
! application with JSON storage, thus run it anywhere WITHOUT 
! DOCKER relying on the NodeJS runtime... pretty cool!!!
```

**Usage:**
The easier way to portabilize AND run it is with the bash scripts:
1. `./download-nodeRE+nodeMods-and-generate-localnodescript.sh`
2. `./start-webapp-localnode.sh` #This is a selfgenerated script!!!


The old way to run this app was:
1. Run `npm install` to install dependencies
2. Run `node server.js` to start the server
3. Open `http://localhost:3000` in your browser

# TODO

* NONE!
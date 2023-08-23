# RAILS

Reservation and Inventory for Laboratory Systems for the Philippine Science Highschool - Eastern Visayas (PSHS-EVC) Laboratory Unit 


## Setup

**Be sure to install [Node.js](https://nodejs.org/en/download/) to continue**

---

Install the dependencies:

```bash
npm install
```
<hr>

Create a ```.env``` file by following the instructions on the ```.env.example``` 
<hr>

Generate the database with prisma running the ```npm run dbgenerate``` or ```npx prisma generate``` command
<hr>

Populate the database by running the file ```./prisma/devScripts/populateDB/[0]populateAll.js``` with node to populate the database with some dummy data

## Development Server
Start the development server on [http://localhost:3000](http://localhost:3000)

```bash
npm run dev
```
## Database Changes
When creating changes to the database schema through the ```schema.prisma``` file push changes with the command:
```bash
npm run dbmigrate
```
You may need to regenerate the database client with the command:
```bash
npm run dbgenerate
```
Finally, some changes will erase all data so you may need to rerun all the file inside ```./prisma/devScripts/populateDB/[0]populateAll.js``` to populate the database with data used in some of the functionality such as the options in the forms.

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```


# RAILS

Reservation and Inventory for Laboratory Systems for the Philippine Science Highschool - Eastern Visayas (PSHS-EVC) Laboratory Unit 


## Setup

**Be sure to install [Node.js](https://nodejs.org/en/download/) to continue**

---

Create a `.env` file by following the instructions on the `.env.example`

Note, if you are using codespaces or docker set in the `.env`

```
DATABASE_URL = "mysql://user:password@mysql-db:3306/rails_db"
```
<hr>
Install dependencies and initialize the database using the command:

```bash
npm catchup
```
<hr>

Populate the database by running the file ```./dev/populateDB/[0]populateAll.js``` with node to populate the database with some dummy data

## Development Server
Start the development server on [http://localhost:3000](http://localhost:3000)

```bash
npm run dev
```
### Hosting in a Local Network
After running the ``npm run dev`` command you will get a Localhost and Network URL. Add the Network URL to the list of valid URIs in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials/oauthclient/519080737068-9mbu298l9aklt6fi3ospc6aef4q6grhk.apps.googleusercontent.com?authuser=3&project=rails-382915) after adding [nip.io](https://github.com/exentriquesolutions/nip.io) to the link to follow the Google Standards for valid URIs.

Now all devices connected to the same Local Network as the running computer will be able to access the dev website through the Network URL.
## Database Changes
When creating changes to the database schema through the ```schema.prisma``` file push changes with the command:
```bash
npm run dbmigrate
```
You may need to regenerate the database client with the command:
```bash
npm run dbgenerate
```
Finally, some changes will erase all data so you may need to run the file ```./prisma/devScripts/populateDB/[0]populateAll.js``` using Node to populate the database with starter data crucial in some of the functionality such as the options in the forms.

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```


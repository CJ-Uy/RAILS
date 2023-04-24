# RAILS

Reservation and Inventory for Laboratory Systems for the Philippine Science Highschool - Eastern Visayas (PSHS-EVC) Laboratory Unit 


## Setup

**Be sure to install [Node.js](https://nodejs.org/en/download/) to continue**

---

Install the dependencies:

```bash
npm install
```
Create a ```.env``` file by following the instructions on the ```.env.example``` 

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Local Database Initialization

When creating changes to the database schema through the ```schema.prisma``` file push changes with the command:
```bash
npm run dbmigrate
```
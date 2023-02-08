# RAILS

A Reservation And Inventory Laboratory System (RAILS) for the Philippine Science High School - Eastern Visayas Campus (PSHS-EVC) Science Research Assistant (SRA) office 

## Setup

Make sure to install the dependencies:

```bash
npm install
```

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

Create a local ```MySQL``` database then create a ```.env``` file based off of the ```.env.example``` file

When creating changes to the database schema through the ```schema.prisma``` file push changes with the command:
```bash
npx prisma db push
```
Further Prisma documentation found at https://www.prisma.io/docs

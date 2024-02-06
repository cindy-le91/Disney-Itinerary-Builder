# disney-itinerary-builder

A full stack application for Disneyland visitors who want to plan their days at the theme park.

## Why I Built This

I wanted to build a more user friendly application that was easier to navigate than the offical website/ Disneyland app.

## Technologies Used

- React.js
- Bootstrap 5
- Node.js
- HTML5
- CSS3
- Azure

## Live Demo

Try the application live at [https://disney-planner.azurewebsites.net/]

## Features

- User can create an account and log in.
- User can view lists of attractions and dining options.
- User can add attractions and dining options to itinerary.
- User can view trip itinerary.
- User can update visit times for attraction/ dining options.
- User can delete items from itinerary.

## Preview

![SGT React](assets/sgt-react.gif)

### Getting Started

1. Start PostgreSQL

```
sudo service postgresql start
```

2. Create database (replace name-of-database with a name of your choosing)

```
createdb name-of-database
```

3. In a separate terminal, run

```
npm run db:import
```

to create your tables

4. Install all dependencies with:

```
npm install
```

5. Start all the development servers with the "dev" script:

```
npm run dev
```

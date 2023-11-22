# RNWeatherApp

## Project Overview

This example weather app, fetches data from [WeatherApi](https://www.weatherapi.com/). It can display weather data for your current location, or you can search for other locations to fetch weather for. The app has the following basic features.

* Display weather information for a location
* Search for locations
* Bookmark locations
* Onboarding with setup for units
* Basic theme system

## Technologies Chosen

The project utilizes the following key technologies:

   **React Native**: A JavaScript framework for building cross-platform mobile applications.

   **Reanimated**: A library for performance animations

   **React Navigation**: A navigation library

   **Redux**: A global state managment library. I used it alongside RTK

   **Typescript**: Makes life better 😁

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

   * Yarn package manager

### Installation

   1. Clone the repository to your local machine:

   ```bash
   git clone git@github.com:kierancrown/react-native-weather-app.git
   ```

2. Navigate to the project directory:

```bash
cd react-native-weather-app
```

Install dependencies:

```bash
yarn
npx pod-install
```

### Running the Project

To run the project on an emulator or a physical device, use the following commands:

```bash
# For iOS
yarn ios

# For Android
yarn android
```

### Create an env file

Create a env file in the project root named `.env.local` and add the weather API key to it.

```
API_URL=https://weatherapi-com.p.rapidapi.com
API_HOST=weatherapi-com.p.rapidapi.com
API_KEY=REPLACE_WITH_API_KEY
```

## What I Would Have Done with Extra Time

Given extra time I would have added unit and E2E tests. Unfortunately given the time constraint and other work commitments I didn't have time for either. I'd also have made some components such as the list items in the Location FAB reusable components and overall refactored the code base and clean things up. I'd also liked to have added a settings screen and display additional forecast data.

Feel free to explore and contribute to the project to make it even better!
Acknowledgments.
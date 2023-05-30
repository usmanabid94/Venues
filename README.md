# Venues
The Venues App is a mobile application that displays a cluster of venues on a map and provides a list of venues. It helps users discover nearby places of interest and provides essential information about each venue.

## Features

- Map View: The app displays a map with clustered markers representing different venues. Users can interact with the map to zoom in/out and explore different areas.

- Venue List: The app provides a list of venues in a scrollable format. Each venue item in the list displays relevant details such as the venue name, address, and additional information.

- Clustered Markers: The markers on the map are clustered to improve performance and enhance the user experience. When zooming in on the map, the clustered markers split into individual markers for better visibility.

## Technologies Used

- React Native: The app is developed using the React Native framework, allowing for cross-platform compatibility and a native-like user experience.

- Google Maps API: The app integrates with the Google Maps API to display the map, markers, and handle map interactions.

- Clustered Markers: The app utilizes clustering algorithms to group nearby venues into clusters, providing a clean and organized representation on the map.

- List View: The app implements a list view using a scrollable component to present the venues in a user-friendly format.

## Installation and Usage

1. Clone the repository to your local machine.

2. Install the required dependencies by running the following command:
npm install

3. Configure the necessary API keys:

- Obtain a Google Maps API key from the [Google Cloud Console](https://cloud.google.com/console) and replace `<YOUR_GOOGLE_MAPS_API_KEY>` in the code with your actual API key.

4. Run the app on an Android or iOS emulator or a physical device by executing the command:
npm react-native run-android
or 
npm react-native run-ios

5. Explore the Venues App by interacting with the map and the list of venues.

## Videos

_Map View showing clustered markers_

_Venue List displaying relevant information_
https://www.youtube.com/shorts/PSUKQq01k3w
## Contributing

Contributions to the Venues App are welcome! If you encounter any issues or have suggestions for improvement, please feel free to submit a pull request or open an issue on the GitHub repository.

## License

The Venues App is open source and released under the [MIT License](LICENSE).



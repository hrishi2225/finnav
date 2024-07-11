let map, userMarker;

function initMap() {
    // Initialize the map centered on a specific location (e.g., Googleplex)
    const initialLocation = { lat: 37.4219999, lng: -122.0840575 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: initialLocation,
        zoom: 15,
    });

    // Add a marker at the initial location using AdvancedMarkerElement
    new google.maps.marker.AdvancedMarkerElement({
        position: initialLocation,
        map: map,
        title: "Initial Location"
    });

    // Try to get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Update the user's marker position using AdvancedMarkerElement
                if (userMarker) {
                    userMarker.position = userLocation;
                } else {
                    userMarker = new google.maps.marker.AdvancedMarkerElement({
                        position: userLocation,
                        map: map,
                        title: "Your Location",
                        icon: {
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        }
                    });
                }

                // Center the map on the user's location
                map.setCenter(userLocation);
            },
            (error) => {
                handleLocationError(true, map.getCenter(), error);
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos, error = null) {
    let message = browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.";

    if (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message += " User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                message += " Location information is unavailable.";
                break;
            case error.TIMEOUT:
                message += " The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                message += " An unknown error occurred.";
                break;
        }
    }

    alert(message);
}
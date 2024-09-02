export function getFormattedPrice(price: number, currencySymbol = ' €') {
	const formattedPrice =
		(price / 100).toFixed(2).replace('.', ',') + currencySymbol;

	return formattedPrice;
}

export function getUserLocation(): Promise<GeolocationPosition> {
	// https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
	const options: PositionOptions = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	/* Die ältere geolocation-API basiert auf Callback-Funktionen statt
      Promises. Hier wird sie in ein Promise verpackt, um sie in asynchronen
      Funktionen nutzen zu können. */
	return new Promise((resolve, reject) => {
		window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
}

/* Die exakte Berechnung der Distanz zwischen zwei Koordinaten ist nicht ganz trivial, da
die Erde keine perfekte Kugel ist. Für die meisten Anwendungsfälle liefert die
"Haversine-Formel" ausreichend genaue Ergebnisse. Hier eine leicht angepasste
Version dieser Implementierung: http://www.geodatasource.com/developers/javascript
Auf der Seite findet man auch Versionen für andere Sprachen, z.B. PHP. */
export function getDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
	unit: 'K' | 'N' | 'M' = 'K'
) {
	if (lat1 === lat2 && lon1 === lon2) {
		return 0;
	}

	const radlat1 = (Math.PI * lat1) / 180;
	const radlat2 = (Math.PI * lat2) / 180;
	const theta = lon1 - lon2;
	const radtheta = (Math.PI * theta) / 180;
	let dist =
		Math.sin(radlat1) * Math.sin(radlat2) +
		Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	if (dist > 1) {
		dist = 1;
	}
	dist = Math.acos(dist);
	dist = (dist * 180) / Math.PI;
	dist = dist * 60 * 1.1515; // Ergibt Entfernung in Meilen
	// Ggf. Umrechnung in Kilometer oder nautische Meilen
	if (unit == 'K') {
		dist = dist * 1.609344;
	} else if (unit == 'N') {
		dist = dist * 0.8684;
	}
	return dist;
}

// Diese Funktion wartet eine bestimmte Zeit, bevor sie ein Promise auflöst.
export function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

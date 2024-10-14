import L, { GeoJSON } from "leaflet";

const Graticule = GeoJSON.extend({
  options: {
    style: {
      color: "#333",
      weight: 1
    },
    interval: 20
  },

  initialize(options) {
    L.Util.setOptions(this, options);
    this._layers = {};

    if (this.options.sphere) {
      this.addData(this._getFrame());
    } else {
      this.addData(this._getGraticule());
    }
  },

  _getFrame() {
    return {
      type: "Polygon",
      coordinates: [
        this._getMeridian(-180).concat(this._getMeridian(180).reverse())
      ]
    };
  },

  _getGraticule() {
    var features = [],
      interval = this.options.interval;

    // Meridians
    for (var lng = 0; lng <= 180; lng = lng + interval) {
      features.push(
        this._getFeature(this._getMeridian(lng), {
          name: lng ? lng.toString() + "° E" : "Prime meridian"
        })
      );
      if (lng !== 0) {
        features.push(
          this._getFeature(this._getMeridian(-lng), {
            name: lng.toString() + "° W"
          })
        );
      }
    }

    // Parallels
    for (var lat = 0; lat <= 90; lat = lat + interval) {
      features.push(
        this._getFeature(this._getParallel(lat), {
          name: lat ? lat.toString() + "° N" : "Equator"
        })
      );
      if (lat !== 0) {
        features.push(
          this._getFeature(this._getParallel(-lat), {
            name: lat.toString() + "° S"
          })
        );
      }
    }

    return {
      type: "FeatureCollection",
      features: features
    };
  },

  _getMeridian(lng) {
    lng = this._lngFix(lng);
    var coords = [];
    for (var lat = -90; lat <= 90; lat++) {
      coords.push([lng, lat]);
    }
    return coords;
  },

  _getParallel(lat) {
    var coords = [];
    for (var lng = -180; lng <= 180; lng++) {
      coords.push([this._lngFix(lng), lat]);
    }
    return coords;
  },

  _getFeature(coords, prop) {
    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coords
      },
      properties: prop
    };
  },

  _lngFix(lng) {
    if (lng >= 180) return 179.999999;
    if (lng <= -180) return -179.999999;
    return lng;
  }
});

export default Graticule;

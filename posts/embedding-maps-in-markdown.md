---
title: "Adding interactive maps to Markdown documents"
description: You might not need a GIS platform!
date: 2025-03-28
---

You don't need to add so many dependencies if you just want to stick a few
points on a map on your blog. Here's how I do it.

<script src="https://unpkg.com/maplibre-gl@^5.1.0/dist/maplibre-gl.js"></script>
<link href="https://unpkg.com/maplibre-gl@^5.1.0/dist/maplibre-gl.css" rel="stylesheet" />

<style>
#map {
    height: 300px;
};

.maplibregl-popup {
    max-width: 400px;
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
</style>

<div id="map">
</div>

<script>
const features = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "description": "Usual Haunt"
      },
      "geometry": {
        "coordinates": [
          0.2663641220908346,
          52.39915579288251
        ],
        "type": "Point"
      },
      "id": 0
    }
  ]
}


const map = new maplibregl.Map({
    container: 'map',
    style: {
        'version': 8,
        'sources': {
            'osm-tiles': {
                'type': 'raster',
                'tiles': [
                    'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                ],
                'tileSize': 256,
                'attribution': '© OpenStreetMap contributors'
            }
        },
        'layers': [
            {
                'id': 'osm-layer',
                'type': 'raster',
                'source': 'osm-tiles',
                'minzoom': 0,
                'maxzoom': 19
            }
        ]
    },
    center: [0.266, 52.399],
    zoom: 17
});

map.on('load', async () => {
    const image = await map.loadImage('https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png');

    map.addImage('custom-marker', image.data);
    map.addSource('ely-geojson', {
        'type': 'geojson',
        'data': features
    });
    map.addLayer({
        'id': 'ely-features',
        'type': 'symbol',
        'source': 'ely-geojson',
        'layout': {
            'icon-image': 'custom-marker',
            'icon-overlap': 'always'
        }
    });

    map.addControl(
        new maplibregl.NavigationControl({
            visualizePitch: true,
            showZoom: true,
            showCompass: true
        })
    );

    const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});
</script>

## How it works

The broad strokes would work for any JavaScript mapping library. For the sake of
the demo I'm going to use [MapLibreGL](https://maplibre.org/maplibre-gl-js/docs/),
but it would work for [leaflet.js](https://leafletjs.com/) or
[OpenLayers](https://openlayers.org/).

First, you want to import your mapping libraries into the document. Most mapping
libraries have CDN hosted versions, so grab a link.

```html
<script src="https://unpkg.com/maplibre-gl@^5.1.0/dist/maplibre-gl.js"></script>
<link href="https://unpkg.com/maplibre-gl@^5.1.0/dist/maplibre-gl.css" rel="stylesheet" />
```

Next, you need an anchor to put the map onto in the document. Most recommend a
plain `<div>` tag with a unique ID, so let's add one to the document.

You will want to style it as most mapping libraries require this `<div>` to be of
non-zero height on initialisation, so above that div, add a style so that it
becomes this:

```html
<style>
#map {
    height: 300px;
}
</style>

<div id="map">
</div>
```

After this (and make sure it is after this otherwise the browser will happily
execute things that don't exist to add to elements which don't exist). you can
add your map code.

```html
<script>
const features = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "description": "Usual Haunt"
      },
      "geometry": {
        "coordinates": [
          0.2663641220908346,
          52.39915579288251
        ],
        "type": "Point"
      },
      "id": 0
    }
  ]
}

const map = new maplibregl.Map({
    container: 'map',
    style: {
        'version': 8,
        'sources': {
            'osm-tiles': {
                'type': 'raster',
                'tiles': [
                    'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                ],
                'tileSize': 256,
                'attribution': '© OpenStreetMap contributors'
            }
        },
        'layers': [
            {
                'id': 'osm-layer',
                'type': 'raster',
                'source': 'osm-tiles',
                'minzoom': 0,
                'maxzoom': 19
            }
        ]
    },
    center: [0.266, 52.399],
    zoom: 17
});

map.on('load', async () => {
    const image = await map.loadImage('https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png');
    
    map.addImage('custom-marker', image.data);
    map.addSource('ely-geojson', {
        'type': 'geojson',
        'data': features
    });
    map.addLayer({
        'id': 'ely-features',
        'type': 'symbol',
        'source': 'ely-geojson',
        'layout': {
            'icon-image': 'custom-marker',
            'icon-overlap': 'always'
        }
    });

    map.addControl(
        new maplibregl.NavigationControl({
            visualizePitch: true,
            showZoom: true,
            showCompass: true
        })
    );

    const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});
</script>
```

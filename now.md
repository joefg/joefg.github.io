---
layout: layouts/base.njk
menu:
  visible: true
  title: 🕒 Now
  order: 2
---

<style>
#map {
    height: 400px;
};

.maplibregl-popup {
    max-width: 400px;
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
</style>

<script src="https://unpkg.com/maplibre-gl@^5.1.0/dist/maplibre-gl.js"></script>
<link href="https://unpkg.com/maplibre-gl@^5.1.0/dist/maplibre-gl.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js"></script>

## Now

<section class="notice">

**LAST UPDATE:** 09/08/26

A [nowpage](https://nownownow.com/about) is like a dotplan, but for the web.

</section>

### Doing

Writing the dissertation for my Master's degree.
If you see me around the University of Essex, feel free to say hi!

### Going

I tend to travel on my motorcycle at weekends.

So far this year, I have visited the places on the map.
A visit is when I park my motorcycle and have a drink for reasons
strictly of leisure, so my weekly visits to the University don't
count.

<div id="map">
</div>

<script>
const features = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          0.4861006337450817,
          52.93903140793279
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          0.7246261888218157,
          52.945206529246235
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          0.26250104414882003,
          52.399633274360326
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          1.5392776827785042,
          52.0908313074483
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          1.345901202050328,
          52.22294007298507
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          0.39399817819474947,
          52.7563559454523
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          0.9584204015490627,
          51.854559589608044
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          0.12565343949336238,
          52.201217425151356
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.7189256,
          52.0794696
        ]
      }
    }
  ]
}

const featuresCentroid = turf.centroid(features);
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
    center: [featuresCentroid.geometry.coordinates[0],
    featuresCentroid.geometry.coordinates[1]],
    zoom: 6
});

map.on('load', async () => {
    const image = await map.loadImage('https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png');

    map.addImage('custom-marker', image.data);
    map.addSource('geojson', {
        'type': 'geojson',
        'data': features
    });
    map.addLayer({
        'id': 'features',
        'type': 'symbol',
        'source': 'geojson',
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

<br/>

<figure class="polaroid">
    <img src="/img/orford-26.webp">
    <br/>
    <figcaption>Orford, Summer 2026</figcaption>
</figure>

### Using

It's an exciting time for open-weight models.

[Bonsai 27b](https://prismml.com/news/bonsai-27b) is a quantised
model small enough to run on smartphones (!!). Its bigger brother
Ternary Bonsai 27b occupies 6GB of VRAM, leaving
10GB of VRAM for context and other things. It's also multimodal.

This is *the shit*. The smaller one fits in 4GB of unified RAM,
bringing what would have been frontier intelligence two years ago
to a mobile device running in your pocket. This opens up a new class
of professional product.

The downside at the moment is that it requires a funky build of llama.cpp
because it does not currently support 1-bit or ternary operations,
and as such Ollama doesn't support it. But it won't be long.

### Reading

I like re-reading the *Dune* series. *Dune* is to the American
literary canon is what *The Lord of the Rings* is to the English canon.
If you enjoyed the latter you'll enjoy the former. I can always respect someone
who can recite the Litany Against Fear.

> I must not fear.
> 
> Fear is the mind-killer.
> 
> Fear is the little-death that brings total obliteration.
> 
> I will face my fear.
> 
> I will permit it to pass over me and through me.
> 
> And when it has gone past I will turn the inner eye to see its path.
> 
> Where the fear has gone there will be nothing. Only I will remain.

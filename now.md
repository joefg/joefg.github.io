---
layout: layouts/base.njk
menu:
  visible: false
  title: Now
  order: 1
---

<style>
#map {
    height: 300px;
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

**LAST UPDATE:** 26/05/26

A [nowpage](https://nownownow.com/about) is like a dotplan, but for the web.

</section>

<img src="img/orford-26.webp" width=300 class="right-img">

### Doing

Writing the disseration for my Master's degree.
If you see me around the University of Essex, feel free to say hi!

### Going

I tend to travel on my motorcycle at weekends.

So far this year, I have visited the places on the map. If you're
really interested, here's the
[📷 Instagram](https://instagram.com/joe_isnt_normal), feel free to
send a follow request.

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



### Using

Currently using [pi](https://pi.dev) as my coding agent. I love
[OpenCode](https://opencode.ai/) but it's getting a bit porky.

Also trying out [Hermes](https://hermes-agent.nousresearch.com/).

I'm fortunate to be GPU-middle-class and have access to a [RTX
Ada](https://www.nvidia.com/en-gb/products/workstations/rtx-2000/),
on which I can run some decent LLMs for coding. I alternate between
[gemma4:26b](https://ollama.com/library/gemma4) and the various
[qwens](https://ollama.com/library/qwen3.5). My setup script is
[here](https://gist.github.com/joefg/e243e09d79e3de0eb939ef6d9b9a52ee).

### Reading

Jürgen Schmidhuber dropped another banger: [Neural
Computers](https://arxiv.org/abs/2604.06425). This one has legs.

> We outline a roadmap toward (Completely Neural Computers), to establish a new
> computing paradigm beyond today's agents and conventional computers.

Doesn't this excite you?

On the fiction front, *The Crying of Lot 49* by Thomas Pynchon. Like anything
else Pynchon, it is *weird*, but in a fun way.

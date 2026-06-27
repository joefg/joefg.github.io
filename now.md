---
layout: layouts/base.njk
menu:
  visible: true
  title: 🕒 Now
  order: 2
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

**LAST UPDATE:** 26/06/26

A [nowpage](https://nownownow.com/about) is like a dotplan, but for the web.

</section>

<img src="/img/orford-26.webp" width=300 class="right-img">

### Doing

Writing the disseration for my Master's degree.
If you see me around the University of Essex, feel free to say hi!

Decided to have a mild re-work of my site. I want it to have more of
a technical focus, so I archived a lot of old, waffly postings. They're
still available if you know how to look.

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

### Using

I'm starting to use [Marimo](https://marimo.io) over Jupyter.

I'm also exploring AI agents more. I tried
[LangChain](https://www.langchain.com/) but found it a mild pain to
set up with my own inference infrastructure. I tried
[CrewAI](https://crewai.com/) but found it a bit porky, but I can
understand the appeal. It reminds me of DAG stuff like Airflow.

Maybe I'll have better luck with [Pydantic
AI](https://pydantic.dev/docs/ai/overview/). I like Pydantic and FastAPI.
Hopefully this isn't just a "quick, stick an AI badge on it for more
funding" wheeze.

### Reading

I like re-reading the Dune series. For every passing year there's
something that I missed the previous year.

> “When I am weaker than you, I ask you for freedom because that is according to
> your principles; when I am stronger than you, I take away your freedom because
> that is according to my principles.”
>
> -- Frank Herbert, *Children of Dune*

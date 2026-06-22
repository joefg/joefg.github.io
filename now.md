---
layout: layouts/base.njk
menu:
  visible: true
  title: 🕒 Now
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

**LAST UPDATE:** 22/06/26

A [nowpage](https://nownownow.com/about) is like a dotplan, but for the web.

</section>

<img src="img/orford-26.webp" width=300 class="right-img">

### Doing

Writing the disseration for my Master's degree.
If you see me around the University of Essex, feel free to say hi!

Decided to have a mild re-work of my site. I want it to have more of
a technical focus, so I archived a lot of old, waffly postings. They're
still available if you know how to look.

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

After a recent
[attack on the Arch User
Repository](https://archlinux.org/news/active-aur-malicious-packages-incident/),
I decided to try another distribution. Sadly, the AUR debacle shows that
the existing security settlement of Linux is no longer adequate and
that containerisation might be the lesser evil.

I'm giving [Bluefin](https://projectbluefin.io/) a try. It's a bit
quirky, it's an immutable root system and as much as possible is
sandboxed. You won't need to use a package manager which writes
to root, instead it's either writing to your user or runs
from a container.

[Distrobox](https://distrobox.it/#distrobox) is pretty good too. I can
see the utility in having a development container separate from your host.
Tip: create a `~/.distrobox` directory and keep your distrobox home directories
in there if you want a properly separate container.

### Reading

A bit late to the party, but [this Encyclical
Letter](https://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html)
by the Pontifex is worth reading.
A reminder: the first commandment is "Thou shalt not have any other Gods than
me".

> Humanity, created by God in all its grandeur, is today facing a pivotal
> choice: either to construct a new Tower of Babel or to build the city in which
> God and humanity dwell together.

Banger!

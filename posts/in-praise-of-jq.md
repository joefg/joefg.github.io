---
title: In praise of jq
description: jq, the valuable JSON flick knife
date: 2024-07-16
---

Question for you: Given the following poorly-formatted set of lon/lat, how would
you assemble these into a [GeoJSON](https://geojson.org/)?

```json
[
    [-3.5, 51],
    [-1.25, 51.75],
    [1.24, 52.64]
]
```

You could use Python.

```python
import json

with open('file.json', 'r') as f:
    points = json.load(f)

ret = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": point
            }
        } for point in points
    ]
}

print(json.dumps(ret, indent=4))

# {
#     "type": "FeatureCollection",
#     "features": [
#         {
#             "type": "Feature",
#             "properties": {},
#             "geometry": {
#                 "type": "Point",
#                 "coordinates": [
#                     -3.5,
#                     51
#                 ]
#             }
#         },
#         {
#             "type": "Feature",
#             "properties": {},
#             "geometry": {
#                 "type": "Point",
#                 "coordinates": [
#                     -1.25,
#                     51.75
#                 ]
#             }
#         },
#         {
#             "type": "Feature",
#             "properties": {},
#             "geometry": {
#                 "type": "Point",
#                 "coordinates": [
#                     1.24,
#                     52.64
#                 ]
#             }
#         }
#     ]
# }
```

You could also use `jq`.

```sh
$ jq -s '
{
    "type" : "FeatureCollection",
    "features": [ .[] |
        {
            "type" : "Feature", 
            "properties": {}, 
            "geometry": 
                {
                    "type" : "Point",
                    "coordinates": .[]
                } 
        } 
    ]
}' < points.json 

###

{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -3.5,
          51
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -1.25,
          51.75
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          1.24,
          52.64
        ]
      }
    }
  ]
}
```

[jq](https://stedolan.github.io/jq/) is a marvel. It's a contender for being a
proper standard Linux tool. It's designed to be portable: don't have it on your
server? No problem, just `scp` the executable and it works exactly the same as
it does on your machine. It works nicely with `stdin` and `stdout`. There's a
build for [most operating systems](https://stedolan.github.io/jq/download/), and
if there wasn't, building it is easy provided you have a good C compiler.

If you have [fzf](https://github.com/junegunn/fzf) installed (and you should),
you can have a rudimentary `jq` REPL in your terminal on a file of your choice.

```sh
fjson() {
    echo '' | fzf --print-query --preview "cat *.json | jq {q}"
}
```

Just piping a JSON string into `jq` prettifies it by default, and adds colours
if it detects that it's in a terminal.

```sh
$ jq < points.json 

###

[
  [
    -3.5,
    51
  ],
  [
    -1.25,
    51.75
  ],
  [
    1.24,
    52.64
  ]
]
```

If your JSON's too big, it even minifies it with `-c`.

```sh
$ jq -c < points.json

###

[[-3.5,51],[-1.25,51.75],[1.24,52.64]]
```

Frankly, it should be installed by default on all operating systems. It's that
useful.

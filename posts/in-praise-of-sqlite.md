---
title: In praise of SQLite
description: Why I reach for SQLite first.
date: 2024-03-26
---

[SQLite](https://www.sqlite.org/index.html) is a fantastic datastore that is
applicable to most use cases. Think of it as `fopen()` with testable SQL
queries. It finds regular use in most mobile devices, many desktop and mobile
applications, some embedded devices, a few web services as well...

While it primarily exists at the edges of the network, it can also work at the
centre of the network.

[The story of how it happened is something to
read](https://corecursive.com/066-sqlite-with-richard-hipp/), and in an age of
software that stops being supported as soon as it becomes unfashionable, it's a
big relief to find that SQLite's developers plan to support it [through to
2050](https://www.sqlite.org/lts.html).

## Exploration

A trick I like to use is using SQLite to manipulate CSV files. One old
interview question used to be searching inside a CSV, and loading the CSV into
SQLite means you can use good old SQL queries to do this.

```
$ sqlite3 file.db
sqlite> .mode csv
sqlite> .import file.csv imported_csv
sqlite> .exit
```

I remember being given a 2GB CSV dump to do with ▇▇▇▇▇▇▇▇▇▇ and trying to open
it with Excel. Someone showed me how to load a big CSV into SQLite and perform a
query on it, and this became the first version of a tool that I'm told is still
used today. Another [trick is using SQLite and a bash
oneliner](https://til.simonwillison.net/sqlite/one-line-csv-operations) to
effectively run a `SELECT` over a CSV. Data scientists: don't discount it! Ditch
the Excel macro and learn some reproducible SQL instead.

Another tool I like to use is [Datasette](https://datasette.io/). I found it to
work well with exploring data, although it's not as comprehensive as something
like QGIS for manipulating this data.

## In-memory operations

It is also possible to use SQLite
[in-memory](https://www.sqlite.org/inmemorydb.html). I find this to be a useful
alternative to [Pandas](https://pandas.pydata.org/), especially if the
operations wanted are simple enough and you don't want the mess of a gigantic
Pandas call for things like aggregation over rows. Just open it as an in-memory
database, insert your data, do your operations, then close the connection.

```python
import sqlite3

conn = sqlite3.connect(':memory:')
conn.execute("select 1;").fetchall() # -> [(1,)]
```

I tend to do this for small datasets because operations done in RAM are quicker
than reads and writes to a database file. The added bonus is that you can change
`:memory:` for a file, then inspect this database file while you halt your
program in the debugger.

## Geospatial data

I tend to prototype GIS projects using
[SpatiaLite](https://www.gaia-gis.it/fossil/libspatialite/index). SpatiaLite is
also [supported in
QGIS](https://docs.qgis.org/2.8/en/docs/training_manual/databases/spatialite.html),
and anything that can open a SQLite file can also open SpatiaLite with
`mod_spatialite` installed. SpatiaLite is an extension to SQLite, so to enable
it in your Python application, you can simply `SELECT
load_extension("mod_spatialite")` to enable it.

```python
import os
import sqlite3

def connect(path):
  conn = sqlite3.connect(os.path.join(path))
  conn.enable_load_extension(True)
  conn.execute("SELECT load_extension('mod_spatialite')")
  conn.execute("SELECT InitSpatialMetaData(1);")

  return conn, conn.cursor()

conn, cur = connect('path/to/database.db')
conn.close()
```

My only issue is that this requires an additional `mod_spatialite` and
`spatialite-bin` on any machine which needs to use the spatial functionality.
[This guide is helpful for
installation](https://docs.djangoproject.com/en/5.0/ref/contrib/gis/install/spatialite/).

## Prototyping

[Fireship built a simple chat application with
PocketBase](https://www.youtube.com/watch?v=gUYBFDPZ5qk). You can think of
PocketBase as a [wrapper and web server around SQLite](https://pocketbase.io/),
although that is selling it massively short.

Datasette also allows you to expose an API to query your SQLite database, but
PocketBase is more comprehensive in my opinion and it also has an administration
panel out of the box with sensible default options.

I tend to use it to make a datastore before choosing which database to actually
use, but I find that I'm able to take `sqlite` quite far anyway.

## The cutting edge

If you find yourself wanting to scale your database, read the [Architecture doc](https://www.sqlite.org/arch.html) first. Get familiar with how it works, and where the slow points are likely to be.

In my experience, look in this order:

1. Your queries-- are they using indexes?

2. Your structure-- do you index what you need to index?

3. Your connections-- do you read and write in one place only?

Once you've exhausted these, look into the [WAL](https://www.sqlite.org/wal.html). Out of the box, SQLite implements atomicity through a rollback journal, which locks the file. Compare to WAL per the docs:

> 1. WAL is significantly faster in most scenarios.
> 
> 2. WAL provides more concurrency as readers do not block writers and a writer
> does not block readers. Reading and writing can proceed concurrently.
> 
> 3. Disk I/O operations tends to be more sequential using WAL.
> 
> 4. WAL uses many fewer fsync() operations and is thus less vulnerable to
> problems on systems where the fsync() system call is broken. 

It's no panacea, and you should read the document closely and evaluate whether
the trade-offs are worth it. Sometimes the database *isn't* the problem. Being a
file-based database, you are ultimately at the mercy of the filesystem. Once you
start down this rabbit hole, it's time to look into database servers.

## Alternatives

If you're doing a lot of column-wise analytics work, give
[DuckDB](https://duckdb.org/) a go. Like SQLite, it can be used in-memory. There
are libraries available for Python, R, Java, and Node. Installation is a single
binary at simplest. There's support for importing
[Parquets](https://parquet.apache.org/). There's a reasonable [Spatial
extension](https://duckdb.org/docs/extensions/spatial) which is easier to set up
than SpatiaLite ever has been.

There's even a [SQLite extension](https://duckdb.org/docs/extensions/sqlite)
which can talk to SQLite files!

There will come a point where embedded databases quite simply won't scale, and
that's fine. SQLite has some problems with concurrency. If you're fine with
allowing only one connection to SQLite (essentially making a quasi-service),
that's fine, but consider a database server instead, like PostgreSQL, or MySQL,
or MariaDB.
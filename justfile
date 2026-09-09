project_name := "joefg.github.io (jfg.name)"
image_name := "jfg.name"
container_name := "jfg.name-container"

_default:
    @echo "--- {{ project_name }} ---"
    @just --list --unsorted

# Removes artefacts
clean:
    rm -rf _site/

# Checks codebase
lint:
    just --fmt --check
    deno check
    deno lint

# Builds site
build:
    deno task build

# Serves site
serve:
    deno task serve

# Builds container
[group('container')]
container:
    docker build . -t "{{ image_name }}"

# Removes container
[group('container')]
remove-container:
    docker ps -aq --filter "name=^?{{ container_name }}" | xargs -r docker rm -f

# Runs container
[group('container')]
run-container cmd:
    docker run \
    		-p 127.0.0.1:3000:3000 \
    		--name "{{ container_name }}" \
    		"{{ image_name }}" "{{ cmd }}"

# Stops container
[group('container')]
stop-container:
    docker stop "{{ container_name }}"

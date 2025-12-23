// podman (rootless)

$ podman run --name some-postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 -d docker.io/library/postgres

// docker

# docker run --name some-postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres

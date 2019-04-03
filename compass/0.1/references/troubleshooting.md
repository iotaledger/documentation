# Troubleshooting

**You may find some of these issues while creating an IOTA network with Compass.**

## Got permission denied while trying to connect to the Docker daemon socket

You may see this error when you run any command that includes `bazel run //docker`.

1. Add your current user to the docker group. Change the `$USER` variable to your username.
    ```bash
    sudo usermod -a -G docker $USER
    ```

2. Reboot your Linux server and try again

## Malformed snapshot state file

You may see this error when you run the IRI.

In the snapshot.txt file, remove any line break characters.

## NumberFormatException

You may see this error when you run the IRI.

In the snapshot.txt file, remove any spaces after the semicolon.

## IllegalArgumentException

You may see this error when you run the IRI.

In the snapshot.txt file, remove any spaces before the semicolon.
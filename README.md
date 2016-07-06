A simple Node.js script that attempts to extract the audio out of all the movie files in a directory. Defaults to extracting audio in MP3 format and looks for movies in the directory where you invoked this script.

Apologies for the awful name.

## Usage Examples

This is assuming the script is in your $PATH and has had the `.js` suffix removed.

Extract `.mp3` audio from your current directory:

```bash
$ extract-audio-from-movie
```

To extract `.aac` audio:

```bash
$ extract-audio-from-movie '.aac'
```

To extract `.aac` audio from the movies in your `Downloads` directory:

```bash
$ extract-audio-from-movie '.aac' ~/Downloads
```

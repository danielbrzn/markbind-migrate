# markbind-migrate

This is a script to convert existing MarkBind websites to use front matter for pages that have titles defined within `site.json`.

### Usage

1. Run `npm install` after cloning this repository.
2. Run `node index.js` to start the script.
3. Enter in the name of a directory which contains a Markbind site.
4. Enter in the desired `titlePrefix` of the migrated site. This `titlePrefix` will be removed from existing page titles if it exists.
5. Hit enter and the script will run. The `site.json` of a subsite (specifically the `book` subsite) will be ignored.
6. After which, the `site.json` pages array should contain the globs corresponding to addressable pages, and the `titlePrefix`. The titles would have been migrated to the respective `.md` files.


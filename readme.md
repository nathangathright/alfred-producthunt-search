# alfred-producthunt-search

Search Product Hunt posts from Alfred

![screenshot](screenshot.jpg)

## Installation
**<a download href="https://github.com/nathangathright/alfred-producthunt-search/releases/latest/download/producthunt-search.alfredworkflow">Download and install the latest release</a>** 

_You will need [Alfred Powerpack](https://www.alfredapp.com/powerpack/) to enable this workflow._

## Usage
### hunt
Type the keyword `hunt`, enter your query, and select a result.
- Press <kbd>Return</kbd> to open the Product Hunt post for the selected result.
- Press <kbd>⌘</kbd> + <kbd>Return</kbd> to open the external link post for the selected result.
- Press <kbd>⌘</kbd> + <kbd>C</kbd> to copy the URL of the selected result to your clipboard.

### hunted
Type the keyword `hunted` and enter a URL to check if it’s already been submitted to Product Hunt.
  - If the URL is found on Product Hunt, press <kbd>Return</kbd> to open the Product Hunt post.
  - If the URL is not found on Product Hunt, press <kbd>Return</kbd> to open the Product Hunt submission page.

Alternatively, set up a hotkey in Alfred to pre-populate the `hunted` URL from your frontmost browser window.

## Credits
- Hat tip to [Chris Messina](https://twitter.com/chrismessina) for the nudge to create this
- Built with [alfy](https://github.com/sindresorhus/alfy) via [generator-alfred-algolia](https://github.com/prashantpalikhe/generator-alfred-algolia)

## License

MIT © [Nathan Gathright](https://github.com/nathangathright)

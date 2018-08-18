# Saka

A browsing assistant for [Firefox](https://addons.mozilla.org/firefox/addon/saka/) and [Chrome](https://chrome.google.com/webstore/detail/saka/nbdfpcokndmapcollfpjdpjlabnibjdi) designed to be fast, intuitive, and beautiful. Inspired by Spotlight. Keyboard-focused but mouse friendly too.

* Lists tabs in order of recency by default, then fuzzy search by title or URL.
* Search recently closed tabs
* Search all bookmarks
* Search all browsing history
* Search all modes at once

![Preview](./images/preview.png)

## Install

Install Saka from the [Firefox Marketplace](https://addons.mozilla.org/firefox/addon/saka/) or [Chrome Webstore](https://chrome.google.com/webstore/detail/saka/nbdfpcokndmapcollfpjdpjlabnibjdi).

## Development
See the [Getting Started](https://github.com/lusakasa/saka/wiki/Getting-Started) page on the project Wiki.

## Release Instructions (for maintainers)

1.  Update the version number in `/static/manifest.json`

2.  Make a commit and set the message to the version: `git commit -m "v0.15.2"`

3.  Tag the commit with the version and a message describing changes since the last release: `git tag -a v0.15.2`

4.  Push the commit to github with tags: `git push origin --follow-tags`

5.  View the build status at https://travis-ci.org/lusakasa/saka/ and generated releases at https://github.com/lusakasa/saka/releases

## License

MIT Licensed, Copyright (c) 2018 Sufyan Dawoodjee, Uzair Shamim

# Nerd Logger JS

A simple, no dependency, configurable logger for NodeJS. 

## Install

Add the following line to your **.npmrc** file. 

`@app-nerds:registry=https://npm.pkg.github.com`

Add the following to your **.yarnrc** file.

`"@app-nerds:registry" "https://npm.pkg.github.com"`

```bash
yarn install @app-nerds/nerdloggerjs
```

## Getting Started

Basic usage is simple.

```javascript
const { Logger } = require("nerdloggerjs");

const logger = new Logger();

logger.debug("this is a test");

logger.info("test #2");

logger.error("this error has additional metadata", {
  who: "Adam",
  message_id: "abcdefg",
});
```

## License

MIT License

Copyright (c) 2022 App Nerds

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


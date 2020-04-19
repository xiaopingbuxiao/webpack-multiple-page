const globAll = require('glob-all')
const path = require('path')


const projectRoot = process.cwd()

describe('checking generated html files', () => {
  it('should generate html files', (done) => {
    const files = globAll.sync([
      path.join(projectRoot, './dist/index.html'),
      path.join(projectRoot, './dist/about.html')
    ])
    console.log(files)
    if (files.length === 2) {
      done()
    } else {
      throw new Error('generatehtml is error')
    }
  });
})

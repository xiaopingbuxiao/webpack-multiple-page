const globAll = require('glob-all')
const path = require('path')


const projectRoot = process.cwd()

describe('checking generated css js files', () => {
  it('should generate css js files', (done) => {
    const files = globAll.sync([
      path.join(projectRoot, './dist/js/index_*.js'),
      path.join(projectRoot, './dist/js/index_*.css'),
      path.join(projectRoot, './dist/js/index_*.js'),
      path.join(projectRoot, './dist/js/index_*.css')
    ])
    console.log(files)
    if (files.length>0) {
      done()
    } else {
      throw new Error('generatehtml is error')
    }
  });
})

import dox from 'dox'
import fs from 'fs-extra'
import glob from 'glob'
import markdownMagic from 'markdown-magic'
import path from 'path'
import { append, assoc, filter, find, forEach, isEmpty, map, prop, reduce } from 'ramda'
import pack from '../../package.json'
import { reduceObjIndexed } from './utils'

const API_README_PATH = path.resolve(__dirname, '..', '..', 'docs', 'API.md')
const SRC_PATH = path.resolve(__dirname, '..', '..', 'src')
const CURRENT_VERSION = pack.version
const GITHUB_TAG_URL = `https://github.com/serverless/utils/tree/v${CURRENT_VERSION}`

const findSrcFiles = () =>
  new Promise((resolve, reject) => {
    const options = {
      cwd: SRC_PATH,
      ignore: [
        '**/*.test.js',
        '**/tests/*',
        '**/index.js',
        'index.js',
        'data/freeGlobal.js',
        'data/nodeTypes.js',
        'data/root.js'
      ]
    }
    glob('**/*.js', options, (error, files) => {
      if (error) {
        return reject(error)
      }
      resolve(files)
    })
  })

const parseSrcFiles = async (srcFiles) =>
  Promise.all(
    map(async (srcFile) => {
      const fullPath = path.join(SRC_PATH, srcFile)
      const contents = await fs.readFile(fullPath, 'utf8')
      return {
        srcFile,
        meta: dox.parseComments(contents)
      }
    }, srcFiles)
  )

const findCategory = (tags) => {
  const categoryTag = find((tag) => tag.type === 'category', tags)
  return prop('string', categoryTag)
}

const findExample = (tags) => {
  const returnTag = find((tag) => tag.type === 'example', tags)
  return returnTag
}

const findParams = (tags) => {
  const paramTags = filter((tag) => tag.type === 'param', tags)
  return paramTags
}

const findReturns = (tags) => {
  const returnsTag = find((tag) => tag.type === 'return' || tag.type === 'returns', tags)
  return returnsTag
}

const findSince = (tags) => {
  const sinceTag = find((tag) => tag.type === 'since', tags)
  return prop('string', sinceTag)
}

const cleanupTypesDescription = (typesDescription) =>
  typesDescription
    .replace(/\*/, '&ast;')
    .replace(/<a.*?>/, '<code>')
    .replace(/<\/a>/, '</code>')

const renderFunctionMarkdown = ({
  description,
  example,
  line,
  name,
  params,
  returns,
  since,
  srcFile
}) => {
  let markdown = `### ${name}()\n\n`
  // console.log('meta:', JSON.stringify(data, null, 2))
  markdown += `[source](${GITHUB_TAG_URL}/src/${srcFile}#L${line})    since ${since}\n`
  markdown += `${description}\n\n`

  markdown += `<b>Params</b><br />\n`
  if (!isEmpty(params)) {
    forEach((param) => {
      markdown += `<p>${cleanupTypesDescription(
        param.typesDescription
      )}: ${param.description.replace('<p>', '')}\n`
    }, params)
    markdown += `\n`
  } else {
    markdown += `None\n\n`
  }
  markdown += `<b>Returns</b><br />\n`
  if (returns) {
    markdown += `<p>${cleanupTypesDescription(
      returns.typesDescription
    )}: ${returns.description.replace('<p>', '')}\n\n`
  } else {
    markdown += `<code>undefined</code>\n\n`
  }
  if (example) {
    markdown += `<b>Example</b><br />\n`
    markdown += `${example.html}\n\n`
  }
  markdown += '\n\n'
  return markdown
}

const renderCategoryMarkdown = (category) => {
  const markdown = `## ${category.name} methods\n\n`
  return reduce(
    (accMarkdown, fn) => {
      return accMarkdown + renderFunctionMarkdown(fn)
    },
    markdown,
    category.functions
  )
}

const generateFunctionDocs = (meta, srcFile) => {
  const category = findCategory(meta.tags)
  if (!category) {
    throw new Error(`Source file ${srcFile} did not declare a @category tag`)
  }
  const since = findSince(meta.tags)
  if (!since) {
    throw new Error(`Source file ${srcFile} did not declare a @since tag`)
  }
  return {
    category,
    description: meta.description.full,
    example: findExample(meta.tags),
    line: meta.ctx.line,
    name: meta.ctx.name,
    params: findParams(meta.tags),
    returns: findReturns(meta.tags),
    since,
    srcFile
  }
}

const generateCategoryDocs = (srcData) =>
  reduce(
    (categories, data) => {
      forEach((meta) => {
        if (meta.ctx && !isEmpty(meta.tags)) {
          const fnDocs = generateFunctionDocs(meta, data.srcFile)
          let category = prop(fnDocs.category, categories)
          if (!category) {
            category = {
              name: fnDocs.category,
              functions: []
            }
          }
          category = assoc('functions', append(fnDocs, category.functions), category)
          categories = assoc(fnDocs.category, category, categories)
        }
      }, data.meta)
      return categories
    },
    {},
    srcData
  )
const generateAPIDocs = (srcData) =>
  new Promise((resolve, reject) => {
    const magicConfig = {
      transforms: {
        METHODS() {
          const categories = generateCategoryDocs(srcData)
          return reduceObjIndexed(
            (markdown, category) => {
              return markdown + renderCategoryMarkdown(category)
            },
            '',
            categories
          )
        }
      }
    }

    markdownMagic([API_README_PATH], magicConfig, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log('Error while generating docs')
        return reject(error)
      }
      // eslint-disable-next-line no-console
      console.log('🎉 Docs updated!')
      resolve()
    })
  })

const exec = async () => {
  const srcFiles = await findSrcFiles()
  const srcData = await parseSrcFiles(srcFiles)
  await generateAPIDocs(srcData)
}

exec().catch((error) => {
  // eslint-disable-next-line no-console
  console.log('error:', error)
  process.exit(1)
})

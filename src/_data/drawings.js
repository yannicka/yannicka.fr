const fs = require('fs')

const folderGarticPhone = 'src/dessins/gartic-phone/img'
const baseGarticPhone = 'dessins/gartic-phone/img'

const folderDrawception = 'src/dessins/drawception/img'
const baseDrawception = 'dessins/drawception/img'

module.exports = () => {
  let filesGarticPhone = []

  fs.readdirSync(folderGarticPhone).forEach(file => {
    filesGarticPhone.push(`/${baseGarticPhone}/${file}`)
  })

  let filesDrawception = []

  fs.readdirSync(folderDrawception).forEach(file => {
    filesDrawception.push(`/${baseDrawception}/${file}`)
  })

  return {
    'gartic_phone': filesGarticPhone,
    'drawception': filesDrawception,
  }
}

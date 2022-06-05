const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const ajv = new Ajv()
addFormats(ajv)
ajv.addFormat('test', (data) => {
  return data === 'hahah'
})
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'test',
      // minLength: 10
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['name', 'age'],
}

const validate = ajv.compile(schema)

const valid = validate({
  name: 'hahah',
  age: 12,
})
if (!valid) console.log(validate.errors)

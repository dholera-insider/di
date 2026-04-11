// In your schema.js
export default {
  name: 'splitSection',
  type: 'object',
  title: 'Split Section',
  fields: [
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }]
    },
    {
      name: 'image',
      type: 'image',
      title: 'image',
      options: { hotspot: true }
    },
    {
      name: 'align',
      type: 'string',
      title: 'Image Alignment',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' }
        ],
        layout: 'radio'
      }
    }
  ]
}
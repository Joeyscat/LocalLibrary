/**
 * doc 创建时间 plugin。其中在 插入一条 doc 时 同时创建 createdAt 和 updateAt 字段
 *
 * @param schema
 * @param options
 */
function createdAt(schema, options) {
  schema.add({ created_at: Date })
  schema.add({ updated_at: Date })

  schema.pre('save', function(next) {
    let now = Date.now()
    this.created_at = now
    this.updated_at = now
    next()
  })

  if (options && options.index) {
    schema.path('created_at').index(options.index)
    schema.path('updated_at').index(options.index)
  }
}

/**
 * doc 更新时间 plugin
 *
 * @param schema
 * @param options
 */
function updatedAt(schema, options) {
  schema.pre('updateOne', function(next) {
    this.updateOne({}, { $set: { updated_at: new Date() } })
    next()
  })

  if (options && options.index) {
    schema.path('updated_at').index(options.index)
  }
}

module.exports = {
  createdAt: createdAt,
  updatedAt: updatedAt
}

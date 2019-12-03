const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  // 指向相关藏书的引用
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  // 出版项
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['可供借阅', '馆藏维护', '已借出', '保留'],
    default: '馆藏维护'
  },
  due_back: { type: Date, default: Date.now }
}
);

// 虚拟属性'due_back_formatted'：藏书副本 格式化的归还日期
BookInstanceSchema
  .virtual('due_back_formatted')
  .get(() => {
    return moment(this.due_back).format('YYYY/MM/DD')
  })


// 虚拟属性'url'：藏书副本 URL
BookInstanceSchema
  .virtual('url')
  .get(() => {
    return '/catalog/bookinstance/' + this._id;
  });

// 导出 BookInstancec 模型
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
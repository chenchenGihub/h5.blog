/*
 * @Description: 原型类型定义
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-04-28 21:15:59
 */
const {
  Schema
} = require('mongoose');

exports.ARTICEL_SCHEMA = {
  authorIdType: {
    type: String
  },
  titleType: {
    type: String,
    trim: true,
    require: true,
    minlength: [1, "标题长度必须大于等于6位"],
    maxlength: [30, "标题长度必须小于等于100位"],
    alias: 't'
  },
  contentType: {
    type: String,
    trim: true,
    require: true,
    minlength: [1, "文本内容必填"],
    maxlength: [1000, "文本内容不能超过1000"],
    alias: 'c'
  },
  htmlType: {
    type: String,
    trim: true,
    require: true,
    minlength: [1, "html内容必填"],
    maxlength: [1000, "html内容不能超过1000"],
    alias: 'h'
  },
  hiddenType: { type: Boolean, default: false }
};

exports.USER_SCHEMA = {
  userNameType: {
    type: String,
    trim: true,
    require: true,
    minlength: [6, "账号长度必须大于等于6位"],
    maxlength: [10, "账号长度必须小于等于10位"]
  },
  avatarUrlType: {
    type: String,
    trim: true,
    default: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
  },
  emailType: {
    type: String,
    trim: true
  },
  passwordType: {
    type: String,
    trim: true,
    require: true,
    minlength: [6, "密码长度必须大于等于6位"],
    maxlength: [18, "密码长度必须小于等于18位"],
    set: v => v.trim(),
    get: v => v.trim(),
    validate: (v) => {
      if (v.length < 6) {
        return '长度过小'
      }
    },
    alias: 'p'
  },
  tokenType: {
    type: String
  },
  deviceType: [String],
  ipType: [String],
  articleType: [
    Schema.Types.ObjectId
  ],
  fansType: [
    Schema.Types.ObjectId
  ],
  roleType: {
    type: String,
    default: 2 //0最高
  }
}


exports.COMMENT_SCHEMA = {
  votedType: [
    {
      userId: {
        type: String,
        trim: true,
        require: true,
      },
      userName: {
        type: String,
        trim: true,
        require: true,
      },
      avatar: {
        type: String,
        require: true
      }
    }
  ],
  replydataType: [
  //   {
  //   parentcommentid:{
  //     type:Schema.Types.ObjectId
  //   },
  //   commentid:{
  //     type:Schema.Types.ObjectId
  //   },
  //   user: {
  //     userId: {
  //       type: String,
  //       trim: true,
  //       require: true,
  //     },
  //     userName: {
  //       type: String,
  //       trim: true,
  //       require: true,
  //     },
  //     avatar: {
  //       type: String,
  //       require: true
  //     }
  //   },
  //   replytouserid:{
  //     type:Schema.Types.ObjectId
  //   },
  //   createdTime: {
  //     type: Date,
  //     default: Date.now()
  //   },
  //   comment: {
  //     type: String,
  //     trim: true,
  //     require: true,
  //     set: v => v.trim(),
  //     get: v => v.trim(),
  //     alias: 'c'
  //   },
  // }
],
  commentType: {
    type: String,
    trim: true,
    require: true,
    set: v => v.trim(),
    get: v => v.trim(),
    alias: 'c'
  },
  userType: {
    userId: {
      type: String,
      trim: true,
      require: true,
    },
    userName: {
      type: String,
      trim: true,
      require: true,
    },
    avatar: {
      type: String,
      require: true
    }
  },
  deviceType: [String],
  ipType: [String],
  articleType: Schema.Types.ObjectId,
  createdTime: {
    type: Date,
    default: Date.now()
  },
}







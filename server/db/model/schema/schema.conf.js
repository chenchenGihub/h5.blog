/*
 * @Description: 原型类型定义
 * @Author: chenchen
 * @Date: 2019-04-12 20:07:01
 * @LastEditTime: 2019-05-25 22:54:11
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
    minlength: [1, "标题长度必须大于等于1位"],
    maxlength: [100, "标题长度必须小于等于100位"],
    alias: 't'
  },
  contentType: {
    type: String,
    trim: true,
    maxlength: [18000, "文本内容不能超过18000"],
    alias: 'c'
  },
  imgType: {
    type: Array
  },
  htmlType: {
    type: String,
    trim: true,
    require: true,
    minlength: [1, "html内容必填"],
    maxlength: [18000, "html内容不能超过18000"],
    alias: 'h'
  },
  votesType: new Schema({
    userId: {
      type: String,
      trim: true,
      require: true,
    }
  }),
  hiddenType: { type: Boolean, default: false }
};

exports.USER_SCHEMA = {
  userNameType: {
    type: String,
    trim: true,
    require: true,
    minlength: [3, "账号长度必须大于等于3位"],
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
  descriptionType: {
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
  /**
  * 点赞的子文档
  */
  votedType:
    new Schema({
      userId: {
        type: String,
        trim: true,
        require: true,
      }
    })
  ,
  commentType: {
    type: String,
    trim: true,
    require: true,
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
    },
    isAuthor: {
      type: Boolean,
      default: false
    }
  },
  deviceType: [String],
  ipType: [String],
  articleType: Schema.Types.ObjectId,
  isLikeType: {
    type: Boolean,
    default: false
  },
  votedCountsType: {
    type: Number,
    default: 0
  },
  /**
   * 子文档
   */
  children_comment_type: new Schema({
    user_from: {
      userId: {
        type: Schema.Types.ObjectId,
        require: true
      },
      userName: {
        type: String,
        trim: true,
        require: true,
      },
      avatar: {
        type: String,
        require: true
      },
      isAuthor: {
        type: Boolean,
        default: false
      },
      isFloorOwner: {
        type: Boolean,
        default: false
      }
    },
    user_to: {
      type: Schema.Types.ObjectId,
      require: true
    },
    parentcommentid: { type: Schema.Types.ObjectId, require: true },
    commentTxt: String,
    comment: String,
    voted:
      [new Schema({
        userId: {
          type: String,
          trim: true,
          require: true,
        }
      })]
    ,
    isLike: {
      type: Boolean,
      default: false
    },
    votedCounts: {
      type: Number,
      default: 0
    }
  }, {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
    })
}







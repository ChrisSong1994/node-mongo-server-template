const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        email: {
            type: String, // 类型是字符串
            unique: true, // 是集合内唯一的
            required: true, // 不能为空
        },

        name: {
            type: String,
            maxlength: 24, // 最大长度为 24
            required: true,
        },

        // 密码加盐哈希值
        password: {
            type: String,
            required: true,
            maxlength: 60,
        },
    },
    {
        timestamps: true,
    }
);

export default model('User', UserSchema);

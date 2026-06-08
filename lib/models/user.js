import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Имя не должно быть короче 2-х символов'],
      maxlength: [30, 'Имя не должно быть длиннее 30-и символов'],
      default: 'Пользователь',
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Указана неверная почта',
      },
    },
    password: {
      type: String,
      required: [true, 'Необходимо ввести пароль'],
      select: false,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new Error('Неправильные почта или пароль'));
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) return Promise.reject(new Error('Неправильные почта или пароль'));
        return user;
      });
    });
};

export default mongoose.models.user || mongoose.model('user', userSchema);

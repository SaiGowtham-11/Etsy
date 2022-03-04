import bcrypt from 'bcryptjs'

const users = [
  {
    userName: 'Vineeth',
    userEmailId: 'Vineeth@gmail.com',
    userPassword: bcrypt.hashSync('123456', 10),
  },
  {
    userName: 'Ishwaak',
    userEmailId: 'Ishwaak@gmail.com',
    userPassword: bcrypt.hashSync('123456', 10),
  },
  {
    userName: 'Manoj',
    userEmailId: 'Manoj@gmail.com',
    userPassword: bcrypt.hashSync('123456', 10),
  },
]

export default users

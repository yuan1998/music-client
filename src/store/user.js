export default {
  state: {
    userId: '', // ID
    username: '', // 名字
    userPic: '', // 图片
    user: null,
  },
  getters: {
    user: state => state.user,
    userId: state => state.userId,
    username: state => state.username,
    userPic: state => state.userPic ? state.userPic : '/img/avatorImages/user.jpg'
  },
  mutations: {
    setUser: (state, user) => { state.user = user },
    setUserId: (state, userId) => { state.userId = userId },
    setUsername: (state, username) => { state.username = username },
    setUserPic: (state, userPic) => { state.userPic = userPic }
  }
}

// 更改用户的状态信息
export const userStatus = (state,user) => {
  if (user) {
    state.currentUser = user.cusName
    state.nickName = user.nickName
    state.id = user.id
    state.avatar = user.avatar
    state.isLogin = true
  } else if (user == null) {
    // 登出清空信息
    sessionStorage.removeItem("userInfo", null);
    sessionStorage.removeItem("usertoken", "");
    state.currentUser = null,
    state.isLogin = false,
    state.nickName = null,
    state.id = null,
    state.avatar = null,
    state.token = "";
  }
}

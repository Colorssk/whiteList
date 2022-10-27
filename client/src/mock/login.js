const tokens = {
  admin: "USER_ADMINISTRATOR",
  user: "USER_CONSUMER",
  user1: "USER_CONSUMER1",
  user2: "USER_CONSUMER2",
};

const users = {
  "USER_ADMINISTRATOR":{
      id: "admin",
      role: "USER_ADMINISTRATOR",
      name: "admin",
      roleName: '超级管理员',
      email: 'admin@sumscope.com',
      avatar: "./imgs/avtor.jpg",
      description: "拥有系统内所有菜单和路由权限",
      rights: [1,2],
    },
  "USER_CONSUMER": {
      id: "user",
      role: "USER_CONSUMER",
      name: "user",
      roleName: '交易员',
      email: 'user@sumscope.com',
      avatar: "./imgs/avtor.jpg",
      description:"可以看到除户管理页面之外的所有页面",
      rights: [1,2],
  },
  "USER_CONSUMER1": {
    id: "user1",
    role: "USER_CONSUMER",
    name: "user1",
    roleName: '局限交易员',
    email: 'user1@sumscope.com',
    avatar: "./imgs/avtor.jpg",
    description:"权限受限",
    rights: [1],
  },
  "USER_CONSUMER2": {
    id: "user2",
    role: "USER_CONSUMER",
    name: "user2",
    roleName: '投资者',
    email: 'user2@sumscope.com',
    avatar: "./imgs/avtor.jpg",
    description:"权限受限",
    rights: [2],
  }
};

export default {
  login: (config) => {
    const { username } = JSON.parse(config.body);
    const token = tokens[username];
    if (!token) {
      return {
        respCode: 1,
        message: "用户名或密码错误",
      };
    }
    return {
      respCode: '00000000',
      text:token,
    };
  },
  userInfo: (config) => {
    const token = config.body;
    const userInfo = users[token];
    if (!userInfo) {
      return {
        respCode: 1,
        message: "获取用户信息失败",
      };
    }
    return {
      respCode: '00000000',
      text: userInfo,
    };
  },
  logout: (_) => {
    return {
      respCode: '00000000',
      text: "success",
    };
  },
};

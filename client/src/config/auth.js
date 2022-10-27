export const USER_ADMINISTRATOR = "USER_ADMINISTRATOR";
export const USER_CONSUMER = "USER_CONSUMER";


export const whiteList = {
    USER_ADMINISTRATOR: {// 管理账号
        routers: ['error','userManager', 'roleManager'],
        mainRoute: ['/userManager']// 管理账号-首页
    },
    USER_CONSUMER: {// 普通用户
        routers: ['error','releasePlan','workFlow','clientManager'],
        mainRoute: ['/releasePlan']// 普通用户-首页
    }
}
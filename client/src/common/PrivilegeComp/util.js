import {store} from '@/store/'
//judge right
export const judgeRight = (key) => {
    //临时权限判断
    const { rights=[] } = store.getState().user
    return rights.includes(key)
}
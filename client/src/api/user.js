import request from '@/utils/request'

export function reqUserInfo(data) {
  return new Promise( async (resolve,reject)=>{
    try {
      const response = await request({
        url: '/userInfo',
        method: 'post',
        data
      })
      if (response.respCode === '00000000') {
        resolve(response|| []) ;
      }
    } catch (e) {
      reject([]);
    }
  })
}
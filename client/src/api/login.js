import request from '@/utils/request'

export  function reqLogin(data) {
  return new Promise( async (resolve,reject)=>{
    try {
      const response = await request({
        url: '/login',
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

export function reqLogout(data) {
  return new Promise( async (resolve,reject)=>{
    try {
      const response = await request({
        url: '/logout',
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
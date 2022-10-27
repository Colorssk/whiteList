import Axios from '@/utils/request'

/**
 * 发行计划列表
 */
 export const releasePlanList =   async (query) => {
    try {
      const response = await Axios.post('/rest/pc/cbs/api/v1/issuance-bond-infos', query);
      if (response.respCode === '00000000') {
        return response.text || [];
      }
    } catch (e) {
      return [];
    }
};
// 收藏债券
export const collectBond = (query) => {
  return new Promise(async(resolve,reject)=>{
    try {
      const response = await Axios.post('/rest/pc/cbs/api/v1/attention/save', query);
      if (response.respCode === '00000000') {
        resolve(response.text || []);
      }else{
        reject(null)
      }
    } catch (e) {
      reject(null)
    }
  })
};
//取消收藏债券
export const unCollectBond = (query) => {
  return new Promise(async(resolve,reject)=>{
    try {
      const response = await Axios.post('/rest/pc/cbs/api/v1/attention/delete', query);
      if (response.respCode === '00000000') {
        resolve(response.text || []);
      }else{
        reject(null)
      }
    } catch (e) {
      reject(null)
    }
  })
};
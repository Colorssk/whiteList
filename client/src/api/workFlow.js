import Axios from '@/utils/request'

/**
 * 报价列表
 */
export const quoteList =   async (query) => {
    try {
      const response = await Axios.post('/rest/pc/cbs/api/v1/bid-bond-quotes', query);
      if (response.respCode === '00000000') {
        return response.text || [];
      }
    } catch (e) {
      return [];
    }
};
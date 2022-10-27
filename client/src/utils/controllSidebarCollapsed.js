import { toggleSiderBarAction, setHasClickSliderBarAction } from '@/store/actions'
import {
    store
} from "@/store";

export const controllSidebarCollapsed = () => {
    window.addEventListener('resize', () => {
        setSidebarCollapsed(false)
    });
    window.addEventListener('load', () => {
        store.dispatch(setHasClickSliderBarAction(0))
        setTimeout(()=>{
            setSidebarCollapsed(true)
        },200)
    });
}
/**
 * 
 * @param {*} isInitial 
 * 0 初始化： <1024 收  >1920 展
   1 点击过并且当前状态收： < 1024. >1920  收  不处理
   2 点击过并且当前状态态展开:  <1024 收  >1920 展
 */
function setSidebarCollapsed(isInitial = false, toggleSiderBar) {
    const clientWidth = document.body.clientWidth;
    if (store && store.getState()) {
        const {
            app: {
                sidebarCollapsed,
                hasEverClickSliderBar
            }
        } = store.getState();
        let validStatus = sidebarCollapsed;
        //初始化： <1030 收  >1920 展 没点击过
        if (isInitial || Number(hasEverClickSliderBar)===0) {
            if (clientWidth < 1030) {
                validStatus = true
            }
            if (clientWidth > 1920) {
                validStatus = false
            }
        } else {
            //已经被点击过
            if (Number(hasEverClickSliderBar)!==0) {
                //如果点击过并且点击之后初始状态收 则不做处理 否则<1024 收  >1444 展
                if (Number(hasEverClickSliderBar)===2) {
                    if (clientWidth < 1030) {
                        validStatus = true
                    }
                    if (clientWidth > 1920) {
                        validStatus = false
                    }
                }
            }
        }
        if(validStatus!==sidebarCollapsed){
            store.dispatch(toggleSiderBarAction(validStatus))
        }

    }
}
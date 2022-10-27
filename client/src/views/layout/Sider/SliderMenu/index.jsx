import React from 'react'
import {connect} from 'react-redux'
import { setLogoMenuVisible, logout }  from '@/store/actions' 
//styles
import style from './index.module.less';

const SliderMenu = props => {
    const {setLogoMenuVisible, logout, name='', roleName='', email=''} = props
    const onStopPropagation = event => {
        event && event.stopPropagation()
    }
    const onLayout = () => {
        logout()
        setLogoMenuVisible(false)
    }
    const getFistNameUp = ()=>{
        let res = ''
        if(name.length){
            res = name.charAt(0).toUpperCase();
        }
        return res
    
    }
    return (
        <div className={style.sliderMenu} onClick={onStopPropagation}>
                <div className={`${style.animation} ${style.logoContainer}`}>
                    <div className={style.loginLogo}>
                        {getFistNameUp()}
                    </div>
                </div>
                <div className={`${style.animation} ${style.userInfo}`}>
                    <div className={style.userName}>
                        {name}
                    </div>
                    <div className={style.userInfoRole}>
                        {roleName}
                    </div>
                    <div className={style.userInfoRole}>
                        {email}
                    </div>
                </div>
                <div className={`${style.animation} ${style.sliderLi}`} onClick={onLayout}>退出</div>
        </div>
    )
}

export default connect(state=>state.user,{setLogoMenuVisible, logout})(SliderMenu)
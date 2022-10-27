import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { setLogoMenuVisible } from '@/store/actions'
import menuList from "@/config/menuConfig";
import { useHistory } from 'react-router-dom';
//styles
import style from './index.module.less'

const SliderFooter = props => {
    const history = useHistory();
    const [footerMenu, setFooterMenu] = useState([])
    const { app: { sidebarCollapsed } } = props
    useEffect(() => {
        const { user: { role } } = props
        setFooterMenu(menuList.filter(menu => menu['isBottomMenu'] && menu['roles'].includes(role)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { setLogoMenuVisible, app: { showLoginMenu }, user: { name = '' } } = props
    const onShowLogoMenu = (event) => {
        if (event) {
            event.stopPropagation()
        }
        setLogoMenuVisible(!showLoginMenu);
    }
    const goToDirection = (path) => {
        history.push({
            pathname: path
        })
    }
    const getFistNameUp = () => {
        let res = ''
        if (name.length) {
            res = name.charAt(0).toUpperCase();
        }
        return res

    }
    console.log('slider footer render', sidebarCollapsed)
    return (
        <div className={style.sliderFooterContainer}>
            <div className={style.bottomMenuContainer}>
                {
                    footerMenu.map((menu, index) => (
                        <div key={index} className={`${style.footerBlock} ${!sidebarCollapsed && style.isHover}`} onClick={() => { goToDirection(menu.path ? menu.path : '/') }}>
                            {menu.icon && <img className={style.footerBlockIcon} src={menu.icon} alt="" />}
                            <div className={`${style.footerAppear} ${!sidebarCollapsed && style.footerAppearAnimation}`}>{!sidebarCollapsed && menu.title}</div>
                        </div>
                    ))
                }
            </div>
            <div className={style.loginLogo} onClick={onShowLogoMenu}>
                {getFistNameUp()}
            </div>
        </div>
    )
}
export default connect(state => state, { setLogoMenuVisible })(SliderFooter)
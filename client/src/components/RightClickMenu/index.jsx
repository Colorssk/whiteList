import React from 'react';
import style from './index.module.less';

const RightClickMenu = props => {
    const { left = 0, top = 0, menuList=[] } = props
    //click action delegate to parent Comp
    const onClickLabel = (menu) => {
        if(props.handler){
            props.handler(menu)
        }
    }
    return (
        <div className={style.menuContainer} style={{ left, top }}>
            {
                menuList.map((menu,index)=>(
                    <div key={index} className={style.menuBlcok} onClick={()=>{onClickLabel(menu)}}>
                        {menu.label}
                    </div>
                ))
            }
        </div>
    )
}

export default RightClickMenu
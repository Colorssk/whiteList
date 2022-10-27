
import React from 'react';
import style from './index.module.less';
import logo from '@/assets/images/logo.png';
import { useHistory } from 'react-router-dom';

const Header = props => {
  const history = useHistory()
  const goToHome = () => {
    history.push({
      pathname: '/'
    })
  }
  return (
    <div className={style.headerContainer}>
      <img src={logo} alt="" className={style.headerLogoIcon} onClick={goToHome} />
      债券投标管理
    </div>
  )
}

export default Header

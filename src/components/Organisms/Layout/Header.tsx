import LogoutIcon from '@components/Atoms/HeaderIcons/LogoutIcon'
import MenuIcon from '@components/Atoms/HeaderIcons/MenuIcon'
import HeaderLogo from '@components/Atoms/Logo/HeaderLogo'
import React from 'react'
import { View } from 'react-native'

const Header = () => {
  return (
<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15}}>
<MenuIcon />
<HeaderLogo />
<LogoutIcon />
</View>
  )
}

export default Header
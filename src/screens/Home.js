import { View, Text } from 'react-native'
import React from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal } from '../commonComponents/ResponsiveScreen'

const Home = () => {
  return (
    <HeaderView title={Translate.t("welcome", { name: "Developer!" })} isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>
    </HeaderView>
  )
}

export default Home
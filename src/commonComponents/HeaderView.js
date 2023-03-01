import { View, Text, SafeAreaView, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { greenPrimary, midGreen, offWhite, transparent, white } from '../constants/Color'
import LinearGradient from 'react-native-linear-gradient'
import { heightPixel, pixelSizeHorizontal, widthPixel } from './ResponsiveScreen'
import IconButton from './IconButton'
import FastImage from 'react-native-fast-image'
import { BackImg } from '../constants/Images'
import { BOLD, FontSize, SEMIBOLD } from '../constants/Fonts'

const HeaderView = ({ title = "", isBack = true, children, onPress = {}, containerStyle = {}, ...props }) => {
    return (
        <>

            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={transparent} />

            <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }} bounces={false} keyboardShouldPersistTaps='handled'>

                <LinearGradient colors={[greenPrimary, midGreen]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ height: heightPixel(150) }}>

                    <SafeAreaView style={{ flex: 1 }}>

                        {title &&
                            <View style={{
                                flex: 1, flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                {isBack &&
                                    <IconButton additionalStyle={styles.btnBack}
                                        onPress={onPress}>
                                        <FastImage source={BackImg} style={{ width: widthPixel(24), height: widthPixel(24), }}
                                            resizeMode='contain'
                                        />
                                    </IconButton>}
                                <Text style={[styles.textTitle, { marginHorizontal: !isBack ? pixelSizeHorizontal(25) : 0 }]}>{title}</Text>
                            </View>
                        }


                    </SafeAreaView>
                </LinearGradient>


                <LinearGradient colors={[greenPrimary, midGreen]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ height: heightPixel(25) }}>
                </LinearGradient>

                <View style={[styles.mainView, { ...containerStyle }]}>
                    {children}
                </View>
            </ScrollView>

        </>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: offWhite
    },
    textTitle: {
        fontSize: FontSize.FS_25,
        fontFamily: SEMIBOLD,
        color: white,
        // marginTop: pixelSizeHorizontal(6)
    },
    btnBack: {
        // width: widthPixel(48), height: widthPixel(48),
        marginHorizontal: pixelSizeHorizontal(10)
    },
    mainView: {
        flex: 1, backgroundColor: offWhite, marginTop: pixelSizeHorizontal(-25), borderRadius: widthPixel(25)
    }
})


export default HeaderView
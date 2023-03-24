import { View, Text, Share, StyleSheet, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import { black, greenPrimary, offWhite, paleGreen, white } from '../constants/Color'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import Translate from '../translation/Translate'
import FastImage from 'react-native-fast-image'
import { Error, ShareBoxImg, Success, Warning } from '../constants/Images'
import { ANDROID_APP_LINK, IOS_APP_LINK } from '../constants/ConstantKey'
import { BOLD, FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import Modal from "react-native-modal";

import Icon from 'react-native-vector-icons/Entypo';

const AlertView = ({show, title,description,onSucess,onCancel,type  }) => {
    console.log("data 1",show+title+description+type+onSucess+onCancel)
    const [isAlertVisible, setIsAlertVisible] = useState(show)


    const toggleAlert = () => {
        setIsAlertVisible(!isAlertVisible)
    }

    return (
        <Modal animationType="slide"
            transparent={true}
            isVisible={isAlertVisible} 
            onBackdropPress={() => toggleAlert()}
            onBackButtonPress={() => toggleAlert()}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{   borderRadius: 70, position: "absolute", top: -32,alignItems:"center",justifyContent:"center" }}>
                        <FastImage
                            source={Success}
                            style={{ width: widthPixel(70), height: widthPixel(70) }}
                            resizeMode={'contain'}
                        />
                         {/* <FastImage
                            source={Error}
                            style={{ width: widthPixel(70), height: widthPixel(70) }}
                            resizeMode={'contain'}
                        />
                         <FastImage
                            source={Warning}
                            style={{ width: widthPixel(70), height: widthPixel(70) }}
                            resizeMode={'contain'}
                        /> */}
                    </View>
                    <View style={{marginTop:pixelSizeHorizontal(50)}}>
                    <Text style={{fontFamily:BOLD,fontSize:18,color:"#16a06e"}}>{title}</Text>
                    {/* <Text style={{fontFamily:BOLD,fontSize:18,color:"#e04f5f"}}>Error</Text> */}
                    {/* <Text style={{fontFamily:BOLD,fontSize:18,color:"#fbda6b"}}>Warning</Text> */}
<Text>{description}</Text>
                    </View>

                </View>

            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: "100%",
        height: 300,
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default AlertView

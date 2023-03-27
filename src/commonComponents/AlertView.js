import { View, Text, Share, StyleSheet, Pressable, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { black, greenPrimary, offWhite, paleGreen, warmGrey, white, disableColor } from '../constants/Color'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import Translate from '../translation/Translate'
import FastImage from 'react-native-fast-image'
import { Error, ShareBoxImg, Success, Warning } from '../constants/Images'
import { ANDROID_APP_LINK, IOS_APP_LINK } from '../constants/ConstantKey'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import Modal from "react-native-modal";

import Icon from 'react-native-vector-icons/Entypo';

const AlertView = ({ isAlertVisible, show, toggleAlert, title, description, onSucess, onCancel, type, successText, cancleText }) => {
    // console.log("data 1", () => toggleAlert())
    // const [isAlertVisible1, setIsAlertVisible1] = useState(show)


    // const toggleAlert = () => {
    //     setIsAlertVisible1(!isAlertVisible1)
    // }

    return (
        <Modal animationIn="fadeInUp"
            isVisible={isAlertVisible}
            onBackButtonPress={() => toggleAlert()}
            onBackdropPress={() => toggleAlert()}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ borderRadius: 70, position: "absolute", top: -32, alignItems: "center", justifyContent: "center" }}>
                        {type == "success" &&
                            <FastImage
                                source={Success}
                                style={{ width: widthPixel(70), height: widthPixel(70) }}
                                resizeMode={'contain'}
                            />
                        }
                        {type == "error" &&
                            <FastImage
                                source={Error}
                                style={{ width: widthPixel(70), height: widthPixel(70) }}
                                resizeMode={'contain'}
                            />
                        }
                        {type == "warning" &&
                            <FastImage
                                source={Warning}
                                style={{ width: widthPixel(70), height: widthPixel(70) }}
                                resizeMode={'contain'}
                            />
                        }
                    </View>
                    <View style={{ marginTop: pixelSizeHorizontal(35), alignItems: "center" }}>
                        {type == "success" &&
                            <Text style={{ fontFamily: BOLD, fontSize: 14, color: "#16a06e", textAlign: "center", marginVertical: pixelSizeHorizontal(10) }}>{title}</Text>}
                        {type == "error" &&
                            <Text style={{ fontFamily: BOLD, fontSize: 14, color: "#e04f5f" }}>{title}</Text>}
                        {type == "warning" &&
                            <Text style={{ fontFamily: BOLD, fontSize: 14, color: "#fbda6b" }}>{title}</Text>}

                        <Text style={{ fontFamily: REGULAR, fontSize: 14, color: black, textAlign: "center", marginVertical: pixelSizeHorizontal(10) }}>{description}</Text>
                    </View>
                    <View style={{ marginTop: pixelSizeHorizontal(20), alignItems: "center", flexDirection: "row", alignSelf: "center", justifyContent: "center" }}>
                        {onCancel &&
                            <TouchableOpacity onPress={onCancel} activeOpacity={0.7} style={{ width: 80, height: 35, backgroundColor: disableColor, borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15 }}>
                                <Text style={{ fontFamily: MEDIUM, fontSize: 14, color: black, }}>{cancleText}</Text>
                            </TouchableOpacity>
                        }
                        {onSucess &&
                            <>
                                {type === "success" &&
                                    <TouchableOpacity onPress={onSucess} style={{ width: 80, height: 35, backgroundColor: "#16a06e", borderRadius: 20, alignItems: "center", justifyContent: "center", }}>
                                        <Text style={{ fontFamily: MEDIUM, fontSize: 14, color: white, }}>{successText}</Text>
                                    </TouchableOpacity>
                                }
                                {type == "error" &&
                                    <TouchableOpacity onPress={onSucess} style={{ paddingHorizontal: 10, height: 35, backgroundColor: "#e04f5f", borderRadius: 20, alignItems: "center", justifyContent: "center", }}>
                                        <Text style={{ fontFamily: MEDIUM, fontSize: 14, color: white, }}>{successText}</Text>
                                    </TouchableOpacity>
                                }
                                {type == "warning" &&
                                    <TouchableOpacity onPress={onSucess} style={{ width: 80, height: 35, backgroundColor: "#fbda6b", borderRadius: 20, alignItems: "center", justifyContent: "center", }}>
                                        <Text style={{ fontFamily: MEDIUM, fontSize: 14, color: white, }}>{successText}</Text>
                                    </TouchableOpacity>
                                }
                            </>}


                    </View>

                </View>

            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: "90%",
        // height: 300,
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        padding: 15,
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

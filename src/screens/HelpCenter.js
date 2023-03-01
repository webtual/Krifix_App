import { View, Text, StyleSheet, LayoutAnimation, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack } from '../navigations/RootNavigation'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { black, warmGrey } from '../constants/Color'
import FastImage from 'react-native-fast-image'
import { BackImg } from '../constants/Images'

const HelpCenter = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [Description_expanded, setDescription_expanded] = useState(false)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [ArrFaq, setArrFaq] = useState([1,2,3,6,5])


    useEffect(() => {
        Description_changeLayout(0)
    }, [])
    

    const Description_changeLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if(index == questionIndex){
            setDescription_expanded(!Description_expanded)
        }else{
            setDescription_expanded(true)
        }
        setQuestionIndex(index)
    }


    return (
        <HeaderView title={Translate.t("help_center")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
            onPress={() => goBack()}>

            <Text style={styles.textTitle}>
                {Translate.t("we_are_here_to_help")}
            </Text>


            <FlatList 
                data={ArrFaq}
                scrollEnabled={false}
                ListHeaderComponent={() => (<View style={{ height: widthPixel(30),}} />)}
                ItemSeparatorComponent={() => (<View style={{ height: widthPixel(10),}} />)}
                renderItem={({ item, index }) => (
                    <View >

                        <TouchableOpacity
                            onPress={() => Description_changeLayout(index)}
                            style={{
                                alignItems: 'center', flexDirection: 'row', paddingVertical : pixelSizeHorizontal(10),
                                justifyContent: 'space-between', 
                            }}>

                            <Text style={{
                                color: warmGrey, fontFamily: MEDIUM, fontSize: FontSize.FS_16,
                                justifyContent: 'center', marginRight: 10, flex: 1
                            }}
                                numberOfLines={2}>How to use app?</Text>

                            <FastImage 
                                source={BackImg}
                                style={{width : widthPixel(15), height : widthPixel(15), transform: [{ rotate: Description_expanded && questionIndex == index ? '90deg' : '270deg'}]}}
                                tintColor={warmGrey}
                                resizeMode='contain'
                            />

                        </TouchableOpacity>
                        {questionIndex == index &&

                            <View style={{
                                height: Description_expanded ? null : 0, overflow: 'hidden', marginTop : Description_expanded ? pixelSizeHorizontal(10) : 0
                            }}>
                                <Text style={{ fontSize: FontSize.FS_12, fontFamily: REGULAR, color: warmGrey }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </Text>
                            </View>
                        }
                    </View>
                )}
            />

        </HeaderView>
    )
}


const styles = StyleSheet.create({

    textTitle: {
        fontSize: FontSize.FS_16,
        fontFamily: SEMIBOLD,
        color: black,
        marginTop: pixelSizeHorizontal(30)
    },
})

export default HelpCenter
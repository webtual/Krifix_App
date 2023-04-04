import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { PhoneImg } from '../constants/Images'
import { pixelSizeHorizontal, widthPixel } from './ResponsiveScreen'
import { FontSize, MEDIUM } from '../constants/Fonts'
import { black, disableColor, greenPrimary, seprator, warmGrey } from '../constants/Color'

const TextInputView = ({ value = "",imageSource, onChangeText, placeholder = "", editable = true, multiline ,containerStyle={},additionalStyle={}, ...props }) => {

    const [isFocused, setIsFocused] = useState(false)


    const onFocus = () => {
        setIsFocused(true)
        props?.onFocusEffect && props?.onFocusEffect()
    }

    const onBlur = () => {
        setIsFocused(false)
        props?.onBlurEffect && props?.onBlurEffect()
    }

    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center' },{...containerStyle}]}>

            {imageSource &&
            <FastImage tintColor={warmGrey}
                source={imageSource}
                style={{ width: widthPixel(25), height: widthPixel(25),}}
                resizeMode={'contain'}
            /> }

            <TextInput
             placeholderTextColor={disableColor}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                editable={editable}
                multiline={multiline}
                onFocus={onFocus}
                onBlur={onBlur}
                style={[{
                    flex: 1, marginLeft: pixelSizeHorizontal(15), fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: editable ? black : warmGrey,
                    paddingVertical: pixelSizeHorizontal(7), borderBottomColor: isFocused ? greenPrimary : seprator, borderBottomWidth: 1
                },{...additionalStyle}]}
                {...props}
            />

        </View>
        
    )
}

export default TextInputView
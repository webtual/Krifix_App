/**  Third Party  */
import { showMessage, hideMessage } from "react-native-flash-message";

/**  Constants  */
import { FontSize, REGULAR } from "../constants/Fonts";
import {white} from "../constants/Color";
import AlertView from "./AlertView";

export function DisplayMessage({title, description, type, onPress}) {

	showMessage({
		message: title,
		description: description,
		type: type, // success, warning, info and danger
		duration : 4000,
		icon : type,
		textStyle : {fontFamily : REGULAR, fontSize : FontSize.FS_14,color:white},
		titleStyle : {fontSize : FontSize.FS_18, fontFamily : REGULAR, color:white},
		backgroundColor:"purple",
		onPress : () => {
			onPress()
		}
	  });
}

export function DisplayAlert({show, title, description, type, onSucess,onCancel}) {
console.log("data",show+title+description+type+onSucess+onCancel)
	return(
		<AlertView 
			show={show}
			title={title}
			description={description}
			type={type}
			onSucess={onSucess}
			onCancel={onCancel}
		/>
	)
}

export function HideMessage() {
	hideMessage()
}
import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ConfirmIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            fill="#FE9B3F"
            d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm1.136 8.903c.13.236.259.473.39.708.187.336.574.392.847.123.382-.375.762-.75 1.142-1.128.227-.224.455-.448.68-.673.279-.278.228-.656-.113-.854-.207-.119-.42-.23-.623-.357-.239-.149-.47-.17-.707.016-.296-.301-.592-.597-.881-.899a4.433 4.433 0 0 0-1.492-1.046 4.116 4.116 0 0 0-2.462-.24.246.246 0 0 0-.144.118c-.04.077.013.144.07.201L7.48 6.534l1.71 1.734a.207.207 0 0 1-.018.037.515.515 0 0 0-.037.598Zm-5.233 1.952c.146.136.28.285.421.425.34.337.838.344 1.166-.002a739.09 739.09 0 0 0 2.946-3.105L7.05 6.77c-.078.07-2.19 2.004-3.115 2.819-.403.355-.415.914-.033 1.267Z"
        />
    </Svg>
)
export default ConfirmIcon

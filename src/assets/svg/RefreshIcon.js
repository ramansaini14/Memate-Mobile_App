import * as React from "react"
import Svg, { Path } from "react-native-svg"

const RefreshIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            fill="#6C9ADE"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm12.74 0a4.74 4.74 0 0 0-9.07-1.928l-.267-.514a.667.667 0 0 0-1.182.616l1.112 2.134a.667.667 0 0 0 .9.283l2.13-1.111a.667.667 0 1 0-.616-1.182l-.927.483a3.406 3.406 0 1 1 .77 3.63.666.666 0 1 0-.943.942A4.742 4.742 0 0 0 12.74 8Z"
        />
    </Svg>
)
export default RefreshIcon

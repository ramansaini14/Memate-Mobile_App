import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const SendIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Rect width={40} height={40} fill="#191C1F" rx={20} />
        <Path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m15.4 14.32 8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-.84-2.52-2.52-.84c-5.71-1.9-5.71-5.01 0-6.92ZM18.11 21.65l3.58-3.59"
        />
    </Svg>
)
export default SendIcon

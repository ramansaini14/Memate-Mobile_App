import * as React from "react"
import Svg, { Path } from "react-native-svg"

const AddCalendar = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M8 2v3M16 2v3M3.5 9.09h17M18 23a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM19.49 19.05h-2.98M18 17.59v2.99"
        />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M21 8.5v7.86c-.73-.83-1.8-1.36-3-1.36-2.21 0-4 1.79-4 4 0 .75.21 1.46.58 2.06.21.36.48.68.79.94H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"
        />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.995 13.7h.01M8.294 13.7h.01M8.294 16.7h.01"
        />
    </Svg>
)
export default AddCalendar

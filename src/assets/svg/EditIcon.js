import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const EditIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Rect width={39} height={39} x={0.5} y={0.5} stroke="#E9EBEE" rx={19.5} />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="m21.991 13.271-7.88 7.88c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0Z"
        />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M20.861 14.401a7.144 7.144 0 0 0 4.94 4.94"
        />
    </Svg>
)
export default EditIcon

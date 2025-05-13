import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CopyIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            stroke="#292D32"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.333 8.933v2c0 2.667-1.067 3.734-3.733 3.734H5.066c-2.666 0-3.733-1.067-3.733-3.734V8.4c0-2.667 1.067-3.733 3.733-3.733h2"
        />
        <Path
            stroke="#292D32"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.333 8.933H9.2c-1.6 0-2.134-.533-2.134-2.133V4.667l4.267 4.266ZM7.733 1.333H10.4M4.667 3.333c0-1.106.893-2 2-2h1.747M14.666 5.333V9.46c0 1.033-.84 1.873-1.873 1.873"
        />
        <Path
            stroke="#292D32"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14.667 5.333h-2c-1.5 0-2-.5-2-2v-2l4 4Z"
        />
    </Svg>
)
export default CopyIcon

import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const BagIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Rect width={50} height={50} fill="#DAFD90" rx={25} />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M21 35h8c4.02 0 4.74-1.61 4.95-3.57l.75-8c.27-2.44-.43-4.43-4.7-4.43H20c-4.27 0-4.97 1.99-4.7 4.43l.75 8c.21 1.96.93 3.57 4.95 3.57ZM21 19v-.8c0-1.77 0-3.2 3.2-3.2h1.6c3.2 0 3.2 1.43 3.2 3.2v.8"
        />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M27 26v1.02c0 1.09-.01 1.98-2 1.98-1.98 0-2-.88-2-1.97V26c0-1 0-1 1-1h2c1 0 1 0 1 1ZM34.65 24A16.484 16.484 0 0 1 27 27.02M15.62 24.27c2.25 1.54 4.79 2.47 7.38 2.76"
        />
    </Svg>
)
export default BagIcon

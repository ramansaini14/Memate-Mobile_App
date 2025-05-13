import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CalendarUnavailability = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#191C1F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M11.166 2.667v4M21.834 2.667v4M5.167 12.12h22.666M28.5 11.333v11.334c0 4-2 6.666-6.667 6.666H11.167c-4.667 0-6.667-2.666-6.667-6.666V11.333c0-4 2-6.666 6.667-6.666h10.666c4.667 0 6.667 2.666 6.667 6.666Z"
    />
    <Path
      stroke="#191C1F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21.426 18.267h.012M21.426 22.267h.012M16.494 18.267h.012M16.494 22.267h.012M11.56 18.267h.011M11.56 22.267h.011"
    />
  </Svg>
)
export default CalendarUnavailability

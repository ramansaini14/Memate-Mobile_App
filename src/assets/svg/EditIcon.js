import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const EditIcon = (props) => (
 <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={40} height={40} rx={20} fill="white" />
    <Path
      d="M21.9911 14.2712L14.1111 22.1512C13.8111 22.4512 13.5111 23.0412 13.4511 23.4712L13.0211 26.4812C12.8611 27.5712 13.6311 28.3312 14.7211 28.1812L17.7311 27.7512C18.1511 27.6912 18.7411 27.3912 19.0511 27.0912L26.9311 19.2112C28.2911 17.8512 28.9311 16.2712 26.9311 14.2712C24.9311 12.2712 23.3511 12.9112 21.9911 14.2712Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.8613 15.4014C21.5313 17.7914 23.4013 19.6614 25.8013 20.3414"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>

)
export default EditIcon

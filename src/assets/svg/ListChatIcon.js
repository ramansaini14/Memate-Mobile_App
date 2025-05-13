import * as React from 'react';
const ListChatIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}>
    <rect width={32} height={32} fill="#fff" rx={16} />
    <path
      stroke="#191C1F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M13.667 21.667h-.334c-2.666 0-4-.667-4-4v-3.334c0-2.666 1.334-4 4-4h5.334c2.666 0 4 1.334 4 4v3.334c0 2.666-1.334 4-4 4h-.334c-.206 0-.406.1-.533.266l-1 1.334c-.44.586-1.16.586-1.6 0l-1-1.334a.753.753 0 0 0-.533-.266Z"
    />
    <path
      stroke="#191C1F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.667 14.333h6.666M12.667 17.667h4"
    />
  </svg>
);
export default ListChatIcon;

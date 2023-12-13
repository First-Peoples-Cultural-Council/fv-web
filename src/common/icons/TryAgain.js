import React from 'react'
import PropTypes from 'prop-types'

function TryAgain({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <title>Try Again</title>
      <g fillRule="evenodd">
        <path d="m996.41 913.3h-0.0625l-163.31 0.30469c-19.488 0.035157-35.266 15.867-35.23 35.363 0.035156 19.469 15.832 35.223 35.293 35.223h0.0625l72.859-0.13281c-36.422 28.855-76.477 52.312-119.78 69.785-182.56 73.848-390.56 31.547-529.89-107.8-139.02-139.03-181.42-346.78-108-529.26 7.2773-18.086-1.4805-38.648-19.566-45.918-18.078-7.2617-38.641 1.4805-45.918 19.566-83.992 208.79-35.484 446.46 123.57 605.53 107.34 107.34 250.29 164.35 396 164.35 70.688 0 142.03-13.418 210.25-41.027 54.035-21.797 103.69-51.672 148.28-88.898l-0.16406 86.555c-0.035157 19.496 15.734 35.328 35.23 35.363h0.0625c19.461 0 35.258-15.754 35.293-35.223l0.3125-168.42c0.015625-9.3867-3.6992-18.387-10.336-25.023-6.6055-6.625-15.586-10.34-24.945-10.34z" />
        <path d="m999.59 202.81c-159.43-159.43-397.41-207.83-606.25-123.33-54.027 21.789-103.68 51.664-148.28 88.898l0.16406-86.555c0.035156-19.496-15.734-35.328-35.23-35.363h-0.0625c-19.461 0-35.258 15.754-35.293 35.223l-0.3125 168.42c-0.015626 9.3867 3.6992 18.387 10.336 25.023 6.6211 6.6211 15.594 10.34 24.961 10.34h0.0625l163.31-0.30469c19.488-0.035156 35.266-15.867 35.23-35.363-0.035156-19.469-15.832-35.223-35.293-35.223h-0.0625l-72.859 0.13281c36.43-28.863 76.48-52.32 119.78-69.785 182.54-73.863 390.54-31.547 529.88 107.8 139.02 139.02 181.42 346.77 108 529.26-7.2773 18.086 1.4805 38.648 19.566 45.918 4.3203 1.7383 8.7734 2.5547 13.164 2.5547 13.977 0 27.211-8.3633 32.754-22.129 83.984-208.78 35.484-446.45-123.58-605.52z" />
      </g>
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
TryAgain.propTypes = {
  styling: string,
}

export default TryAgain
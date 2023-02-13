import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

type Props = {
  type: string
  className?: string
  onClick?: () => void
}

function Icon({ type, className, onClick }: Props) {
  return (
    <svg
      className={classNames('icon', className)}
      aria-hidden="true"
      onClick={onClick}
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
}

export default Icon

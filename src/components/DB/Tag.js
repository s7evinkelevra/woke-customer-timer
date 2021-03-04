import React from 'react';

// TODO(Jan): allow for custom styling/make this more reusable for tags throughout the app
const Tag = ({ tag, count, active, toggleActive = () => { }, ...props }) => {

  const badgeClasses = `btn badge badge-${active ? "secondary" : "light"} rounded pr-2 pl-2 py-2 mb-2 mr-2`

  return (
    <a onClick={() => { toggleActive(tag) }} key={tag} className={badgeClasses}>
      {tag}
      {count &&
        <span className="text-white rounded bg-info px-1 ml-2">{count}</span>}
    </a>
  )
}

export default Tag
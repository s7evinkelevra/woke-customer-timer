import React, { useState } from 'react';
import _ from 'lodash';

import * as SPECIALTAGS from '../../config/specialTags';
import { useStickies } from './helper';


const Tag = ({ tag, count, active, toggleActive = () => {}, ...props }) => {

  const badgeClasses = `btn badge badge-${active ? "secondary" : "light"} rounded pr-2 pl-2 py-2 mb-2 mr-2`

  return (
    <a onClick={ () => {toggleActive(tag)} } key={tag} className={badgeClasses}>
      {tag}
      {count && 
        <span className="text-white rounded bg-info px-1 ml-2">{count}</span>}
    </a>
  )
}


const TagSelection = (props) => {
  const { stickiesRef, tagFilter, setTagFilter } = useStickies();


  const toggleTag = (tag) => {
    const toggledTags = _.xor(tagFilter,[tag])
    setTagFilter(toggledTags);
  }

  console.log(tagFilter);

  const stickies = stickiesRef.docs.map((doc) => (doc.data()));
  const tagCounts = _.chain(stickies).map((sticky) => (sticky.tags || [SPECIALTAGS.NOTAG])).flatten().countBy().value();

  const generatedTags = Object.keys(tagCounts).map((tag) => {
    return <Tag key={tag} tag={tag} count={tagCounts[tag]} active={tagFilter.includes(tag)} toggleActive={toggleTag} />
  })
  
  return (
    <React.Fragment>
      {generatedTags}
    </React.Fragment>
  )
}


export default TagSelection;
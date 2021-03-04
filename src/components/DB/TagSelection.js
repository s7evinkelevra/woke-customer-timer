import React, { useState } from 'react';
import _ from 'lodash';

import Tag from './Tag';
import * as SPECIALTAGS from '../../config/specialTags';
import { useStickies } from './helper';

const TagSelection = (props) => {
  const { stickiesRef, tagFilter, setTagFilter } = useStickies();


  const toggleTag = (tag) => {
    const toggledTags = _.xor(tagFilter,[tag])
    setTagFilter(toggledTags);
  }

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
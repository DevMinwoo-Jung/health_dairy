import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import Reps from './Reps'
import shortid from 'shortid'
import { COLOR_DBE2EF } from 'libs/css/color'

type PostContentProps = {
  post: Object;
  index: number;
};

export type postType = {
  date: number;
  exercises: [];
  id: number
};


const PostContainer = styled.div`
  text-align: left;
  font-weight: bolder;
  display: block;
  width: 100%;
  & h2 {
    font-weight: bolder;
    font-size: 1.5rem;
    cursor: pointer;
    width: 100%;
    border-radius: 5px;
    background-color: ${COLOR_DBE2EF};
    padding-left: 1rem;
  }
`

const RepsContainer = styled.div`
  display: block;
  transition: opacity 300ms ease-in;
`


const PostContent: FC<PostContentProps> = (props) => {
  const post:postType = props.post
  const { index } = props
  const [showReps, setShowReps] = useState(false)

  useEffect(() => {
    if (index === 0) {
      setShowReps(true)
    }
  }, [])

  const onToggleReps = () => {
    setShowReps((prev) => !prev)
  }

  return (
      <PostContainer>
        <div onClick={onToggleReps}>
          <h2>{post.date}</h2>
        </div>
        {
          showReps
          ?
          <RepsContainer>
              {
                post.exercises.map((element, index) => {
                  return (
                    <Reps key={shortid.generate()} exercise={element}/>
                  )
                })
              }
          </RepsContainer>
          :
          null
        }
      </PostContainer>
  );
};

export default PostContent;

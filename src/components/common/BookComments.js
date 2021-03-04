import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import moment from "moment"

import {Button, Input} from './index'

const CommentForm = styled.form`
  display: flex;
  margin-top: 3rem;

  ${Input}{
    margin-right: 1rem;

    margin-top: auto;
    margin-bottom: auto;
  }
  ${Button}{
    margin-top: auto;
    margin-bottom: auto;
  }
`

const CommentListItem = styled.div`
  >strong{
    font-size: 80%;
    color: #666
  }

  border-bottom: 1px solid #ddd;
  padding: 1rem 0px;
  
`

export const BookComments = ({firebase, bookId, user}) => {

  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')

  function handlePostCommentSubmit(e) {
    e.preventDefault()
    firebase.postComment({
      text: commentText,
      bookId,
    })
  }

  useEffect(() => {
    const unsubscribe = firebase.subscribeToBookComments({
      bookId,
      onSnapshot: snapshot => {
        const snapshotComments = []
        snapshot.forEach(doc => {
          snapshotComments.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setComments(snapshotComments)
      },
    })


    return () => {
      if(unsubscribe){
        unsubscribe();
      }
    } 
  }, []);

  return(
    <div>
      {!! user &&
      <CommentForm onSubmit={handlePostCommentSubmit}>
          <Input value={commentText} onChange={e => {
            e.persist();
            setCommentText(e.target.value);
            }
          }/>
          <Button type="submit">
            Post Comment
          </Button>
      </CommentForm>
      }

      {comments.map(comment => (
        <CommentListItem key={comment.id}> 
          <strong>
            {comment.username} - {moment(comment.dateCreated.toDate()).format('HH:mm Do MMM YYYY')}
          </strong>
          <div>
            {comment.text}
          </div>
        </CommentListItem>
      ))}
    </div>
  );
}
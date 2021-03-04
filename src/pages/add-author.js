import React, {useState, useContext} from 'react';
import {Form, Input, Button} from '../components/common'
import {FirebaseContext} from '../components/Firebase'
import styled from 'styled-components'

const SuccessMessage = styled.div`
  margin-top: 1rem;
  color: green;
`

const AddAuthor = () => {
  const {firebase} = useContext(FirebaseContext);
  const [authorName, setAuthorName] = useState('')
  const [success, SetSuccess] = useState(false)

  function handleSubmit(e){
    e.preventDefault();


    firebase.createAuthor({
      authorName
    }).then(() => {
      setAuthorName('')
      SetSuccess(true);
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input onChange={e => {
        e.persist();
        SetSuccess(false)
        setAuthorName(e.target.value)
      }} value={authorName} placeholder="author name" />
      <Button type="submit" block>
        Add New Author
      </Button>
      {!!success &&
        <SuccessMessage>
          Author Created Successfully!!
        </SuccessMessage>
      }
    </Form>
  );
}

export default AddAuthor
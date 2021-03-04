import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from '../components/Firebase'
import {Form, Input, Button} from '../components/common'
import styled from 'styled-components'

const FormField = styled.div`
  margin-bottom: 20px;
`

const SuccessMessage = styled.div`
  margin-top: 1rem;
  color: green;
`

let fileReader;
if(typeof windows !== 'undefined'){
  fileReader = new FileReader();
}

const AddBook = () => {
  const {firebase} = useContext(FirebaseContext);
  const [authors, setAuthors] = useState([])
  const [bookCover, setBookCover] = useState('')
  const [bookName, setBookName] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [summary, setSummary] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fileReader.addEventListener('load', () => {
      setBookCover(fileReader.result);
    })
  }, [])

  useEffect(() => {
    if(firebase){
      firebase.getAuthors().then(snapshot => {
        const availableAuthors = []

        snapshot.forEach(doc => {
          availableAuthors.push({
            id: doc.id,
            ...doc.data()
          })
        })

        setAuthorId(availableAuthors[0].id)

        setAuthors(availableAuthors)
      })
    }
  }, [firebase])

  return (<Form onSubmit={e => {
    e.preventDefault();

    firebase.createBook({
      bookCover,
      bookName,
      authorId,
      summary
    }).then(() => {
      setSuccess(true);
    })
  }}>
    <FormField>
      <Input onChange={e => {
        e.persist()
        setSuccess(false);
        setBookName(e.target.value)
      }}
      value={bookName}
      placeholder="Book Name"/>
    </FormField>
    <FormField>
      <strong>
        Author
      </strong>
      <div>
        <select onChange={e => {
        e.persist()
        setSuccess(false);
        setAuthorId(e.target.value)
      }}
      value={authorId}>
          {authors.map(a => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
    </FormField>
    <FormField>
      <strong>
        Book Cover
      </strong>
      <Input type="file" onChange={e => {
        e.persist()
        setSuccess(false);
        fileReader.readAsDataURL(e.target.files[0])
      }}/>
    </FormField>
    <FormField>
      <strong>
        Summary
      </strong>
      <Input onChange={e => {
        e.persist()
        setSuccess(false);
        setSummary(e.target.value)
      }}
      value={summary}
      placeholder="Book Summary"
      />
    </FormField>
    <Button block type="submit">
        Add new book
    </Button>
    {!!success &&
      <SuccessMessage>
        New Book Added Successfully
      </SuccessMessage>
    }
  </Form>)
}

export default AddBook
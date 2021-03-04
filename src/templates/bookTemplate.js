import React, {useContext} from 'react';
import BookItem from '../components/BookItem'
import { graphql } from "gatsby"
import {BookComments} from '../components/common'
import { FirebaseContext } from '../components/Firebase'
  
const BookTemplate = (props) => {

  const {firebase, user} = useContext(FirebaseContext);

  console.log("Firebase in template:" + firebase);

  return (
    <section>
      <BookItem 
      bookTitle={props.data.book.title} 
      bookSummary={props.data.book.summary}
      bookCover={props.data.book.localImage.childImageSharp.fixed}
      authorName={props.data.book.author.name}
      />
      <BookComments firebase={firebase} bookId={props.data.book.id} user={user} />
    </section>
  )
}

export const query = graphql`
  query BookQuery($bookId: String!) {
    book(id: {eq: $bookId}){
      id
      title
      localImage{
        childImageSharp	{
          fixed(width: 200){ 
            ...GatsbyImageSharpFixed
          }
        }
      }
      summary
      author {
        name
      }
    }
  }
`

export default BookTemplate
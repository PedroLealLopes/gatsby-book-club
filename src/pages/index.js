import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import BookItem from '../components/BookItem'

const LinkButton = styled.div`
  text-align: right;
  
  a{
    transition: 0.3s ease;
    padding: .60rem;
    background-color: rebeccapurple;
    color: white;
    border-radius: 1rem;
    text-decoration: none;
    
    &:hover{
      background-color: indigo;
    }
  }
  
`;

const IndexPage = (props) => {
  console.log(props)
  return (
  <section>
    {props.data.allBook.edges.map(edge => (
      <BookItem 
      bookTitle={edge.node.title}
      bookSummary={edge.node.summary}
      bookCover={edge.node.localImage.childImageSharp.fixed}
      authorName={edge.node.author.name}
      key={edge.node.id}>
        <LinkButton>
          <Link to={`/book/${edge.node.id}`}>
            Join Conversation
          </Link>
        </LinkButton>
      </BookItem>
    ))}
  </section>
);
}
export const query = graphql`
  query GetAllBooks {
  allBook {
    edges {
      node {
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
  }
}
`

export default IndexPage

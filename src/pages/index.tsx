import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),

});

export default function Main({data}) {
    return <div>{data.books.length} книги
        {data.books.map(book => (<div>{book.title} - {book.author}</div>))}
    </div>
}

export async function getServerSideProps() {
    const QUERY_LAUNCH_LIST = gql`
        query GetBooks {
            books {
                title
                author
            }
        }
    `;

    const { data } = await client.query({
        query: QUERY_LAUNCH_LIST,
      });

    return {
        props: {
          data
        }
    };
}

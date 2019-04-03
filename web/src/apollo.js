import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
//import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'

const options = {
  uri: "http://openflutter.com/graphql",
}

const httpLink = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  createUploadLink(options),
  new HttpLink(options)
)

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default client

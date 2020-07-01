import gql from "graphql-tag";
import client from '../client';

const mutationSignIn = (username: string, password: string) => {
  return client.mutate({
    variables: { username, password },
    mutation: gql`
      mutation SignIn(
        $username: String!,
        $password: String!
      ) {
        signIn(username: $username, password: $password) {
          success
          token
        }
      }
    `
  });
}

const mutationSignUp = (username: string, password: string) => {
  return client.mutate({
    variables: { username, password },
    mutation: gql`
      mutation SignUp(
        $username: String!,
        $password: String!
      ) {
        signUp(username: $username, password: $password) {
          success
          token
        }
      }
    `
  });
}

const queryTodoList = () => {
  return client.query({
    query: gql`
      {
        todoList {
          id
          content
          completed
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
}

const mutationAddTodo = (content: string) => {
  return client.mutate({
    variables: { content },
    mutation: gql`
      mutation AddTodo(
        $content: String!
      ) {
        addTodo(content: $content) {
          success
          todoList {
            id
            content
            completed
          }
        }
      }
    `
  });
}

const mutationDeleteTodo = (id: string) => {
  return client.mutate({
    variables: { id },
    mutation: gql`
      mutation DeleteTodo(
        $id: ID!
      ) {
        deleteTodo(id: $id) {
          success
          todoList {
            id
            content
            completed
          }
        }
      }
    `
  });
}

const mutationChangeCompleted = (id: string) => {
  return client.mutate({
    variables: { id },
    mutation: gql`
      mutation ChangeCompleted(
        $id: ID!
      ) {
        changeCompleted(id: $id) {
          success
          todoList {
            id
            content
            completed
          }
        }
      }
    `
  });
}

const mutationEditTodo = (id: string, content: string) => {
  return client.mutate({
    variables: { id, content },
    mutation: gql`
      mutation EditTodo(
        $id: ID!,
        $content: String!
      ) {
        editTodo(id: $id, content: $content) {
          success
          todoList {
            id
            content
            completed
          }
        }
      }
    `
  });
}

export {
  mutationSignIn,
  mutationSignUp,
  queryTodoList,
  mutationAddTodo,
  mutationDeleteTodo,
  mutationChangeCompleted,
  mutationEditTodo
};
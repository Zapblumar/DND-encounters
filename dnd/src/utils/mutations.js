import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
        character  {
          _id
          race
          class
          hp
          stat
          notes
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($userName: String!, $email: String!, $password: String!) {
    addUser(userName: $userName, email: $email, password: $password) {
      token
      user {
        _id
        userName
        character  {
          _id
          race
          class
          hp
          stat
          notes
        }
      }
    }
  }
`;

export const ADD_CHARACTER = gql`
  mutation createCharacter($character: CharacterInput!) {
    createCharacter(character: $character) {
      _id
      character  {
        _id
        race
        class
            hp
        stat
        notes
      }
    }
  }
`;



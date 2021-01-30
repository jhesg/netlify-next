import find from 'lodash/find';
import filter from 'lodash/filter';

type Author = {
  id: number
  firstName: string
  lastName: string
}

type Post = {
  id: number
  authorId: number
  title: string
  votes: number
}

const authors: Author[] = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts: Post[] = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

const resolvers = {
  Query: {
    posts: (): Post[] => posts,
    author: (_: any, { id }): Author => find(authors, { id }),
  },

  Mutation: {
    upvotePost: (_: any, { postId }): Post => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },

  Author: {
    posts: (author: Author): Post[] => filter(posts, { authorId: author.id }),
  },

  Post: {
    author: (post: Post): Author => find(authors, { id: post.authorId }),
  },
};

export default resolvers;

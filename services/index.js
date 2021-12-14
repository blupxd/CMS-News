import { request, gql} from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection { 
            edges {
                node { 
                createdAt
                slug
                title
                tag
                excerpt
                featuredimage {
                    url
                }
                categories {
                    name
                    slug
                }
                }
            }
            }
        }
    `

    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges;
};


export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug }){
                createdAt
                slug
                title
                excerpt
                featuredimage {
                    url
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                }
            }
        }
    `

    const result = await request(graphqlAPI, query, { slug });

    return result.post;
};

export const getAllPosts = async() => {
    const query = gql`
        query getLastPostDetails(){
            posts{
                    title
                    tag
                    excerpt
                    featuredimage {
                        url
                    }
                    createdAt
                    slug
                    categories {
                        name
                        slug
                    }
                }
        }
    `
    const result = await request(graphqlAPI, query)

    return result.posts;
}

export const getRecentPosts = async() => {
    const query = gql`
        query GetPostDetails(){
            posts(
                orderBy: createdAt_ASC
                last: 3
                ) {
                    title
                    excerpt
                    featuredimage {
                        url
                    }
                    createdAt
                    slug
                }
        }
    `
    const result = await request(graphqlAPI, query)

    return result.posts;
}

export const getLatestPost = async() => {
    const query = gql`
        query getLastPostDetails(){
            posts(
                orderBy: createdAt_ASC
                last: 3
                ) {
                    title
                    tag
                    excerpt
                    featuredimage {
                        url
                    }
                    categories {
                        name
                        slug
                    }
                    createdAt
                    slug 
                }
        }
    `
    const result = await request(graphqlAPI, query)

    return result.posts;
}
export const getLatestPosts = async() => {
    const query = gql`
        query getLastPostDetails(){
            posts(
                orderBy: createdAt_ASC
                ) {
                    title
                    tag
                    excerpt
                    featuredimage {
                        url
                    }
                    categories {
                        name
                        slug
                    }
                    createdAt
                    slug 
                }
        }
    `
    const result = await request(graphqlAPI, query)

    return result.posts;
}

export const getSimilarPosts = async(categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories}}}
                last: 3
            ){
                title
                featuredimage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query, {categories,slug});

    return result.posts;
}


export const getCategories = async( ) => {
    const query = gql`
        query GetCategories {
            posts(
                last: 3
            ){
                title
                featuredimage {
                    url
                }
                createdAt
                slug
            }
            categories {
                name
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query)

    return result.categories;
}

export const getCategoryPost = async (slug) => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {categories_some: {slug: $slug}}) {
          edges {
            cursor
            node {
              createdAt
              slug
              title
              excerpt
              featuredimage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.postsConnection.edges;
}
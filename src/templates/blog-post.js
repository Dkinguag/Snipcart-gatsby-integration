import React from "react"
import { Link, graphql } from "gatsby"
import Helmet from 'react-helmet' ;

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
      <Helmet htmlAttributes={{ lang: 'en' }}>
          <title>${siteTitle}</title>
          <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
          <script src="https://cdn.snipcart.com/scripts/2.0/snipcart.js" id="snipcart" data-api-key="NTU5MTlhMDUtNTkwNi00ZDNjLTk1ZGItZmZkODc4NmZmMDE5NjM3MDcxMzc4MTU4ODczMDI5"></script>
          <link href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css" type="text/css" rel="stylesheet" />

      </Helmet>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <div
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
            <img src={post.frontmatter.image} alt={post.frontmatter.title}></img>

            <div dangerouslySetInnerHTML={{ __html: post.html }} />

            <button
                      className='snipcart-add-item buyBtn'
                      data-item-id={post.frontmatter.id}
                      data-item-price={post.frontmatter.price}
                      data-item-image={post.frontmatter.image}
                      data-item-name={post.frontmatter.title}
                      data-item-description={post.frontmatter.description}
                      data-item-url={"http://snipcart-gatsby.netlify.com" + post.frontmatter.path}>
  Buy
          </button>
            </div>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        price
        id
        path
        description
        image {
          name
          src
        }
        customFields {
          name
          values
        }
      }
    }
  }
`

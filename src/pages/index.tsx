import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import blogPostList from '@generated/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Database Management System documentation and dashboard">
      <header className="hero hero--primary">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>

      <main>
        <section className="margin-vert--lg">
          <div className="container">
            <h3 style={{ marginBottom: '1rem' }}>Latest Posts</h3>

            <div className="row" style={{ marginTop: 16 }}>
              {(blogPostList.items ?? []).slice(0, 3).map((post) => (
                <div className="col col--4" key={post.permalink} style={{ marginBottom: 24 }}>
                  <article className="card card--shadow--md" style={{ minHeight: 200 }}>
                    <div className="card__body">
                      <h4>
                        <Link to={post.permalink}>{post.title}</Link>
                      </h4>
                      <p style={{ color: '#6a7180', marginBottom: '0.75rem' }}>
                        {new Date(post.date).toLocaleDateString(undefined, {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </p>
                      <Link className="button button--secondary" to={post.permalink}>
                        Read Post
                      </Link>
                    </div>
                  </article>
                </div>
              ))}

              {(blogPostList.items ?? []).length === 0 && (
                <div className="col col--12">
                  <div className="alert alert--info">No blog posts found yet. Add a post under <code>blog/</code>.</div>
                </div>
              )}
            </div>

            <p>
              For the full archive, go to the <Link to="/blog">blog page</Link>.
            </p>
          </div>
        </section>

        <HomepageFeatures />
      </main>
    </Layout>
  );
}

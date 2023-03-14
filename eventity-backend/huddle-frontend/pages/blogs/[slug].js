import React from "react";
import Layout from "../../components/global/layout";
import InnerPageLayout from "../../components/inner-page-layout";
import { API_URL } from "../../config";
import { BiUser } from "react-icons/bi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaRegCalendarAlt,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import md from "markdown-it";

const BlogDetails = ({ blogs, slug }) => {
  const blog = blogs?.filter((evt) => evt?.attributes?.slug === slug);
  const { image, title, description, user,  } = blog[0]?.attributes;
  return (
    <Layout title={title}>
      <InnerPageLayout title={title} />
      <div className="section-padding single-blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-4 mx-auto">
              <article>
                <img
                  className="img-fluid rounded single-blog__image"
                  src={`${API_URL}${image?.data?.attributes?.url}`}
                  alt=""
                />

                <ul className="single-blog__metainfo">
                  <li>
                    <BiUser />
                    <Link href="/#">{user.data.attributes.username}</Link>
                  </li>
                  <li>
                    <FaRegCalendarAlt />
                    {blog[0]?.attributes?.user?.data?.attributes.createdAt.slice(0, 10)}
                  </li>
                </ul>
                <h2 className="display-5 single-blog__title">
                  {title}
                </h2>
                <div className="single-blog__para">
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: md().render(description),
                    }}
                  />
                </div>
              </article>
              <div className="single-blog__share p-4">
                <strong>Share the blog on:</strong>
                <ul className="social-icon">
                  <li>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=https://huddle-next-js.vercel.app/blogs/${slug}`}
                      target="_blank"
                    >
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={`https://twitter.com/intent/tweet?source=https%3A%2F%2Fhuddle-next-js.vercel.app%2Fblogs%2F${slug}%2F&text=${title}:https%3A%2F%2Fhuddle-next-js.vercel.app%2Fblogs%2F${slug}%2F`}>
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={`https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fhuddle-next-js.vercel.app%2Fblogs%2F${slug}%2F&title=${title}`}>
                      <FaLinkedinIn />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetails;

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/blogs?populate=*`);
  const allBlogs = await res.json();
  const blogs = allBlogs.data;

  return {
    props: {
      blogs,
      slug,
    },
  };
}

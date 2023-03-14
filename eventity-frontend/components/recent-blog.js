import React from "react";
import { RiTimeFill } from "react-icons/ri";
import { HiShare } from "react-icons/hi";
import Link from "next/link";
import { API_URL } from "../config";
import SectionTitle from "./global/section-title";

const RecentBlog = ({ blogs }) => {
  return (
    <>
      <div className="blog section-padding">
        <div className="container">
          <SectionTitle title="Recent Blogs" />
          <div className="row">
            {blogs?.map((evt) => (
              <div key={evt.id} className="col-md-6 col-lg-4 mb-4">
                <article className="blog__single-post h-100 translateEffect1">
                  <div className="blog__single-post__image">
                    <Link href={`/blogs/${evt?.attributes?.slug}`}>
                      <img
                        className="img-fluid"
                        src={`${API_URL}${evt.attributes?.image?.data?.attributes?.url}`}
                        alt="Blog 01"
                      />
                    </Link>
                  </div>
                  <div className="blog__single-post__body">
                    <div className="blog__single-post__content">
                      <h2 className="fs-4">
                        <Link href={`/blogs/${evt?.attributes?.slug}`}>
                          {evt.attributes.title}
                        </Link>
                      </h2>
                      <p className="m-0">
                        {evt.attributes.description.slice(0, 95)}..
                      </p>
                    </div>
                    <div className="blog__single-post__meta">
                      <div className="d-flex gap-2 align-items-center">
                        <RiTimeFill />
                        18-03-2023
                      </div>
                      <ul>
                        <li>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=https://huddle-next-js.vercel.app/blogs/${evt?.attributes?.slug}`}
                            target="_blank"
                          >
                            <HiShare />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentBlog;

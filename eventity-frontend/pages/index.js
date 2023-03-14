import { Inter } from "@next/font/google";
import Hero from "../components/hero";
import Layout from "../components/global/layout";
import UpcomingEvents from "../components/upcoming-events";
import HowItWorks from "../components/how-it-works";
import FeaturedEvents from "../components/featured-events";
import Testimonial from "../components/testimonial";
import { API_URL } from "../config";
import RecentBlog from "../components/recent-blog";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ events, blogs }) {
  const eventsData = events.data;
  const blogsData = blogs.data;
  return (
    <Layout title="huddle">
      <Hero />
      <UpcomingEvents events={eventsData} />
      <HowItWorks />
      <FeaturedEvents events={eventsData} />
      <Testimonial />
      <RecentBlog blogs={blogsData} />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const events = await res.json();
  const blogData = await fetch(`${API_URL}/api/blogs?populate=*`);
  const blogs = await blogData.json();

  return {
    props: { events, blogs }
  };
}

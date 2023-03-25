import {Inter} from "@next/font/google";
import Hero from "../components/hero";
import Layout from "../components/global/layout";
import UpcomingEvents from "../components/upcoming-events";
import FeaturedEvents from "../components/featured-events";
import {API_URL} from "../config";

const inter = Inter({subsets: ["latin"]});

export default function Home({events, blogs}) {
    const eventsData = events.data;
    const blogsData = blogs.data;
    return (

            <Layout title="Eventity.xyz | HomePage">
                <Hero/>
                <FeaturedEvents events={eventsData}/>
                <UpcomingEvents events={eventsData}/>
                {/*<HowItWorks/>*/}
                {/*<Testimonial/>*/}
                {/*<RecentBlog blogs={blogsData}/>*/}
            </Layout>
    );
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events?populate=*`);
    const events = await res.json();
    const blogData = await fetch(`${API_URL}/api/blogs?populate=*`);
    const blogs = await blogData.json();

    return {
        props: {events, blogs}
    };
}

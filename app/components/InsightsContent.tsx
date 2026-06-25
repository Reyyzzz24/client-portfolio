"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Post {
  id: number;
  title: string;
  description: string;
  image_url: string;
  date: string;
  read_more_link?: string;
}

interface InsightsContentProps {
  posts: Post[];
}

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.12,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function InsightsContent({
  posts,
}: InsightsContentProps) {
  const formatDate = (
    dateString: string
  ) => {
    return new Date(
      dateString
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      className="
        bg-white
        py-20
        px-6
        overflow-hidden
      "
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            text-4xl
            md:text-5xl
            font-bold
            text-center
            mb-16
          "
        >
          Latest Insights
        </motion.h2>

        {/* Posts */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-8
          "
        >
          {posts.map((post) => (
            <motion.article
              key={post.id}
              variants={card}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                group
                bg-white
                border
                border-gray-100
                rounded-3xl
                overflow-hidden
                shadow-sm
                hover:shadow-xl
              "
            >
              {/* Image */}
              <div className="h-52 overflow-hidden">
                <motion.img
                  src={post.image_url}
                  alt={post.title}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">
                  {formatDate(post.date)}
                </p>

                <h3
                  className="
                    text-xl
                    font-bold
                    mb-3
                    leading-snug
                  "
                >
                  {post.title}
                </h3>

                <p
                  className="
                    text-gray-500
                    text-sm
                    leading-relaxed
                    mb-5
                    line-clamp-3
                  "
                >
                  {post.description}
                </p>

                <motion.a
                  href={
                    post.read_more_link || "#"
                  }
                  whileHover={{
                    x: 4,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    text-sm
                    text-black
                  "
                >
                  Read More
                  <ArrowRight size={16} />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
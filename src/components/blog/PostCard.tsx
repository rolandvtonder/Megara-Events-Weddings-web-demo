import Link from "next/link";
import type { Post } from "@/data/posts";
import { Img } from "@/components/ui/Img";
import { cn, formatDate } from "@/lib/utils";

export function PostCard({ post, className, large }: { post: Post; className?: string; large?: boolean }) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/blog/${post.slug}`} className="block">
        <span className={cn("relative block overflow-hidden rounded-[6px] bg-sand", large ? "aspect-[16/11]" : "aspect-[4/3]")}>
          <Img id={post.image} alt="" sizes={large ? "(min-width:1024px) 55vw, 100vw" : "(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"} className="transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.05]" />
          <span className="micro absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1.5 text-ink">{post.category}</span>
        </span>
        <span className="micro mt-5 block text-mute">
          {formatDate(post.date)} · {post.readMins} min read
        </span>
        <h3 className={cn("mt-2 font-serif leading-[1.05]", large ? "text-[clamp(2.2rem,3.6vw,3.4rem)]" : "text-[2rem]")}>
          <span className="u-link">{post.title}</span>
        </h3>
        <p className="mt-3 max-w-xl leading-relaxed text-ink-2">{post.excerpt}</p>
      </Link>
    </article>
  );
}

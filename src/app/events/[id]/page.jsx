import { Suspense } from "react";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import EventBlogContent from "./EventBlogContent";
import "./event-blog.css";

// Generate static paths for export
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' }
  ];
}

export default function EventDetailPage() {
  return (
    <>
      <Nav />
      <Suspense fallback={<div>Loading...</div>}>
        <EventBlogContent />
      </Suspense>
      <ConditionalFooter />
    </>
  );
}

import { Suspense } from "react";
import Nav from "@/components/Nav/Nav";
import EventDetailContent from "./EventDetailContent";

// 이벤트 ID 목록 (실제 데이터 소스에서 가져와야 함)
const eventIds = [1, 2, 3, 4, 5, 6];

export function generateStaticParams() {
  return eventIds.map((id) => ({
    id: id.toString(),
  }));
}

export default function EventDetailPage({ params }) {
  return (
    <>
      <Nav />
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetailContent />
      </Suspense>
    </>
  );
}

import { Suspense } from "react";
import Nav from "@/components/Nav/Nav";
import EventDetailContent from "./EventDetailContent";

export default function ReservationPage() {
  return (
    <>
      <Nav />
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetailContent />
      </Suspense>
    </>
  );
}

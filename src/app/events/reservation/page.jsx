import { Suspense } from "react";
import EventDetailContent from "./EventDetailContent";

export default function ReservationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventDetailContent />
    </Suspense>
  );
}

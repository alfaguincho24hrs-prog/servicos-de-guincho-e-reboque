import { lazy, Suspense } from "react";

const TestimonialsCarousel = lazy(() =>
  import("./testimonials-carousel").then((m) => ({ default: m.TestimonialsCarousel }))
);

export function LazyTestimonialsCarousel(props: { citySeed?: string }) {
  return (
    <Suspense fallback={<div className="h-64" aria-hidden />}>
      <TestimonialsCarousel {...props} />
    </Suspense>
  );
}

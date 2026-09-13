"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const sections = [
  {
    id: "home",
    hash: "",
  },
  {
    id: "about",
    hash: "#about",
  },
  {
    id: "gallery",
    hash: "#gallery",
  },
  {
    id: "footer",
    hash: "#footer",
  },
];

export default function ScrollSectionTracker() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionElements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleSections.length) return;

        const visibleId = visibleSections[0].target.id;

        const section = sections.find((section) => section.id === visibleId);

        if (!section) return;

        const newUrl = section.hash ? `${pathname}${section.hash}` : pathname;

        if (window.location.pathname + window.location.hash !== newUrl) {
          router.replace(newUrl, { scroll: false });
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-20% 0px -20% 0px",
      },
    );

    sectionElements.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [pathname, router]);

  return null;
}

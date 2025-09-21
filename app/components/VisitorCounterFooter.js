"use client";
import { useState, useEffect } from "react";

export default function VisitorCounterFooter() {
  const [visitorCount, setVisitorCount] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const count = Number(window.localStorage.getItem("siteVisitorCount") || "0") + 1;
      window.localStorage.setItem("siteVisitorCount", count);
      setVisitorCount(count);
    }
  }, []);
  return (
    <footer className="w-full text-center py-6 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 mt-12 rounded-t-2xl shadow-lg">
      <span className="text-lg font-semibold">Siteye toplam <b>{visitorCount}</b> kişi girdi.</span>
    </footer>
  );
}

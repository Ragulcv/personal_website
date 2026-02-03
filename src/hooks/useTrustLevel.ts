import { useState, useEffect, useCallback } from "react";

const MAX_TRUST = 100;
const MIN_TRUST = 10;
const SCROLL_THRESHOLDS = [0.25, 0.5, 0.75, 1];
const SCROLL_VALUES = [25, 45, 70, 100];
const CLICK_INCREMENT = 2;
const MAX_CLICKS = 5;

export function useTrustLevel() {
  const [trust, setTrust] = useState(MIN_TRUST);
  const [unlocked, setUnlocked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const addFromScroll = useCallback((scrollRatio: number) => {
    let value = MIN_TRUST;
    for (let i = 0; i < SCROLL_THRESHOLDS.length; i++) {
      if (scrollRatio >= SCROLL_THRESHOLDS[i]) value = SCROLL_VALUES[i];
    }
    setTrust((prev) => Math.max(prev, Math.min(value, MAX_TRUST)));
  }, []);

  const addFromClick = useCallback(() => {
    if (clickCount >= MAX_CLICKS) return;
    setClickCount((c) => c + 1);
    setTrust((prev) => Math.min(prev + CLICK_INCREMENT, MAX_TRUST));
  }, [clickCount]);

  useEffect(() => {
    if (trust >= MAX_TRUST) setUnlocked(true);
  }, [trust]);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const ratio = window.scrollY / scrollHeight;
      addFromScroll(ratio);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [addFromScroll]);

  return { trustPercent: Math.round(trust), unlocked, addFromClick };
}

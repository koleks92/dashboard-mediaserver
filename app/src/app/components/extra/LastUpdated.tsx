import { useEffect, useState } from "react";
import CustomText from "../UI/CustomText";

export default function LastUpdated({ lastUpdated }: { lastUpdated?: number }) {
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (lastUpdated === undefined) {
    return <CustomText>-</CustomText>;
  }

  const timePassed = Math.max(Math.floor((now - lastUpdated) / 1000), 0);

  let timePassedString: string = "";

  if (timePassed <= 5) {
    timePassedString = "Just now";
  } else if (timePassed <= 60) {
    timePassedString = timePassed + "s ago";
  } else if (timePassed <= 3600) {
    timePassedString = Math.floor(timePassed / 60) + "m ago";
  } else if (timePassed > 3600) {
    timePassedString = Math.floor(timePassed / 3600) + "h ago";
  }

  return <CustomText>{timePassedString}</CustomText>;
}

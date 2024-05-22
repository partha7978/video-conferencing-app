"use client";
import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCurrentDateNTime } from "../../../../hooks/useGetCurrentDateNTime";
import { useEffect } from "react";
import { useGetCalls } from "../../../../hooks/useGetCalls";
import { Call } from "@stream-io/video-react-sdk";

const Home = () => {
  const { date, time } = useGetCurrentDateNTime();
  const { upcomingCalls } = useGetCalls();
  console.log(upcomingCalls, "upcomingCalls");
  let upcomingCallDate;
  if (upcomingCalls && upcomingCalls.length > 0) {
    upcomingCallDate =
      upcomingCalls && upcomingCalls.length > 0
        ? (upcomingCalls[0] as Call)?.state?.startsAt?.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
        : null;
  } else {
    upcomingCallDate = null;
  }
  useEffect(() => {
    console.log(date, time);
  }, [date, time]);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[370px] rounded py-2 text-center text-base font-normal">
            {upcomingCallDate
              ? ` Upcoming Meeting: ${upcomingCallDate}`
              : `No Upcoming Meeting`}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;

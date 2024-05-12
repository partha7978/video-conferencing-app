"use client";
import Image from "next/image";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const homeCards = [
    {
      img: "/icons/add-meeting.svg",
      title: "New Meeting",
      description: "Start an instant meeting",
      handleClick: () => setMeetingState("isInstantMeeting"),
      className: "bg-orange-1",
    },
    {
      img: "/icons/schedule.svg",
      title: "Schedule Meeting",
      description: "Plan your meeting",
      handleClick: () => setMeetingState("isScheduleMeeting"),
      className: "bg-blue-1",
    },
    {
      img: "/icons/recordings.svg",
      title: "View Recordings",
      description: "Checkout your recordings",
      handleClick: () => router.push("/recordings"),
      className: "bg-purple-1",
    },
    {
      img: "/icons/join-meeting.svg",
      title: "Join Meeting",
      description: "Via invite link",
      handleClick: () => setMeetingState("isJoiningMeeting"),
      className: "bg-yellow-1",
    },
  ];

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if(!values.description) {
        router.push(`/meeting/${call.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {homeCards.map(({ img, title, description, handleClick, className }) => (
        <HomeCard
          key={title}
          img={img}
          title={title}
          description={description}
          handleClick={handleClick}
          className={className}
        />
      ))}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;

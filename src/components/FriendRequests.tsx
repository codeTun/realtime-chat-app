"use client";

import { FC, useState } from "react";
import { UserPlus } from "lucide-react";

interface IncomingFriendRequest {
  senderId: string;
  senderEmail: string;
  // Add other properties as needed
}

interface FriendRequestsProps {
  incomingFriendRequests?: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests = [],
  sessionId,
}) => {
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to show here...</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className="flex gap-4 items-center">
            <UserPlus className="text-black" />
            <p className="font-medium text-lg">{request.senderEmail}</p>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;

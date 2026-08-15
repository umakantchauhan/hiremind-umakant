"use client"

import { useUser } from "@clerk/nextjs";

export default function CandidateDashboard() {
    const { user } = useUser();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Candidate Dashboard</h1>
            {user && (
                <div>
                    <p>Welcome, {user.fullName}</p>
                    <p>Your role is: {user.unsafeMetadata.role as string}</p>
                </div>
            )}
        </div>
    );
}
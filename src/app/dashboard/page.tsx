"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && user) {
            const role = user.unsafeMetadata.role;
            if (role === "recruiter") {
                router.replace("/recruiter");
            } else if (role === "candidate") {
                router.replace("/candidate");
            } else {
                // Handle cases where role is not set, maybe redirect to a role selection page or home
                router.replace("/");
            }
        }
    }, [isLoaded, user, router]);

    // Display a loading state while Clerk is loading the user session
    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return null; // or a more sophisticated loading component
}
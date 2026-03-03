'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "@/store/userSlice";

export default function ReduxSync() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
 

  useEffect(() => {
    // Check if we are authenticated and the user object exists
    
    if (status === "authenticated" && session?.user) {
      console.log("Syncing Session to Redux:", session.user);
      
      dispatch(setUser({
        id: session.user.id,        // From your return { id: ... }  
        email: session.user.email!,
        role: session.user.role     // From your return { role: ... }
      }));
    } else if (status === "unauthenticated") {
      dispatch(logoutUser());
    }
  }, [session, status, dispatch]);

  return null; 
}
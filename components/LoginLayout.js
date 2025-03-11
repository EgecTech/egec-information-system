// components/LoginLayouts.js
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function LoginLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="full-h flex flex-center">
        <div className="loading-bar">Loading</div>
      </div>
    );
  }

  if (!session) {
    router.push("/auth/signin");
    return null;
  }
  if (session) {
    return <>{children}</>;
  }
}

// export default function LoginLayout({ children }) {
//   return <>{children}</>;
// }

// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// export default function LoginLayout({ children }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth/signin");
//     }
//   }, [status, router]);

//   if (status === "loading" || status === "unauthenticated") {
//     return (
//       <div className="full-h flex flex-center">
//         <div className="loading-bar">Redirecting to login...</div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// export default function LoginLayout({ children }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [redirecting, setRedirecting] = useState(false);

//   useEffect(() => {
//     if (status === "authenticated") {
//       setRedirecting(false);
//     } else if (status === "unauthenticated" && !redirecting) {
//       setRedirecting(true);
//       router.replace("/auth/signin");
//     }
//   }, [session, status, router, redirecting]);

//   if (status === "loading" || redirecting) {
//     return (
//       <div className="full-h flex flex-center">
//         <div className="loading-bar">Loading...</div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

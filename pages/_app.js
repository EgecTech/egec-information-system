// pages/_app.js

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import Loading from "@/components/Loading";
import "@/styles/globals.css";

// تحميل ParentComponent فقط على العميل
const ParentComponent = dynamic(() => import("@/components/ParentComponent"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [asideOpen, setAsideOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timeout;

    const handleRouteChange = (isLoading) => {
      setLoading(isLoading);
      if (isLoading) {
        timeout = setTimeout(() => setLoading(false), 4000); // حد أقصى 1 ثانية
      }
    };

    router.events.on("routeChangeStart", () => handleRouteChange(true));
    router.events.on("routeChangeComplete", () => handleRouteChange(false));
    router.events.on("routeChangeError", () => handleRouteChange(false));

    return () => {
      clearTimeout(timeout);
      router.events.off("routeChangeStart", () => handleRouteChange(true));
      router.events.off("routeChangeComplete", () => handleRouteChange(false));
      router.events.off("routeChangeError", () => handleRouteChange(false));
    };
  }, [router.events]);

  return (
    <SessionProvider session={pageProps.session}>
      {loading ? (
        <div className="flex flex-col flex-center wh_100">
          <Loading />
          <h1 className="mt-1">Loading...</h1>
        </div>
      ) : (
        <>
          <ParentComponent
            appOpen={asideOpen}
            appAsideOpen={() => setAsideOpen(!asideOpen)}
          />
          <main className="flex">
            <div className={asideOpen ? "mycontainer active" : "mycontainer"}>
              <Component {...pageProps} />
            </div>
          </main>
        </>
      )}
    </SessionProvider>
  );
}

// import dynamic from "next/dynamic";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { SessionProvider } from "next-auth/react";
// import Loading from "@/components/Loading";
// import "@/styles/globals.css";

// // تحميل ParentComponent فقط على العميل
// const ParentComponent = dynamic(() => import("@/components/ParentComponent"), {
//   ssr: false,
// });

// export default function App({ Component, pageProps }) {
//   const [loading, setLoading] = useState(false);
//   const [asideOpen, setAsideOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const handleRouteChange = (isLoading) => setLoading(isLoading);

//     router.events.on("routeChangeStart", () => handleRouteChange(true));
//     router.events.on("routeChangeComplete", () => handleRouteChange(false));
//     router.events.on("routeChangeError", () => handleRouteChange(false));

//     return () => {
//       router.events.off("routeChangeStart", () => handleRouteChange(true));
//       router.events.off("routeChangeComplete", () => handleRouteChange(false));
//       router.events.off("routeChangeError", () => handleRouteChange(false));
//     };
//   }, [router.events]);

//   return (
//     <SessionProvider session={pageProps.session}>
//       {loading ? (
//         <div className="flex flex-col flex-center wh_100">
//           <Loading />
//           <h1 className="mt-1">Loading...</h1>
//         </div>
//       ) : (
//         <>
//           <ParentComponent
//             appOpen={asideOpen}
//             appAsideOpen={() => setAsideOpen(!asideOpen)}
//           />
//           <main className="flex">
//             <div className={asideOpen ? "mycontainer active" : "mycontainer"}>
//               <Component {...pageProps} />
//             </div>
//           </main>
//         </>
//       )}
//     </SessionProvider>
//   );
// }

// import { lazy, Suspense, useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { SessionProvider } from "next-auth/react";
// import Loading from "@/components/Loading";
// import "@/styles/globals.css";

// const ParentComponent = lazy(() => import("@/components/ParentComponent"));

// export default function App({ Component, pageProps }) {
//   const [loading, setLoading] = useState(false);
//   const [asideOpen, setAsideOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const handleRouteChange = (isLoading) => setLoading(isLoading);

//     router.events.on("routeChangeStart", () => handleRouteChange(true));
//     router.events.on("routeChangeComplete", () => handleRouteChange(false));
//     router.events.on("routeChangeError", () => handleRouteChange(false));

//     return () => {
//       router.events.off("routeChangeStart", () => handleRouteChange(true));
//       router.events.off("routeChangeComplete", () => handleRouteChange(false));
//       router.events.off("routeChangeError", () => handleRouteChange(false));
//     };
//   }, [router.events]);

//   return (
//     <SessionProvider session={pageProps.session}>
//       {loading ? (
//         <div className="flex flex-col flex-center wh_100">
//           <Loading />
//           <h1 className="mt-1">Loading...</h1>
//         </div>
//       ) : (
//         <>
//           <Suspense fallback={<Loading />}>
//             <ParentComponent
//               appOpen={asideOpen}
//               appAsideOpen={() => setAsideOpen(!asideOpen)}
//             />
//           </Suspense>
//           <main className="flex">
//             <div className={asideOpen ? "mycontainer active" : "mycontainer"}>
//               <Component {...pageProps} />
//             </div>
//           </main>
//         </>
//       )}
//     </SessionProvider>
//   );
// }

// import Loading from "@/components/Loading";
// import ParentComponent from "@/components/ParentComponent";
// import "@/styles/globals.css";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { SessionProvider } from "next-auth/react";

// export default function App({ Component, pageProps }) {
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const handleStart = () => setLoading(true);
//     const handleComplete = () => setLoading(false);

//     if (router.isReady) {
//       setLoading(false);
//     }

//     router.events.on("routeChangeStart", handleStart);
//     router.events.on("routeChangeComplete", handleComplete);
//     router.events.on("routeChangeError", handleComplete);

//     return () => {
//       router.events.off("routeChangeStart", handleStart);
//       router.events.off("routeChangeComplete", handleComplete);
//       router.events.off("routeChangeError", handleComplete);
//     };
//   }, [router.isReady]);

//   const [asideOpen, setAsideOpen] = useState(false);

//   const AsideClickOpen = () => {
//     setAsideOpen(!asideOpen);
//   };

//   return (
//     <SessionProvider session={pageProps.session}>
//       {loading ? (
//         <div className="flex flex-col flex-center wh_100">
//           <Loading />
//           <h1 className="mt-1">Loading...</h1>
//         </div>
//       ) : (
//         <>
//           <ParentComponent appOpen={asideOpen} appAsideOpen={AsideClickOpen} />
//           <main>
//             <div className="flex">
//               <div className={asideOpen ? "mycontainer active" : "mycontainer"}>
//                 <Component {...pageProps} />
//               </div>
//             </div>
//           </main>
//         </>
//       )}
//     </SessionProvider>
//   );
// }

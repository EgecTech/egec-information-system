import Loading from "@/components/Loading";
import ParentComponent from "@/components/ParentComponent";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react"; // ✅ قم بإلغاء التعليق

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    if (router.isReady) {
      setLoading(false);
    }

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.isReady]);

  const [asideOpen, setAsideOpen] = useState(false);

  const AsideClickOpen = () => {
    setAsideOpen(!asideOpen);
  };

  return (
    <SessionProvider session={pageProps.session}>
      {loading ? (
        <div className="flex flex-col flex-center wh_100">
          <Loading />
          <h1 className="mt-1">Loading...</h1>
        </div>
      ) : (
        <>
          <ParentComponent appOpen={asideOpen} appAsideOpen={AsideClickOpen} />
          <main>
            <div className="flex">
              <div className={asideOpen ? "mycontainer active" : "mycontainer"}>
                <Component {...pageProps} />
              </div>
            </div>
          </main>
        </>
      )}
    </SessionProvider>
  );
}

// import Loading from "@/components/Loading";
// import ParentComponent from "@/components/ParentComponent";
// import "@/styles/globals.css";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// // import { SessionProvider } from "next-auth/react";

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

//   // <SessionProvider session={session}>
//   return (
//     <>
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
//     </>
//   );
// }
// /* </SessionProvider> */

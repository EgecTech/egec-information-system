// // /pages/auth/signin.js

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";

export default function SignIn() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ضبط مؤقت لإيقاف التحميل بعد ثانية واحدة كحد أقصى
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (!result.error) {
        router.push("/");
      } else {
        setError("Invalid email or password");
        setTimeout(() => setError(""), 4000);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("An error occurred. Please try again.");
      setTimeout(() => setError(""), 4000);
    } finally {
      clearTimeout(timeout); // تأكد من إلغاء المؤقت إذا تم اكتمال التحميل قبل انتهاء الوقت
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-center wh_100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-center full-h">
      <div className="loginform">
        <div className="heading">Sign In</div>
        {loading ? (
          <div className="flex flex-center w-100 flex-col">
            <Spinner />
          </div>
        ) : (
          <>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="input"
                placeholder="Enter Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <input className="login-button" type="submit" value="Login" />
              {error && <p className="error-message">{error}</p>}
            </form>
            <span className="agreement">
              <a target="_blank" href="#">
                Learn Admin Licence agreement
              </a>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { signIn, useSession } from "next-auth/react";
// import Spinner from "@/components/Spinner";

// export default function SignIn() {
//   const { data: session, status } = useSession();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "authenticated") {
//       router.push("/");
//     }
//   }, [status, router]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await signIn("credentials", {
//         redirect: false,
//         email: form.email,
//         password: form.password,
//       });

//       if (!result.error) {
//         router.push("/");
//       } else {
//         setError("Invalid email or password");
//         setTimeout(() => {
//           setError("");
//         }, 4000);
//       }
//     } catch (error) {
//       console.error("Sign-in error:", error);
//       setError("An error occurred. Please try again.");
//       setTimeout(() => {
//         setError("");
//       }, 4000);
//     } finally {
//       setLoading(false);
//       setTimeout(() => {
//         setError("");
//       }, 4000);
//     }
//   };
//   if (status === "loading") {
//     return (
//       <div className="flex flex-center wh_100">
//         <Spinner />
//       </div>
//     );
//   }
//   return (
//     <div className="flex flex-center full-h">
//       <div className="loginform">
//         <div className="heading">Sign In</div>
//         {loading ? (
//           <div className="flex flex-center w-100 flex-col">
//             {" "}
//             <Spinner />
//           </div>
//         ) : (
//           <>
//             <form className="form" onSubmit={handleSubmit}>
//               <input
//                 type="email"
//                 className="input"
//                 placeholder="Enter Email Address"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="password"
//                 className="input"
//                 placeholder="Enter Password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />

//               <input className="login-button" type="submit" value="Login" />
//               {error && <p className="error-message">{error}</p>}
//             </form>
//             <span className="agreement">
//               <a target="_blank" href="#">
//                 Learn Admin Licence agreement
//               </a>
//             </span>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

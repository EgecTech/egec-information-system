// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function SignUp() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (status === "authenticated") {
//       router.replace("/");
//     }
//   }, [status, router]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.error || "An unexpected error occurred.");
//       return;
//     }

//     router.push("/auth/signin");
//   };

//   return (
//     <div className="flex flex-center full-h">
//       <div className="loginform">
//         <div className="heading">Sign Up Create Admin</div>
//         <form className="form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             className="input"
//             placeholder="Enter Email Address"
//             name="email"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             className="input"
//             placeholder="Enter Password"
//             name="password"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             className="input"
//             placeholder="Confirm Password"
//             name="confirmPassword"
//             onChange={handleChange}
//             required
//           />
//           <button className="login-button" type="submit">
//             Sign up
//           </button>
//           {error && <p className="error-message">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default function singUp() {
//   return (
//     <>
//       <h1>You Don't Have Permision to Signup to This Admin Dashboard</h1>
//     </>
//   );
// }

export default function SignUp() {
  return (
    <div className="flex flex-center full-h">
      <div className="loginform">
        {/* <div className="heading">Sign Up Create Admin</div> */}
        <h1 className="heading ">
          You Don't Have Permision to Signup to This Admin Dashboard
        </h1>
      </div>
    </div>
  );
}

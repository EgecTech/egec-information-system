// pages/api/[...nextauth].js
import NextAuth from "next-auth";
import connectToDatabase from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Received Credentials:", credentials);

        const db = await connectToDatabase();
        const collection = db.collection("admin");

        const user = await collection.findOne({ email: credentials.email });

        console.log("Found User in DB:", user);

        if (!user) {
          console.log("❌ User not found");
          return null;
        }

        if (credentials.password !== user.password) {
          console.log("❌ Password does not match");
          return null;
        }

        console.log("✅ Login successful");
        return { id: user._id, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectToDatabase from "@/lib/mongodb";
// import bcrypt from "bcryptjs"; // لاستخدامه في مقارنة كلمات المرور

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials.email || !credentials.password) {
//           throw new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
//         }

//         // الاتصال بقاعدة البيانات
//         const db = await connectToDatabase();
//         const collection = db.collection("admin");

//         // البحث عن المستخدم بالبريد الإلكتروني
//         const user = await collection.findOne({ email: credentials.email });

//         if (!user) {
//           throw new Error("البريد الإلكتروني غير مسجل");
//         }

//         // مقارنة كلمة المرور المُدخلة مع كلمة المرور المخزنة بعد فك التشفير
//         const isValidPassword = await bcrypt.compare(credentials.password, user.password);

//         if (!isValidPassword) {
//           throw new Error("كلمة المرور غير صحيحة");
//         }

//         // إرجاع بيانات المستخدم عند نجاح المصادقة
//         return { id: user._id, name: user.name, email: user.email };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

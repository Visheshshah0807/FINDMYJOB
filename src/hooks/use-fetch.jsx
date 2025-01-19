// import { useState } from "react";

// const useFetch = (cb, options = {}) => {
//   const [data, setData] = useState(undefined);
//   const [loading, setLoading] = useState(false); // Initialize as false
//   const [error, setError] = useState(null);

//   const fetchFn = async (session, ...args) => {
//     setLoading(true);
//     setError(null);

//     try {
//       if (!session) {
//         throw new Error("Session is not available.");
//       }

//       const supabaseAccessToken = await session.getToken({
//         template: "supabase",
//       });

//       const response = await cb(supabaseAccessToken, options, ...args);
//       setData(response);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An unknown error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { fetchFn, data, loading, error };
// };

// export default useFetch;

// import { useEffect, useState } from "react";

// const IframeReceiverWrapper = ({ children }) => {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const handleMessage = (event) => {
//       console.log("Received message:", event.data);

//       // ✅ Security: Check event.origin if needed
//       // if (event.origin !== "https://your-main-site.com") return;

//       if (event.data?.prompt) {
//         setMessage(event.data.prompt); // Update state with received prompt
//       }
//     };

//     // Listen for messages from parent
//     window.addEventListener("message", handleMessage);

//     const handleKeyDown = (event) => {
//       if (event.code === "Space") {
//         window.postMessage({ prompt: "This is a mock message" }, "*");
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);


//     return () => {
//       window.removeEventListener("message", handleMessage);
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <div>
//       {children}
//     </div>
//   );
// };

// export default IframeReceiverWrapper;
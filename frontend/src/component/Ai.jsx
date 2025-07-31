import React, { useContext, useState, useEffect, useRef } from 'react';
// Import AI icon image
import ai from "../assets/ai.png";
// Import context for managing search state
import { shopDataContext } from '../context/ShopContext';
// React Router hook for navigation
import { useNavigate } from 'react-router-dom';
// Toast notifications
import { toast } from 'react-toastify';
// Audio file to play on AI activation
import open from "../assets/open.mp3";

function Ai() {
  // Accessing showSearch state and setter from context
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate(); // Hook to navigate between routes
  const [activeAi, setActiveAi] = useState(false); // State to manage AI visual effect
  const recognitionRef = useRef(null); // Ref to hold SpeechRecognition instance
  const audioRef = useRef(null); // Ref to hold audio element

  // Load and assign audio file on component mount
  useEffect(() => {
    audioRef.current = new Audio(open);
  }, []);

  // Initialize and configure SpeechRecognition on component mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported."); // Warn if browser doesn't support it
      return;
    }

    // Create a new SpeechRecognition instance
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // Final results only
    recognition.maxAlternatives = 1; // Only take the most confident result

    // When recognition returns a result
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase(); // Clean and lowercase result
      console.log("Heard:", transcript); // Log spoken words

      // Series of commands the AI can understand and react to
      if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
        speak("opening search");
        setShowSearch(true);
        navigate("/collection");
      } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
        speak("closing search");
        setShowSearch(false);
      } else if (transcript.includes("collection") || transcript.includes("product")) {
        speak("opening collection page");
        navigate("/collection");
      } else if (transcript.includes("about")) {
        speak("opening about page");
        setShowSearch(false);
        navigate("/about");
      } else if (transcript.includes("home")) {
        speak("opening home page");
        setShowSearch(false);
        navigate("/");
      } else if (transcript.includes("cart") || transcript.includes("kaat") || transcript.includes("caat")) {
        speak("opening your cart");
        setShowSearch(false);
        navigate("/cart");
      } else if (transcript.includes("contact")) {
        speak("opening contact page");
        setShowSearch(false);
        navigate("/contact");
      } else if (transcript.includes("order") || transcript.includes("my order") || transcript.includes("orders")) {
        speak("opening your orders page");
        setShowSearch(false);
        navigate("/order");
      } else {
        toast.error("Command not recognized. Try again."); // Unknown command
      }
    };

    // Handle any recognition errors
    recognition.onerror = (e) => {
      console.error("SpeechRecognition error:", e.error);
      toast.error("Voice recognition error. Please check permissions.");
    };

    // Reset active AI status after recognition ends
    recognition.onend = () => {
      setActiveAi(false);
    };

    // Save the instance to the ref so it can be reused
    recognitionRef.current = recognition;
  }, [navigate, showSearch, setShowSearch]);

  // Text-to-speech function to speak messages aloud
  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
  };

  // When the AI button is clicked
  const handleClick = async () => {
    setActiveAi(true); // Activate AI visuals

    try {
      // Try to play the opening sound (some browsers block autoplay)
      await audioRef.current.play();
    } catch (err) {
      console.warn("Audio autoplay blocked:", err); // Fallback warning
    }

    const recognition = recognitionRef.current;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // Check if browser supports recognition
    if (!SpeechRecognition || !recognition) {
      toast.error("Voice recognition not supported in this browser.");
      setActiveAi(false);
      return;
    }

    // Check and request microphone permission
    try {
      const permission = await navigator.permissions.query({ name: 'microphone' });

      // If user has explicitly denied access
      if (permission.state === "denied") {
        toast.error("Microphone permission denied. Please allow it in browser settings.");
        setActiveAi(false);
        return;
      }

      // Request mic access to prompt if state is 'prompt'
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // Close mic after check

      // Start voice recognition
      recognition.start();
    } catch (err) {
      console.error("Microphone error:", err);
      toast.error("Please allow microphone access.");
      setActiveAi(false);
    }
  };

  // Render the AI assistant button with animation and styles
  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={handleClick} // Start AI on click
    >
      <img
        src={ai}
        alt="AI Voice Assistant"
        className={`w-[100px] cursor-pointer transition-transform ${
          activeAi ? "translate-x-[10%] translate-y-[-10%] scale-125" : ""
        }`}
        style={{
          filter: activeAi
            ? "drop-shadow(0px 0px 30px #00d2fc)" // Active glow
            : "drop-shadow(0px 0px 20px black)",  // Idle shadow
        }}
      />
    </div>
  );
}

export default Ai;

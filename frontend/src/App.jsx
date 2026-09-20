import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  Bot,
  ChevronDown,
  LoaderCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import Home from "./pages/Home";
import Planner from "./pages/Planner";
import TripResult from "./pages/TripResult";
import Signup from "./pages/signup";
import { apiUrl } from "./lib/api";


function Explore() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <h1 className="text-4xl">
        Your journey begins...
      </h1>
    </div>
  );
}


/* ============================================================
   CHAT INITIAL MESSAGE
============================================================ */

const starterMessage = {
  role: "assistant",
  content:
    "Namaste! 👋 I’m Chalo, your travel assistant. Tell me where you want to go, and I’ll help with routes, stays, food, budget, places and travel tips.",
};


/* ============================================================
   TRAVEL CHAT
============================================================ */

function TravelChat() {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    starterMessage,
  ]);

  const [loading, setLoading] = useState(false);


  const sendMessage = async (event) => {

    event.preventDefault();

    const trimmed = message.trim();

    if (!trimmed || loading) {
      return;
    }


    /* USER MESSAGE */

    const userMessage = {
      role: "user",
      content: trimmed,
    };


    const nextMessages = [
      ...messages,
      userMessage,
    ];


    setMessages(nextMessages);

    setMessage("");

    setLoading(true);


    try {

      const response = await fetch(
        apiUrl("/chat"),
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: trimmed,

            history: nextMessages
              .slice(-8)
              .map((item) => ({
                role: item.role,
                content: item.content,
              })),
          }),
        }
      );


      const payload =
        await response.json().catch(() => ({}));


      if (!response.ok) {

        throw new Error(
          payload.detail ||
          "AI server returned an error."
        );
      }


      if (!payload.answer) {

        throw new Error(
          "AI returned an empty response."
        );
      }


      /* AI RESPONSE */

      setMessages((current) => [
        ...current,

        {
          role: "assistant",
          content: payload.answer,
        },
      ]);

    }

    catch (error) {

      console.error(
        "Travel AI error:",
        error
      );


      setMessages((current) => [
        ...current,

        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the travel AI right now. Please make sure the AI backend is running on http://localhost:8000.",
        },
      ]);

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="travel-chat">

      {/* ====================================================
          CHAT WINDOW
      ==================================================== */}

      {open && (

        <section
          className="travel-chat-panel"
          aria-label="Travel assistant"
        >

          {/* HEADER */}

          <div className="travel-chat-header">

            <div className="travel-chat-avatar">
              <Sparkles size={16} />
            </div>


            <div>

              <p className="travel-chat-title">
                Chalo Assistant
              </p>

              <p className="travel-chat-status">
                <span />
                AI Travel Guide
              </p>

            </div>


            <button
              className="travel-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >

              <X size={16} />

            </button>

          </div>


          {/* MESSAGES */}

          <div className="travel-chat-messages">

            {messages.map((item, index) => (

              <div
                key={`${item.role}-${index}`}
                className={`chat-bubble chat-bubble-${item.role}`}
              >

                {item.content}

              </div>

            ))}


            {/* LOADING */}

            {loading && (

              <div className="chat-bubble chat-bubble-assistant chat-loading">

                <LoaderCircle
                  size={15}
                  className="animate-spin"
                />

                Thinking about your journey...

              </div>

            )}

          </div>


          {/* INPUT */}

          <form
            className="travel-chat-form"
            onSubmit={sendMessage}
          >

            <input
              value={message}

              onChange={(event) =>
                setMessage(event.target.value)
              }

              placeholder="Ask about a journey..."

              aria-label="Ask a travel question"

              disabled={loading}
            />


            <button
              type="submit"
              aria-label="Send travel question"

              disabled={
                loading ||
                !message.trim()
              }
            >

              <Send size={16} />

            </button>

          </form>

        </section>

      )}


      {/* ====================================================
          CHAT BUTTON
      ==================================================== */}

      <button
        className={`travel-chat-launcher ${
          open
            ? "travel-chat-launcher-open"
            : ""
        }`}

        onClick={() =>
          setOpen((value) => !value)
        }

        aria-label={
          open
            ? "Close travel assistant"
            : "Open travel assistant"
        }
      >

        {open ? (
          <ChevronDown size={20} />
        ) : (
          <Bot size={21} />
        )}

        {!open && (
          <span>
            Ask Chalo
          </span>
        )}

      </button>

    </div>

  );

}


/* ============================================================
   MAIN APP
============================================================ */

function App() {

  return (

    <BrowserRouter>

      {/* GLOBAL CHATBOT */}

      <TravelChat />


      {/* ROUTES */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/plan-trip"
          element={<Planner />}
        />


        <Route
          path="/trip"
          element={<TripResult />}
        />


        <Route
          path="/explore/:destination"
          element={<Explore />}
        />


        <Route
          path="/signup"
          element={<Signup />}
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;
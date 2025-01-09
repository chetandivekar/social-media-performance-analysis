"use client";

import { useState, useRef } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Prevent form submission if triggered by form submit
    setLoading(true);

    try {
      const res = await fetch("/api/langflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          stream: false,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (await res.json()) as any;

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.message) {
        setResponse(data.message);
      } else if (data.streamUrl) {
        handleStreamResponse(data.streamUrl);
      }
    } catch (err) {
      const error = err as Error;
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStreamResponse = (streamUrl: string) => {
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setResponse((prev) => prev + (data.chunk || ""));
    };

    eventSource.onerror = (event) => {
      console.error("Stream Error:", event);
      eventSource.close();
    };

    eventSource.addEventListener("close", () => {
      eventSource.close();
    });
  };

  const handleExampleClick = async (text: string) => {
    console.log("the text is ", text);
    setMessage(text); // Set the message from the example query
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            NEXUS Assistant
          </h1>
          <p className="text-gray-400 mt-2">
            Social Media Intelligence Assistant
          </p>
        </div>

        {/* Main input */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="relative">
            <Input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your social media strategy..."
              className="w-full pl-4 pr-24 py-6 bg-white/10 border-purple-500/50 text-white placeholder:text-gray-400 rounded-xl"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <Button
                type="button" // Ensures the button doesn't submit the form
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <SendHorizontal className="h-5 w-5" />
                )}
              </Button>
            </div>
          </form>

          {/* Response area */}
          {response && (
            <div className="mt-6 p-4 rounded-xl bg-white/5 text-gray-200">
              {response
                .split(/(\*\*.*?\*\*)/)
                .map((part, index) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={index}>{part.slice(2, -2)}</strong>
                  ) : (
                    part
                  )
                )}
            </div>
          )}
        </div>

        {/* Example queries */}
        <div className="mt-12">
          <h2 className="text-gray-400 text-sm font-medium mb-4">Try these</h2>
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() =>
                handleExampleClick("Compare engagement: Reels vs Static Images")
              }
              className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-200 hover:text-white"
            >
              Compare engagement: Reels vs Static Images
            </button>
            <button
              type="button"
              onClick={() =>
                handleExampleClick("Compare engagement: Reels vs Carousel")
              }
              className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-200 hover:text-white"
            >
              Compare engagement: Reels vs Carousel
            </button>
            <button
              type="button"
              onClick={() => handleExampleClick("Overall Reels engagement")}
              className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-200 hover:text-white"
            >
              Overall Reels engagement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

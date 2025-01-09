import { NextRequest, NextResponse } from "next/server";
import { LangFlowRequest, LangFlowResponse } from "./types";
import { initiateSession } from "./utils";

const FLOW_ID = "033b17dc-0a4a-401e-bd9e-527cd4948cbb";
const LANGFLOW_ID = "33bbebfb-500e-4f00-8f35-661b1eb59d65";
const BASE_URL = "https://api.langflow.astra.datastax.com";

if (!process.env.LANGFLOW_APPLICATION_TOKEN) {
  throw new Error("LANGFLOW_APPLICATION_TOKEN is not defined");
}

const config = {
  baseURL: BASE_URL,
  applicationToken: process.env.LANGFLOW_APPLICATION_TOKEN,
};

const defaultTweaks = {
  "ChatInput-42jdl": {},
  "ChatOutput-FRCor": {},
  "TextInput-VfhYN": {},
  "Prompt-cwKgC": {},
  "GoogleGenerativeAIModel-sbVAY": {},
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LangFlowRequest;
    const {
      message,
      inputType = "chat",
      outputType = "chat",
      stream = false,
    } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = (await initiateSession(config, {
      flowId: FLOW_ID,
      langflowId: LANGFLOW_ID,
      inputValue: message,
      inputType,
      outputType,
      stream,
      tweaks: defaultTweaks,
    })) as LangFlowResponse;

    if (!stream && response?.outputs) {
      const output = response.outputs[0].outputs[0].outputs.message;
      return NextResponse.json({ message: output.message.text });
    }

    if (stream && response?.outputs?.[0]?.outputs?.[0]?.artifacts?.stream_url) {
      return NextResponse.json({
        streamUrl: response.outputs[0].outputs[0].artifacts.stream_url,
      });
    }

    return NextResponse.json({ error: "No output received" }, { status: 400 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

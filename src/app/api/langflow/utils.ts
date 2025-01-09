import { LangFlowConfig } from "./types";

export async function makeRequest(
  config: LangFlowConfig,
  endpoint: string,
  body: Record<string, unknown>
) {
  const headers = {
    Authorization: `Bearer ${config.applicationToken}`,
    "Content-Type": "application/json",
  };

  const url = `${config.baseURL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const responseMessage = await response.json();
    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText} - ${JSON.stringify(
          responseMessage
        )}`
      );
    }
    return responseMessage;
  } catch (error) {
    console.error("Request Error:", error);
    throw error;
  }
}

export async function initiateSession(
  config: LangFlowConfig,
  params: {
    flowId: string;
    langflowId: string;
    inputValue: string;
    inputType?: string;
    outputType?: string;
    stream?: boolean;
    tweaks?: Record<string, unknown>;
  }
) {
  const {
    flowId,
    langflowId,
    inputValue,
    inputType = "chat",
    outputType = "chat",
    stream = false,
    tweaks = {},
  } = params;

  const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;

  return makeRequest(config, endpoint, {
    input_value: inputValue,
    input_type: inputType,
    output_type: outputType,
    tweaks,
  });
}

export interface LangFlowConfig {
  baseURL: string;
  applicationToken: string;
}

export interface LangFlowTweaks {
  [key: string]: Record<string, unknown>;
}

export interface LangFlowRequest {
  message: string;
  inputType?: string;
  outputType?: string;
  stream?: boolean;
}

export interface LangFlowResponse {
  outputs: Array<{
    outputs: Array<{
      outputs: {
        message: {
          message: {
            text: string;
          };
        };
      };
      artifacts?: {
        stream_url?: string;
      };
    }>;
  }>;
}

import { ResumeData, ResumeOptions } from "jt-resume-builder";

interface PostOptions {
  endpoint: string;
  resumeData: ResumeData;
  resumeOptions: ResumeOptions;
  role?: string;
  additionalText?: string;
  headers?: Record<string, string>;
}

class ResumeRefineLLMHttpClient {
  static resumeRefineUrl = "http://localhost:8082";
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /*
  return type: 
  ResumeData
  which is defined in jt-resume-builder.
  */
  async post({
    resumeData,
    resumeOptions,
    role = "Software Engineer",
    additionalText = "",
    headers = {},
  }: PostOptions): Promise<ResumeData> {
    const url = `${this.baseUrl}/resume-refine`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        body: JSON.stringify({
          resumeOptions,
          role,
          additionalText,
        }),
      });

      return await this.processResponse({ resumeData, response });
    } catch (error) {
      console.error("Request failed:", error);
      return {
        name: "", title: "", contact: { email: "", phone: "", location: "", }, skills: [],
        summary: { title: "", description: "", "sub-sections": [] },
        experience: { title: "", description: "", "sub-sections": [] },
        education: { title: "", description: "", "sub-sections": [] },
      }
    }
  }

  private async processResponse({ resumeData, response }: { resumeData: ResumeData, response: Response }): Promise<ResumeData> {
    try {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || `HTTP Error: ${response.status}`);
      }
      const resumeRefineData = data.resumeData;
      const newResumeData: ResumeData = { ...resumeData };
      newResumeData.skills = resumeRefineData.skills;
      newResumeData.summary.description = resumeRefineData.summary;
      newResumeData.experience["sub-sections"] = resumeRefineData.experience;
      console.log("the selected resume data: ", newResumeData);
      return newResumeData;
    } catch (error) {
      throw new Error("Invalid JSON response");
    }
  }
}

export default ResumeRefineLLMHttpClient;
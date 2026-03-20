import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { Loader2, Video, Upload } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function VideoGen() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setError("");
    setVideoUrl(null);

    try {
      let imagePayload;
      if (image) {
        const buffer = await image.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        imagePayload = { imageBytes: base64, mimeType: image.type };
      }

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt,
        image: imagePayload,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const res = await fetch(downloadLink, {
          headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY || '' }
        });
        const blob = await res.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        setError("Failed to generate video.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Video className="text-green-600" /> Animate Rickshaw Experience
      </h2>
      <p className="text-gray-600 mb-6">Generate high-quality videos of your rickshaw ride using Veo 3 AI.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A cinematic shot of a yellow and green rickshaw driving through the bustling streets of Accra at sunset..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Starting Image (Optional)</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                {image && <p className="text-xs text-green-600 font-medium">{image.name}</p>}
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </label>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt || loading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Generating Video (Takes a few mins)...
            </>
          ) : (
            "Generate Video"
          )}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {videoUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Your Video</h3>
            <video src={videoUrl} controls className="w-full rounded-lg shadow-md" />
          </div>
        )}
      </div>
    </div>
  );
}

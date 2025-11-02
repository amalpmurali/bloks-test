import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HeroVideoDialog } from "./hero-video-dialog";
import { FaYoutube, FaPlus, FaTrash } from "react-icons/fa6";

interface YoutubeEditorProps {
  content: { videos: { id: string; videoSrc: string; thumbnailSrc: string }[] };
  onChange: (content: {
    videos: { id: string; videoSrc: string; thumbnailSrc: string }[];
  }) => void;
}

export default function YoutubeEditor({
  content,
  onChange,
}: YoutubeEditorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [inputVideoUrl, setInputVideoUrl] = useState("");

  const extractVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match?.[2] ?? null;
  };

  const handleAddVideo = () => {
    if (!inputVideoUrl) return;

    const videoId = extractVideoId(inputVideoUrl);
    if (!videoId) {
      // TODO: Add error handling here, maybe show a toast
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    // Use hqdefault instead of maxresdefault as it's more reliable (always exists)
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    onChange({
      videos: [
        ...content.videos,
        {
          id: crypto.randomUUID(),
          videoSrc: embedUrl,
          thumbnailSrc: thumbnailUrl,
        },
      ],
    });
    setInputVideoUrl("");
    setIsAdding(false);
  };

  const handleRemoveVideo = (id: string) => {
    onChange({
      videos: content.videos.filter((video) => video.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
        {content.videos.map((video) => (
          <div
            key={video.id}
            className="group relative rounded-lg border border-primary/20 p-4"
          >
            <div className="absolute -top-2.5 right-4 opacity-0 group-hover:opacity-100 transition-opacity space-x-2 z-10">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveVideo(video.id)}
                className="gap-2"
              >
                <FaTrash className="h-3 w-3" />
                Remove
              </Button>
            </div>
            <HeroVideoDialog
              videoSrc={video.videoSrc}
              thumbnailSrc={video.thumbnailSrc}
              thumbnailAlt="Video thumbnail"
              animationStyle="from-center"
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Add Video Interface */}
      {isAdding ? (
        <div className="space-y-4 p-4 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FaYoutube className="h-4 w-4" />
            <span>Enter YouTube video URL</span>
          </div>
          <div className="flex gap-2">
            <Input
              value={inputVideoUrl}
              onChange={(e) => setInputVideoUrl(e.target.value)}
              placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
              className="border-primary/20 focus:border-primary"
            />
            <Button
              onClick={handleAddVideo}
              className="shrink-0"
              disabled={!inputVideoUrl}
            >
              Add Video
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsAdding(false);
                setInputVideoUrl("");
              }}
              className="shrink-0"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="gap-2"
        >
          <FaPlus className="h-4 w-4" />
          Add YouTube Video
        </Button>
      )}
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tweet } from "react-tweet";
import { FaXTwitter, FaPlus, FaTrash } from "react-icons/fa6";

interface TwitterEditorProps {
  content: { tweets: { id: string; tweetId: string }[] };
  onChange: (content: { tweets: { id: string; tweetId: string }[] }) => void;
}

export default function TwitterEditor({
  content,
  onChange,
}: TwitterEditorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [inputTweetId, setInputTweetId] = useState("");

  const handleAddTweet = () => {
    if (!inputTweetId) return;
    onChange({
      tweets: [
        ...content.tweets,
        { id: crypto.randomUUID(), tweetId: inputTweetId },
      ],
    });
    setInputTweetId("");
    setIsAdding(false);
  };

  const handleRemoveTweet = (id: string) => {
    onChange({
      tweets: content.tweets.filter((tweet) => tweet.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {/* Tweet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
        {content.tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="group relative rounded-lg border border-primary/20 p-4"
          >
            <div className="absolute -top-2.5 right-4 opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveTweet(tweet.id)}
                className="gap-2"
              >
                <FaTrash className="h-3 w-3" />
                Remove
              </Button>
            </div>
            <Tweet id={tweet.tweetId} />
          </div>
        ))}
      </div>

      {/* Add Tweet Interface */}
      {isAdding ? (
        <div className="space-y-4 p-4 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FaXTwitter className="h-4 w-4" />
            <span>Enter Tweet ID to embed</span>
          </div>
          <div className="flex gap-2">
            <Input
              value={inputTweetId}
              onChange={(e) => setInputTweetId(e.target.value)}
              placeholder="Enter Tweet ID (e.g., 1628832338187636740)"
              className="border-primary/20 focus:border-primary"
            />
            <Button
              onClick={handleAddTweet}
              className="shrink-0"
              disabled={!inputTweetId}
            >
              Add Tweet
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsAdding(false);
                setInputTweetId("");
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
          Add Tweet
        </Button>
      )}
    </div>
  );
}

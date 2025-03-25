import { Season } from "@/models/Season";
import { useEffect, useState } from "react";

export function useSeasons() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch("/api/seasons", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
        });

        const result = await response.json();
        if (response.ok) {
          console.log(result.data);
          setSeasons(result.data || []);
        } else {
          throw new Error(result.error?.error || "Failed to fetch seasons");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  return { seasons, loading, error };
}

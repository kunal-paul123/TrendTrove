import { useEffect, useState } from "react";

export default function useSignedImage(imageKey) {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!imageKey) return;

        const fetchSignedUrl = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/v1/image/signed-url?key=${imageKey}`
                );
                const data = await res.json();
                setImageUrl(data.url);
            } catch (error) {
                console.log("failed to fetch signed url: ", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSignedUrl();
    }, [imageKey])

    return { imageUrl, loading, error };
}


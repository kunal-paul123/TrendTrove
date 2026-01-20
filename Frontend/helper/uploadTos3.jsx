const uploadTos3 = async (file) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/s3/upload-url?fileType=${file.type}`,
        {
            credentials: "include",
        }
    );

    const data = await res.json();

    await fetch(data.uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
        },
        body: file,
    });

    return {
        key: data.key,
        fileUrl: data.fileUrl
    }
}

export default uploadTos3;
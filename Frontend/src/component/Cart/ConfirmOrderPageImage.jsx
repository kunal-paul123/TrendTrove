import useSignedImage from "../../hooks/useSignedImage";

const ConfirmOrderPageImage = ({ imageKey, altName }) => {
    const { imageUrl } = useSignedImage(imageKey);

    if (!imageUrl) return null;

    return <img src={imageUrl} alt={altName} />;
}

export default ConfirmOrderPageImage;
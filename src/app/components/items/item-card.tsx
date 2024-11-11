import Image from 'next/Image';

interface ItemProps {
    imgURL: string
    itemName: string
};

const Item: React.FC<ItemProps> = ({ imgURL, itemName }) => {
    return (
        <Image
            src={imgURL}
            width={1920}
            height={1080}
            alt={`Banner image of ${itemName}`}
            className="rounded"
        />
    );
};

export default Item;
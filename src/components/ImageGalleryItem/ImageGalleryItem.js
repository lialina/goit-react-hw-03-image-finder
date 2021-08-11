import s from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

function ImageGalleryItem({ id, webformatURL }) {
  return (
    <li className={s.ImageGalleryItem} key={id}>
      <img src={webformatURL} alt="" className={s.ImageGalleryItem_image} />
    </li>
  );
}

export default ImageGalleryItem;

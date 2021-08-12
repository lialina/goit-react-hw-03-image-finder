import s from 'components/Modal/Modal.module.css';

function Modal({ children }) {
  return (
    <div className={s.Overlay}>
      <div className={s.Modal}>{children}</div>
    </div>
  );
}

export default Modal;

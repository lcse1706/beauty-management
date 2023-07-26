import './MessageModal.scss';

export const MessageModal = ({ message }: any) => {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
};

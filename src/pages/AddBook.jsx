import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm.jsx';

export default function AddBook() {
  const navigate = useNavigate();

  const handleSubmit = (bookData) => {

    console.log('Nouveau livre:', bookData);

    navigate('/');
  };

  return (
    <div>
      <BookForm 
        initialData={{}}
        onSubmit={handleSubmit}
        mode="add"
      />
    </div>
  );
}

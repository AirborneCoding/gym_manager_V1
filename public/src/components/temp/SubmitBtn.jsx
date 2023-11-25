import { useNavigation } from 'react-router-dom';
const SubmitBtn = ({ text, name, value }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      name={name}
      value={value}
      type='submit'
      className='btn btn-primary btn-block btn-sm mt-5'
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className='loading loading-spinner'></span>
          sending...
        </>
      ) : (
        text || 'submit'
      )}
    </button>
  );
};
export default SubmitBtn;

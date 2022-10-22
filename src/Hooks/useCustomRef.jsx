import { useContext } from 'react';
import RefContext from '../Context/RefContenxt';

const useCustomRef = () => useContext(RefContext);

export default useCustomRef;

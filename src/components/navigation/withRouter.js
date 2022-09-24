// import { useNavigate } from 'react-router-dom';
import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const navigation={navigate,location,params}

    return (
      <Component
        navigation = {navigation}

        {...props}
        />
    );
  };
  
  return Wrapper;
};
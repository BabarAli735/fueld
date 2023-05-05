import {APPLOADING} from '../ActionType';

const initialState = {
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APPLOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};

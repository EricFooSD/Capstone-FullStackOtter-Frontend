import { configureStore } from '@reduxjs/toolkit';
import firebaseReducer from '../firebase/firebaseSlice.js';
import AssignReducer from '../components/FakeDocusign/Assign/AssignSlice.js';
import SignDocumentReducer from '../components/FakeDocusign/SignDocument/SignDocumentSlice.js';
import ViewDocumentReducer from '../components/FakeDocusign/ViewDocument/ViewDocumentSlice.js';

export default configureStore({
  reducer: {
    firebase: firebaseReducer,
    assign: AssignReducer,
    signDoc: SignDocumentReducer,
    viewDoc: ViewDocumentReducer,
  },
});

// =================  IMPORT =========================>
import React, { useEffect, useState, useContext } from 'react';
import {
  Button, Table, Text, Spinner,
} from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchForDocumentToSign } from '../../../firebase/firebase.js';
import { setDocToSign } from '../SignDocument/SignDocumentSlice.js';
import { UserContext } from '../../UserContext.jsx';
// ===================================================>

const SignList = () => {
  // .......... STATES ............ //

  const { user } = useContext(UserContext);
  const [docs, setDocs] = useState([]);
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // .......... HELPER FUNCTIONS ............ //

  async function getDocs() {
    try {
      const docsToView = await searchForDocumentToSign(user.email);
      setDocs(docsToView);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user.email !== null) {
      setTimeout(getDocs, 1000);
    }
  }, [user]);

  // .......... COMPONENT .......... //
  return (
    <div>
      {show ? (
        <Spinner show={show} accessibilityLabel="spinner" />
      ) : (
        <div>
          {docs.length > 0 ? (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Text weight="bold">From</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Text weight="bold">When</Text>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {docs.map((doc) => (
                  <Table.Row key={doc.docRef}>
                    <Table.Cell>
                      <Text>{doc.email}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text>{doc.requestedTime ? new Date(doc.requestedTime.seconds * 1000).toDateString() : ''}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={() => {
                          const { docRef, docId } = doc;
                          dispatch(setDocToSign({ docRef, docId }));
                          navigate('/signDocument');
                        }}
                        text="Sign"
                        color="blue"
                        inline
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            'You do not have any documents to sign'
          )}
        </div>
      )}
    </div>
  );
};

export default SignList;

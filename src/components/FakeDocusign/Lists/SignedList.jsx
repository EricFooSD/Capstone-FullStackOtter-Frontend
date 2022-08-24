// =================  IMPORT =========================>
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Table, Text, Spinner,
} from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchForDocumentsSigned } from '../../../firebase/firebase.js';
import { setDocToView } from '../ViewDocument/ViewDocumentSlice.js';
import { UserContext } from '../../UserContext.jsx';
// ===================================================>

const SignedList = () => {
  // .......... STATES ............ //

  const [docs, setDocs] = useState([]);
  const [show, setShow] = useState(true);
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // .......... HELPER FUNCTIONS ............ //
  async function getDocs() {
    try {
      const docsToView = await searchForDocumentsSigned(user.email);
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
  // }, []);
  }, [user]);

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
                      {doc.emails.map((emailkey) => (
                        <Text key={emailkey}>{emailkey}</Text>
                      ))}
                    </Table.Cell>
                    <Table.Cell>
                      <Text>{doc.signedTime ? new Date(doc.signedTime.seconds * 1000).toDateString() : ''}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={() => {
                          const { docRef, docId } = doc;
                          dispatch(setDocToView({ docRef, docId }));
                          navigate('/viewDocument');
                        }}
                        text="View"
                        color="blue"
                        inline
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            'You do not have any documents to review'
          )}
        </div>
      )}
    </div>
  );
};

export default SignedList;

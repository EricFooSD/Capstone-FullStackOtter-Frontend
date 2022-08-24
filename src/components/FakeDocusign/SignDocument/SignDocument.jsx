/* eslint-disable consistent-return */

// =================  IMPORT =========================>
import React, {
  useRef, useEffect, useState, useContext,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Column, Heading, Button,
} from 'gestalt';
import WebViewer from '@pdftron/webviewer';
import { selectDocToSign } from './SignDocumentSlice.js';
import { storage, updateDocumentToSign } from '../../../firebase/firebase.js';
import 'gestalt/dist/gestalt.css';
import './SignDocument.css';
import { UserContext } from '../../UserContext.jsx';
// ===================================================>

const SignDocument = () => {
  // .......... STATES ............ //
  const { user } = useContext(UserContext);
  const [annotationManager, setAnnotatManager] = useState([]);
  const [annotPosition, setAnnotPosition] = useState(0);

  const doc = useSelector(selectDocToSign);

  const { docRef, docId } = doc;
  const { email } = user;

  const viewer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    WebViewer(
      {
        path: 'webviewer',
        disabledElements: [
          'ribbons',
          'toggleNotesButton',
          'searchButton',
          'menuButton',
          'rubberStampToolGroupButton',
          'stampToolGroupButton',
          'fileAttachmentToolGroupButton',
          'calloutToolGroupButton',
          'undo',
          'redo',
          'eraserToolButton',
        ],
      },
      viewer.current,
    ).then(async (instance) => {
      const { docViewer, annotManager, Annotations } = instance;
      setAnnotatManager(...annotationManager, annotManager);

      // select only the insert group
      instance.setToolbarGroup('toolbarGroup-Insert');

      // load document
      const storageRef = storage.ref();
      const URL = await storageRef.child(docRef).getDownloadURL();
      docViewer.loadDocument(URL);

      const normalStyles = (widget) => {
        if (widget instanceof Annotations.TextWidgetAnnotation) {
          return {
            'background-color': '#a5c7ff',
            color: 'white',
          };
        } if (widget instanceof Annotations.SignatureWidgetAnnotation) {
          return {
            border: '1px solid #a5c7ff',
          };
        }
      };
      annotManager.on('annotationChanged', (annotations, action, { imported }) => {
        if (imported && action === 'add') {
          annotations.forEach((annot) => {
            if (annot instanceof Annotations.WidgetAnnotation) {
              Annotations.WidgetAnnotation.getCustomStyles = normalStyles;
              if (!annot.fieldName.startsWith(email)) {
                annot.Hidden = true;
                annot.Listable = false;
              }
            }
          });
        }
      });
    });
  }, []);
  // }, [docRef, email]);

  const nextField = () => {
    const annots = annotationManager.getAnnotationsList();
    if (annots[annotPosition]) {
      annotationManager.jumpToAnnotation(annots[annotPosition]);
      if (annots[annotPosition + 1]) {
        setAnnotPosition(annotPosition + 1);
      }
    }
  };

  const prevField = () => {
    const annots = annotationManager.getAnnotationsList();
    if (annots[annotPosition]) {
      annotationManager.jumpToAnnotation(annots[annotPosition]);
      if (annots[annotPosition - 1]) {
        setAnnotPosition(annotPosition - 1);
      }
    }
  };

  const completeSigning = async () => {
    const xfdf = await annotationManager.exportAnnotations({ widgets: false, links: false });
    await updateDocumentToSign(docId, email, xfdf);
    navigate('/fakeDocusign');
  };

  // .......... RENDERING COMPONENT .......... //
  return (
    <div className="prepareDocument">
      <Box display="flex" direction="row" flex="grow">
        <Column span={2}>
          <Box padding={3}>
            <Heading size="md">Sign Document</Heading>
          </Box>

          <Box padding={3}>
            {/* <Row gap={1}> */}
            {/* <Stack> */}
            <Box padding={2}>
              <Button
                onClick={nextField}
                accessibilityLabel="next field"
                text="Next field"
                iconEnd="arrow-forward"
              />
            </Box>
            <Box padding={2}>
              <Button
                onClick={prevField}
                accessibilityLabel="Previous field"
                text="Previous field"
                iconEnd="arrow-back"
              />
            </Box>
            <Box padding={2}>
              <Button
                onClick={completeSigning}
                accessibilityLabel="complete signing"
                text="Complete signing"
                iconEnd="compose"
              />
            </Box>
            {/* </Stack> */}
            {/* </Row> */}
          </Box>
        </Column>
        <Column span={10}>
          <div className="webviewer" ref={viewer} />
        </Column>
      </Box>
    </div>
  );
};

export default SignDocument;

import React, {useEffect, useState} from 'react';
import {gapi} from 'gapi-script';

// const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
// const API_KEY = 'YOUR_API_KEY';
// const DISCOVERY_DOCS = [
//   'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
// ];
// const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

const GoogleDrive = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
              listFiles();
            });
        });
    }

    gapi.load('client:auth2', start);
  }, []);

  const listFiles = () => {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
      })
      .then(response => {
        setFiles(response.result.files);
      });
  };

  return (
    <div>
      <h2>Google Drive Files</h2>
      <ul>
        {files.map(file => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleDrive;

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BackupIcon from '@material-ui/icons/Backup';
import { makeStyles } from '@material-ui/core';
import { File, RootStore } from '../../lib/types';
import { generateRandomStrings } from '../../lib/generateRandomStrings';
import {
  clearSongFileAction,
  updateSongFileAction,
} from '../../store/SongFileReducer';
import { deleteSongFile, uploadSongFile } from '../../lib/songs';
import {
  displayMessage,
  failedFetchAction,
  requestFetchAction,
  successFetchAction,
} from '../../store/LoadingStatusReducer';

const useStyles = makeStyles({
  icon: {
    height: 48,
    wieth: 48,
    lineHeight: 48,
    cursor: 'pointer',
  },
  cursor: {
    cursor: 'pointer',
  },
});

type Props = {
  albumId: string;
  songId: string;
};

const SongUploadForm: React.FC<Props> = ({ albumId, songId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { filename } = useSelector<RootStore, File>((state) => state.songFile);

  const handleChangeUploadSongButton = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const fileList = event.target.files;

    if (!fileList) {
      dispatch(displayMessage('ファイルが選択されていません。'));
      return;
    }

    const file = fileList[0];
    if (!file) {
      return;
    }
    const newFileName = generateRandomStrings();

    try {
      dispatch(requestFetchAction());
      const newSongFile = await uploadSongFile(file, newFileName);
      dispatch(updateSongFileAction(newSongFile));
      dispatch(displayMessage('曲がアップロードされました。'));

      dispatch(successFetchAction());
    } catch {
      dispatch(
        failedFetchAction(
          '曲のアップロードに失敗しました。\n通信環境をご確認の上再度お試しください。'
        )
      );
    }
  };

  const handleDeleteSongFileButton = async () => {
    if (filename === '') {
      dispatch(displayMessage('曲がアップロードされていません。'));
      return;
    }
    if (!window.confirm('曲を削除しますか？')) {
      return;
    }
    try {
      dispatch(requestFetchAction());
      await deleteSongFile(filename, albumId, songId);
      dispatch(clearSongFileAction());
      dispatch(successFetchAction());
    } catch {
      dispatch(
        failedFetchAction(
          '曲の削除に失敗しました。\n通信環境をご確認の上再度お試しください。'
        )
      );
    }
  };

  return (
    <div className="song-upload-form">
      <p>曲をアップロード</p>
      {filename === '' ? (
        // add song file
        <IconButton className={classes.icon}>
          <label htmlFor="upload-music">
            <BackupIcon className={classes.cursor} />
            <input
              type="file"
              className="display-none"
              accept=".mp3"
              id={'upload-music'}
              onChange={(e) => handleChangeUploadSongButton(e)}
            />
          </label>
        </IconButton>
      ) : (
        // delete song file
        <IconButton
          className={classes.icon}
          onClick={() => handleDeleteSongFileButton()}
        >
          <DeleteOutlineIcon className={classes.cursor} />
        </IconButton>
      )}
    </div>
  );
};

export default SongUploadForm;

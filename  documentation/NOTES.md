## App Structure

- `App.tsx` manages video picking, metadata, form, and playback
- `utils/formatDuration.ts` handles time formatting with test coverage
- All styles are built using `nativewind`

## Assumptions

- Only one video can be picked at a time
- Users are expected to have file permissions granted
- File names might not always be available from picker API

## Future Improvements

- Support multiple video submissions
- Store video data in SQLite or a backend
- Add thumbnails using video metadata
- Dark mode + accessibility support

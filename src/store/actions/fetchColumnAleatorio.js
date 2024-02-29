export const actions = {
    FETCH_COLUMN_RANDOM_START: 'FETCH_COLUMN_RANDOM_START',
    FETCH_COLUMN_RANDOM_SUCCESS: 'FETCH_COLUMN_RANDOM_SUCCESS',
    FETCH_COLUMN_RANDOM_FAILED: 'FETCH_COLUMN_RANDOM_FAILED',

}

export const fetchColumnRandomStart = () => ({
    type: actions.FETCH_COLUMN_RANDOM_START,
    payload: {},
});

export const fetchColumnRandomSuccess = (dataRandom) => ({
    type: actions.FETCH_COLUMN_RANDOM_SUCCESS,
    payload: {dataRandom},
});

export const fetchColumnRandomFailed = (error) => ({
    type: actions.FETCH_COLUMN_RANDOM_FAILED,
    payload: {error},
});

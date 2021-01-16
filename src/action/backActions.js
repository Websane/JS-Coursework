export const BACK_VIEW = 'BACK_VIEW';

export const backView = (back) => ({
        type: BACK_VIEW,
        back,
})

export const backState = (back) => (dispatch) => {
        dispatch(backView(back));
}
import React from 'react';

import s from './index.module.scss';

export const Comments = () => {
    return (
        <div className={s.comments}>
            <textarea className={s.comments__textarea}></textarea>
            <div className={s.comments__respond}>
                <button className={s.comments__btn}>Respond</button>
            </div>
        </div>
    );
};

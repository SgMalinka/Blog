import { Posts } from '@/components';

import s from './page.module.scss';

export default function Blog() {
    return (
        <div className={s.blog}>
            <div className={s.blog__container}>
                <p className={s.blog__recommended}>Blog Posts</p>
                <Posts />
            </div>
        </div>
    );
}

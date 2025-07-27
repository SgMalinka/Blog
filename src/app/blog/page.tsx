import { BlogHeader, Posts } from '@/components';

import s from './page.module.scss';

export default function Blog() {
    return (
        <div className={s.blog}>
            <div className={s.blog__container}>
                <BlogHeader />
                <Posts />
            </div>
        </div>
    );
}

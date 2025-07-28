import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Routes as RouteEnum } from '@/core/enum';

export default async function HomePage() {
    const token = (await cookies()).get('token')?.value;

    if (token) {
        redirect(RouteEnum.Blog);
    } else {
        redirect(RouteEnum.Login);
    }
}

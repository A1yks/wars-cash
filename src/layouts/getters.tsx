import { ReactNode } from 'react';
import AdminLayout from './AdminLayout';
import MainLayout from './MainLayout';

export function getAdminLayout(page: ReactNode) {
    return (
        <MainLayout title="Админка">
            <AdminLayout>{page}</AdminLayout>
        </MainLayout>
    );
}

export function getDefaultLayout(page: ReactNode) {
    return <MainLayout title="Профиль">{page}</MainLayout>;
}
